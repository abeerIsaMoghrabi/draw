/**
 * Created by isa moghrabi on 12/27/2017.
 */
var svg=document.getElementById('svg');
var objList = [];
var action=[];
var historys=0 ;
function obj (options) {//like structure

    var that = {};

    that.ctx = options.ctx;
    that.width = options.width;
    that.height = options.height;
    that.eleid = options.eleid;
    that.action=options.action;//move or jump
    that.x=options.x;
    that.y=options.y;
    that.startposx=options.startposx;
    that.startposy=options.startposy;
    that.moveEnable=options.moveEnable;
    return that;
}
function actionstruct(act) {
    var obj={};
    obj.type=act.type;
    obj.count=act.count;
    obj.eleActive=act.eleActive;
   obj.startpoint=act.startpoint;
    return obj;

}

//********************************************************//
function preview_image(event) {
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

            svg.style.backgroundImage="url('"+img.src+"')";
        }
    }
    reader.readAsDataURL(event.target.files[0]);
//Starts reading the contents of the specified Blob, once finished,
// the result attribute contains a data: URL representing the file's data.

}

function obj_image(event){
    var reader = new FileReader();
    reader.onload = function()
    {

        var img = new Image();

        img.src = reader.result;





        img.onload = function(){
             var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');


             svgimg.setAttributeNS(null,'height','50');
             svgimg.setAttributeNS(null,'width','50');
             svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', img.src);
             svgimg.setAttributeNS(null,'x','0');
             svgimg.setAttributeNS(null,'y','0');
             svgimg.setAttributeNS(null, 'visibility', 'visible');

             svgimg.id= objList.length;
             //svgimg.name=objList.length;
             svg.appendChild(svgimg);
            backg = obj({
               // ctx: canv.getContext("2d"),
                width: 50,
                height: 50,
                eleid: objList.length,
                //رح يكون في اكثر من اكشن بس رح نخليه هيك مؤقتا
                action:"move",
                x:0,
                y:20,
                startposx:0,
                startposy:20,
                moveEnable:false
            });
            //لازم تخلي المستخدم هو الى يحدد الحجم
            objList.push(backg);
            document.getElementById(objList[objList.length-1].eleid).addEventListener('focus', function() {
                this.addEventListener("keydown", myFunction, false);
            }, document.getElementById(objList[objList.length-1].eleid));
            document.getElementById(objList[objList.length-1].eleid).addEventListener("mousedown",imgHold);
            document.getElementById(objList[objList.length-1].eleid).addEventListener("mouseup",imgPut);
            document.getElementById(objList[objList.length-1].eleid).addEventListener("mousemove",imgMove);
            document.getElementById(objList[objList.length-1].eleid).addEventListener("contextmenu",displaymenu);


            //backg.ctx.drawImage(backg.elel.src, backg.x, backg.y,backg.width, backg.height);
            //alert(objList.length);
        }
    }
    reader.readAsDataURL(event.target.files[0]);

}
function imgMove(ele) {
    var clickedItem = ele.target.id;

    var theEle=document.getElementById(clickedItem);
   // var eleobj=objList[0];//////theEle.id
    if(objList[clickedItem].moveEnable){
        console.log(clickedItem);


        //theEle.x=event.offsetX;
        //theEle.y=event.offsetY;
        theEle.setAttribute('xlink:href',"http://sphotos-b.ak.fbcdn.net/hphotos-ak-ash3/s480x480/525959_10151097048652029_155651648_n.jpg");
// or mby more correct approach:
//    im.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "http://sphotos-b.ak.fbcdn.net/hphotos-ak-ash3/s480x480/525959_10151097048652029_155651648_n.jpg");
        theEle.setAttribute('x', (event.offsetX)-(objList[clickedItem].width/2));
        theEle.setAttribute('y', (event.offsetY)-(objList[clickedItem].height/2));
        objList[clickedItem].x=(event.offsetX)-(objList[clickedItem].width/2);
        objList[clickedItem].y=(event.offsetY)-(objList[clickedItem].height/2);
    }
}
function imgPut(ele) {
    console.log("up");
var x=5;
    var clickedItem = ele.target.id;
    var theEle=document.getElementById(clickedItem);
   // var eleobj=objList[0];//////////////

    objList[clickedItem].moveEnable=false;/////////////
    objList[clickedItem].startposx=(event.offsetX)-(objList[clickedItem].width/2);
    objList[clickedItem].startposy=(event.offsetY)-(objList[clickedItem].height/2);
    console.log(objList[clickedItem].moveEnable);
  //  console.log(eleobj.action);
  //   console.log("x=");
  //   console.log(objList[clickedItem].x);
  //   console.log("y=");
  //   console.log(objList[clickedItem].y);
}
function imgHold(ele) {
    console.log("down");
    var clickedItem = ele.target.id;
    var theEle=document.getElementById(clickedItem);
   // var eleobj=objList[0];/////////////////////

    objList[clickedItem].moveEnable=true;////////////
    console.log(objList[clickedItem].moveEnable);

}
function displaymenu(ele) {
    var clickedItem = ele.target.id;
    var theEle=document.getElementById(clickedItem);
    var x=objList[clickedItem].x;
    var y=objList[clickedItem].y;
    alert(x);
    x=x.toString()+"px";
    y=y.toString()+"px";

    var menu=document.getElementById("menu");
    menu.style.left=x;
    menu.style.top=y;
    menu.style.display="inline-block";
}
function myFunction(ele) {

    var x = event.which || event.keyCode;
    console.log(x);
    var clickedItem = ele.target.id;

    var hisbool=false;
    var theEle=document.getElementById(clickedItem);
    switch (x){
        case 39:
            console.log(historys);

            if(historys==39){
                hisbool=true;
            }
            else {
                hisbool=false;
            }
            goToRight(theEle,objList[clickedItem],hisbool);
            historys=39;
            break;
        case 37:
            if(historys==37){
                hisbool=true;
            }
            else {
                hisbool=false;
            }
            goToLeft(theEle,objList[clickedItem],hisbool);
            historys=37;
            break;
        case 38:
            if(historys==38){
                hisbool=true;
            }
            else {
                hisbool=false;
            }
            goUp(theEle,objList[clickedItem],hisbool);
            historys=38;
            break;
        case 40:
            if(historys==40){
                hisbool=true;
            }
            else {
                hisbool=false;
            }
            goDown(theEle,objList[clickedItem],hisbool);
            historys=40;
            break;
    }


}

