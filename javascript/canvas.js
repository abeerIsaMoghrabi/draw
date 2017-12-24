/**
 * Created by isa moghrabi on 12/16/2017.
 */
var canv;
canv=document.getElementById("canv");
var ctx=canv.getContext("2d");
function canvasClass() {


    var start=false;
    //constructer//////////////////////////////////////////////

    var start =false;

    canv.addEventListener("mousedown",canvasEventDown);
    canv.addEventListener("mouseup",canvasEventUp);
    canv.addEventListener("mousemove",canvasEventMove);

    var count=0;
    var xStorage;
    var yStorage;
    //loadImg();
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
         var x,y;
        // while(start){
        x=event.offsetX;
        y=event.offsetY;
        console.log("x=")
        console.log(event.x);
             if(count==0){

                 ctx.moveTo(x,y);
                 ctx.lineTo(x+2,y+2);
                 count++;
                 xStorage=x+2;
                 yStorage=y+2;
             }
             else{
                 ctx.moveTo(xStorage,yStorage);
                 ctx.lineTo(x,y);
                 xStorage=x;
                 yStorage=y;
             }

             ctx.stroke();
      //   }


    }
     function canvasEventMove(event) {
         if(start){
             startWork();
         }

    }




}

function preview_image(event)
{
    var reader = new FileReader();
    //The FileReader object lets web applications asynchronously read the contents of files
    // (or raw data buffers) stored on the user's computer, using File or Blob objects to specify
   // the file or data to read.
    //يعني بترجع obj من نوع blob
   // A Blob object represents a file-like object of immutable, raw data. Blobs represent data that
    // isn't necessarily in a JavaScript-native format. The File interface is based on Blob,
    // inheriting blob functionality and expanding it to support files on the user's system.
    reader.onload = function()
    {

        var img = new Image();

        img.src = reader.result;
        //reader.result:-The file's contents. This property is only valid after the read operation is complete,
        // and the format of the data depends on which of the methods was used to initiate the read operation.
        //هاي الميثود ما بتكون فعالة الا بعد ما يتم قراءة الملف و نخلص لذلك عشين نتأكد انو الملف تمت قراءته و انتهت منستخدم onload


        img.onload = function(){
            ctx.drawImage(img, 0, 0,canv.width, canv.height);
        }
    }
    reader.readAsDataURL(event.target.files[0]);
//Starts reading the contents of the specified Blob, once finished,
// the result attribute contains a data: URL representing the file's data.

}
function main() {
var obj=new canvasClass();
//obj.loadImg();
}

main();