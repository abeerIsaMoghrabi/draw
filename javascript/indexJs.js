/**
 * Created by isa moghrabi on 11/11/2017.
 */

//func();

function  func () {
    this.x="abeer";
    this.fn=function () {
        alert("hi");

    };

}

var x=new func();
x.fn();