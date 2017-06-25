
window.onload = _init;

function _init(){
  var width = document.getElementById("brush-size-in");
  width.onchange = function(ev){
    ctx.lineWidth = ev.target.value;
    bWidth = ctx.lineWidth;
    brush=null;
    switch(true){
      case bWidth <= 1 : 
        brush = ctx.createImageData(1, 1);
        brushD = brush.data;
        brush[0] = 0;
        brush[1] = 0;
        brush[2] = 0;
        brush[3] = 1*bWidth;
    }
  }
}

