/**
 * Created by isa moghrabi on 12/26/2017.
 */

var canv;
canv=document.getElementById("canv");
var objList = [];

function sprite (options) {

    var that = {};

    that.ctx = options.ctx;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.action=options.action;//move or jump
    that.x=options.x;
    that.y=options.y;
    that.moveEnable=options.moveEnable;
    return that;
}

var backg ;


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
            backg = sprite({
                ctx: canv.getContext("2d"),
                width: canv.width,
                height: canv.height,
                image: img,
                action:"",
                x:0,
                y:0,
                moveEnable:false
            });

            backg.ctx.drawImage(img, 0, 0,backg.width, backg.height);
        }
    }
    reader.readAsDataURL(event.target.files[0]);
//Starts reading the contents of the specified Blob, once finished,
// the result attribute contains a data: URL representing the file's data.

}
function obj_image(event){
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
         img.name=objList.length;
        img.src = reader.result;


        //reader.result:-The file's contents. This property is only valid after the read operation is complete,
        // and the format of the data depends on which of the methods was used to initiate the read operation.
        //هاي الميثود ما بتكون فعالة الا بعد ما يتم قراءة الملف و نخلص لذلك عشين نتأكد انو الملف تمت قراءته و انتهت منستخدم onload


        img.onload = function(){
            backg = sprite({
                ctx: canv.getContext("2d"),
                width: 50,
                height: 50,
                image: img,
                //رح يكون في اكثر من اكشن بس رح نخليه هيك مؤقتا
                action:"move",
                x:0,
                y:20,
                moveEnable:false
            });
            //لازم تخلي المستخدم هو الى يحدد الحجم
            objList.push(backg);
            objList[objList.length-1].image.addEventListener("mousedown",imgHold(this));
            objList[objList.length-1].image.addEventListener("mouseup",imgPut(this));
            objList[objList.length-1].image.addEventListener("mousemove",imgMove(this));
            backg.ctx.drawImage(img, backg.x, backg.y,backg.width, backg.height);
           alert(objList.length);
        }
    }
    reader.readAsDataURL(event.target.files[0]);
//Starts reading the contents of the specified Blob, once finished,
// the result attribute contains a data: URL representing the file's data.
}
function imgMove(ele) {
    var eleobj=objList[ele.name];
    if(eleobj.moveEnable){
        eleobj.x=event.offsetX;
        eleobj.y=event.offsetY
     eleobj.ctx.drawImage(eleobj.image,eleobj.x,eleobj.y,eleobj.width,eleobj.height);
    }
}
function imgPut(ele) {
    console.log("up");

    var eleobj=objList[ele.name];
    eleobj.moveEnable=false;
    console.log(eleobj.action);
}
function imgHold(ele) {
    console.log("down");
    var eleobj=objList[ele.name];
    eleobj.moveEnable=true;
}