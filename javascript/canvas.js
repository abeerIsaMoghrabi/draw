/**
 * Created by isa moghrabi on 12/16/2017.
 */

function canvasClass() {

    var canv;
    var start=false;
    //constructer//////////////////////////////////////////////
    canv=document.getElementById("canv");
    var start =false;
    var ctx=canv.getContext("2d");
    canv.addEventListener("mousedown",canvasEventDown);
    canv.addEventListener("mouseup",canvasEventUp);
    canv.addEventListener("mousemove",canvasEventMove);

    var count=0;
    var xStorage;
    var yStorage;
    loadImg();
    //constructer////////////////////////////////////////////
     function canvasEventUp() {
     //alert("hi up");
         console.log("up");
          count=0;
          start=false;
    }
    function canvasEventDown() {
        //alert("hi down");
        console.log("down");
        ctx.beginPath();
      start=true;
     // startWork();
    }
    function startWork() {
        // while(start){
             if(count==0){
                 ctx.moveTo(event.x,event.y);
                 ctx.lineTo(event.x+2,event.y+2);
                 count++;
                 xStorage=event.x+2;
                 yStorage=event.y+2;
             }
             else{
                 ctx.moveTo(xStorage,yStorage);
                 ctx.lineTo(event.x,event.y);
                 xStorage=event.x;
                 yStorage=event.y;
             }

             ctx.stroke();
      //   }


    }
     function canvasEventMove(event) {
         if(start){
             startWork();
         }

    }
    function loadImg() {
       var img=new Image();
       img.src='images/f.jpg';
        img.onload = function(){
            ctx.drawImage(img, 100, 100);
        }
    }

}


function main() {
var obj=new canvasClass();
//obj.loadImg();
}
main();