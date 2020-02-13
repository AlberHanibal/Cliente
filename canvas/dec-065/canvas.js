
window.onload=function(){

    var canvas = document.getElementById("micanvas");
    var dib = canvas.getContext("2d"); 

    canvas.style.backgroundColor="silver"

    dib.fillStyle = "grey";
    dib.rect(100,100,50,50);
    dib.fill()
    dib.closePath()
    
    
}