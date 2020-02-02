let mainCanvas = document.getElementById("mainGame");
let ctx= mainCanvas.getContext("2d");
let cellSize=mainCanvas.width/25;
ctx.fillStyle="rgb(50,50,255)";
ctx.fillRect(0,0,mainCanvas.width,mainCanvas.height);
let gameOver=false;let borderActive=false; let speed=3;
//ctx.fillStyle="#000000";
ctx.fillRect(0,0,mainCanvas.width,mainCanvas.height);
//ctx.fillRect(151,31, cellSize-2, cellSize-2);
/*for(let i=0;i<mainCanvas.height;i+=cellSize){
    for(let j=0;j<mainCanvas.width;j+=cellSize){
        if((i+j)/cellSize%2)ctx.fillStyle="#5c5c5c";
        else ctx.fillStyle="#363636";
        ctx.fillRect(i, j, cellSize, cellSize);
    }
}*/