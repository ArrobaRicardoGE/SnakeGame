/*Notas:
    -Añadir nombre del creador y github user
*/
let mainCanvas = document.getElementById("mainGame");
let ctx= mainCanvas.getContext("2d");
let borderPicker=document.getElementById("border");
let speedPicker=document.getElementById("speed");
let colorPicker=document.getElementById("color");
let eatAudio=document.getElementById("eat");
let loseAudio=document.getElementById("lose");
let cellSize=mainCanvas.width/25;
ctx.fillStyle="#000000";
ctx.fillRect(0,0,mainCanvas.width,mainCanvas.height);
ctx.font="70px Consolas";
ctx.fillStyle="rgb(0,0,255)";
ctx.textAlign="center";
ctx.fillText("Snake Game",mainCanvas.width/2,2*mainCanvas.height/5);
ctx.font="15px Consolas";
ctx.fillStyle="rgb(255,255,255)";
ctx.fillText("Choose your settings and hit the Start button",mainCanvas.width/2,mainCanvas.height/2+30);
ctx.fillText("Move with the arrow keys or with WASD",mainCanvas.width/2,mainCanvas.height/2+100);
ctx.fillText("by ArrobaRicardoGE",mainCanvas.width/2,mainCanvas.height/2+150);
let button=document.getElementById("inicio");
let scoreDisplay=document.getElementById("score");
let timeDisplay=document.getElementById("time");
let gameOver=true;
let rainbow = ["#9400D3","#4B0082","#0000FF","#00FF00","#FFFF00","#FF7F00","#FF0000"];
let rainbowMode=false;
button.addEventListener("click",function(){if(button.innerHTML=="Start")startGame();else gameOver=true});
//-------------------------------------------------------------------------------------------------------
function startGame(){
    gameOver=false;let borderActive=false; let speed=3;let frameRate=0;let score=5;let time=0; 
    button.innerHTML="Stop";
    if(borderPicker.value=="Active"){
        borderActive=true;
        mainCanvas.style="border:6px solid #FFFFFF"
    }
    if(speedPicker.value=="Slow")speed=8;
    if(speedPicker.value=="Medium")speed=5;
    if(speedPicker.value=="Fast")speed=3;
    if(colorPicker.value=="Classic")rainbowMode=false;
    else rainbowMode=true;
    let snake={
        size: 5,
        body: [[cellSize*4,0],[cellSize*3,0],[cellSize*2,0],[cellSize,0],[0,0]],
        dir: 0,
        requestDir: 0,
        show: function(){
            let col=0;let init="rgb("
            for(let i=0;i<this.size;i++){
                let colorRes="";
                if(rainbowMode){
                    colorRes=rainbow[col++];
                    col%=7;
                }    
                else{
                    colorRes=init+col+","+col+",255)";
                    col=Math.min(col+5,255);
                }
                ctx.fillStyle=colorRes;
                ctx.fillRect(this.body[i][0]+1,this.body[i][1]+1,cellSize-2,cellSize-2);
            }
        },
        advance: function(){
            for(let i=this.size-1;i>0;i--){
                this.body[i][0]=this.body[i-1][0];
                this.body[i][1]=this.body[i-1][1];
            }
            if(this.dir==0)this.body[0][0]+=cellSize;
            if(this.dir==1)this.body[0][1]+=cellSize;
            if(this.dir==2)this.body[0][0]-=cellSize;
            if(this.dir==3)this.body[0][1]-=cellSize;
        }
    }
    let apple={
        x: cellSize*randomInt(mainCanvas.height/cellSize),
        y: cellSize*randomInt(mainCanvas.height/cellSize),
        show: function(){
            if(rainbowMode)ctx.fillStyle="#FFFFFF";
            else ctx.fillStyle="#FFFB00";
            ctx.fillRect(this.x+1,this.y+1,cellSize-2,cellSize-2);
        },
        randomPos: function(){
            //System to avoid placing an apple on a body part
            let posiblePos=[];
            for(let i=0;i<mainCanvas.height/cellSize;i++){
                for(let j=0;j<mainCanvas.width/cellSize;j++){
                    let posible=true;
                    for(let k=0;k<snake.size;k++){
                        if(i*cellSize==snake.body[k][0] && j*cellSize==snake.body[k][1]){
                            posible=false;
                            break;
                        }
                    }
                    if(posible)posiblePos.push([i*cellSize,j*cellSize]);
                }
            }
            let selectedPos=randomInt(posiblePos.length-1);
            apple.x=posiblePos[selectedPos][0];
            apple.y=posiblePos[selectedPos][1];
        }
    }
    function randomInt(may){
        return Math.floor((Math.random()*(may)));
    }        
    function draw(){
        if(frameRate==speed){
            frameRate=0;
            ctx.fillStyle="#000000";
            ctx.fillRect(0,0,mainCanvas.width,mainCanvas.height);
            apple.show();
            snake.dir=snake.requestDir;
            snake.advance();
            if(borderActive){
                if((snake.body[0][0]<0)||(snake.body[0][0]>=mainCanvas.width)||
                (snake.body[0][1]<0)||(snake.body[0][1]>=mainCanvas.height))gameOver=true;
            }
            else{
                //To wrap up
                if(snake.body[0][0]<0)snake.body[0][0]=mainCanvas.width-cellSize;
                if(snake.body[0][0]>=mainCanvas.width)snake.body[0][0]=0;
                if(snake.body[0][1]<0)snake.body[0][1]=mainCanvas.height-cellSize;
                if(snake.body[0][1]>=mainCanvas.height)snake.body[0][1]=0;
            }    
            //Collision
            for(let i=1;i<snake.size;i++){
                if(JSON.stringify(snake.body[0])==JSON.stringify(snake.body[i])){
                    gameOver=true;
                    break;
                }    
            } 
            snake.show();
            //Eat apple
            if(snake.body[0][0]==apple.x && snake.body[0][1]==apple.y){
                eatAudio.play();
                score++;
                snake.body.push([0,0]);
                snake.size++;
                apple.randomPos();
            }  
            scoreDisplay.innerHTML="Score: "+score;
        }else frameRate++;    
        if(!gameOver)window.requestAnimationFrame(draw);
        else {
            loseAudio.play();
            ctx.fillStyle="#000000";
            ctx.fillRect(0,0,mainCanvas.width,mainCanvas.height);
            ctx.font="70px Consolas";
            ctx.fillStyle="rgb(0,0,255)";
            ctx.textAlign="center";
            ctx.fillText("Snake Game",mainCanvas.width/2,2*mainCanvas.height/5);
            ctx.font="15px Consolas";
            ctx.fillStyle="rgb(255,255,255)";
            ctx.fillText("Choose your settings and hit the Start button",mainCanvas.width/2,mainCanvas.height/2+30);
            ctx.fillText("Move with the arrow keys or with WASD",mainCanvas.width/2,mainCanvas.height/2+100);
            ctx.fillText("by ArrobaRicardoGE",mainCanvas.width/2,mainCanvas.height/2+150);
            button.innerHTML="Start";
            scoreDisplay.innerHTML="Score: 0";
            timeDisplay.innerHTML="Time: 00:00";
            let seconds=time%60;
            let minutes=Math.floor(time/60) ;
            if(minutes<10)minutes="0"+minutes;
            if(seconds<10)seconds="0"+seconds;
            mainCanvas.style="border:2px solid #FFFFFF"
            window.alert("Game over\nSnake size: "+snake.size+"\nTime: "+minutes+":"+seconds);
        }    
    }
    let count=0;
    function timer(){
        count++;
        if(count==60){
            ++time;
            let seconds=time%60;
            let minutes=Math.floor(time/60) ;
            if(minutes<10)minutes="0"+minutes;
            if(seconds<10)seconds="0"+seconds;
            timeDisplay.innerHTML="Time: "+minutes+":"+seconds;
            count=0;
        }
        if(!gameOver)window.requestAnimationFrame(timer);
    }
    window.requestAnimationFrame(timer);
    window.requestAnimationFrame(draw);
    document.addEventListener("keydown",
    function (dir){
        //37:left 38:up 39:right 40:down
        if((dir.which==37 || dir.which==65) && snake.dir!=0)snake.requestDir=2;
        if((dir.which==38 || dir.which==87) && snake.dir!=1)snake.requestDir=3;
        if((dir.which==39 || dir.which==68) && snake.dir!=2)snake.requestDir=0;
        if((dir.which==40 || dir.which==83) && snake.dir!=3)snake.requestDir=1;
    });
}    