function  goToRight(ele,eleobj,his) {
    console.log(his);
    ele.setAttribute('x', eleobj.x+3);
    eleobj.x=eleobj.x+3;
    if(his==false){
       var actobj=actionstruct({
           type:"right",
           count:1,
           eleActive:eleobj ,
           startpoint:eleobj.x-3
       });
       action.push(actobj);
    }
   else {
        var actobj=action.pop();
        actobj.count=actobj.count+1;
        action.push(actobj);
    }

}
function goToLeft (ele,eleobj,his) {
    ele.setAttribute('x', eleobj.x-3);
    eleobj.x=eleobj.x-3;
    if(his==false){
        var actobj=actionstruct({
            type:"left",
            count:1,
            eleActive:eleobj ,
            startpoint:eleobj.x+3
        });
        action.push(actobj);
    }
    else {
        var actobj=action.pop();
        actobj.count=actobj.count+1;
        action.push(actobj);
    }
}
function goUp (ele,eleobj,his) {
    ele.setAttribute('y', eleobj.y-3);
    eleobj.y=eleobj.y-3;
    if(his==false){
        var actobj=actionstruct({
            type:"up",
            count:1,
            eleActive:eleobj ,
            startpoint:eleobj.y+3
        });
        action.push(actobj);
    }
    else {
        var actobj=action.pop();
        actobj.count=actobj.count+1;
        action.push(actobj);
    }
}
function goDown (ele,eleobj,his) {
    ele.setAttribute('y', eleobj.y+3);
    eleobj.y=eleobj.y+3;
    if(his==false){
        var actobj=actionstruct({
            type:"down",
            count:1,
            eleActive:eleobj ,
            startpoint:eleobj.y-3
        });
        action.push(actobj);
    }
    else {
        var actobj=action.pop();
        actobj.count=actobj.count+1;
        action.push(actobj);
    }
}

document.getElementById("arrow").addEventListener("click",function () {
    hideAllelement();
    displayFirstseen();
    // var start=action[0].startpoint;

    for(var i=0;i<action.length;i++){
        // console.log(action[i].type);
        // console.log(action[i].count);
        // console.log(action[i].startpoint);
        // console.log("*********************************");
        switch (action[i].type){
            case "left":
                for(var j=0;j<action[i].count;j++){
                 document.getElementById(action[i].eleActive.eleid).setAttribute('x',action[i].eleActive.x-3);
                }
            break;
            case "right":
                 var stepnum=action[i].count;
                console.log(action[i].eleActive.eleid);
                var index=i;
                var myVar = setInterval(function(){
                   // for(var j=0;j<action[i].count;j++){

                       // console.log(action[i].eleActive.x);
                        action[index].eleActive.x=action[index].eleActive.x+3;
                        document.getElementById(action[index].eleActive.eleid).setAttribute('x',action[index].eleActive.x);
                      stepnum=stepnum-1;
                      if(stepnum==0){
                          clearInterval(myVar);
                      }
                        // sleep(500);
                   // }
                }, 70);

                break;
            case "up":
                for(var j=0;j<action[i].count;j++){
                    document.getElementById(action[i].eleActive.eleid).setAttribute('y',action[i].eleActive.y-3);
                }
                break;
            case "down":
                for(var j=0;j<action[i].count;j++){
                    document.getElementById(action[i].eleActive.eleid).setAttribute('y',action[i].eleActive.y+3);
                }
                break;
        }
    }


});
function hideAllelement() {
    for(var i=0;i<objList.length;i++){
   // console.log(document.getElementById(objList[i].eleid).id);
        document.getElementById(objList[i].eleid).style.display="none";
    }
}
function displayFirstseen() {
    for(var i=0;i<objList.length;i++){
        document.getElementById(objList[i].eleid).setAttribute('x', objList[i].startposx);
        document.getElementById(objList[i].eleid).setAttribute('y', objList[i].startposy);
        objList[i].x=objList[i].startposx;
        objList[i].y=objList[i].startposy;
        document.getElementById(objList[i].eleid).style.display="inline-block";
    }
}

// function sleep(milliseconds) {
//     var start = new Date().getTime();
//     for (var i = 0; i < 1e7; i++) {
//         if ((new Date().getTime() - start) > milliseconds){
//             break;
//         }
//     }
// }