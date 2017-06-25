
 window.onload = _init;

function _init(){
  _initCanvas();
  var id = document.getElementById("peer-id-in");
  var remotePeer = document.getElementById("remotePeer");
  /* ToDo: move to ui */
  const connectButton = document.getElementById("connect");
  const connForm = document.getElementById('connect-form');
  var prevX = null;
  var prevY = null;
  var peer;

  peer = new Peer(/*ev.target.value,*/ {host:'/', path:'peerServer', port:location.port});

  peer.on('open', function(id){
    console.log("peer created", id);
    var idel = document.getElementById('peer-id');
    idel.value = id;
  });

  // when a remote peer connects to me 
  peer.on('connection', (_conn) => {
    console.log('incoming connection from %s', _conn.peer);

    if(peer.connections[_conn.peer].length == 1){
      const peer = peer.connect(_conn.peer);
      setupPeer(peer);
    }

    connForm.style.visibility = 'hidden';
  });

  // when I attempt to connect a remote peer
  connectButton.onclick = function(ev){
    ev.preventDefault();
    if(remote.value != null){
      const conn = peer.connect(remotePeer.value);
      console.log('connecting...');
      connForm.style.visibility = 'hidden';
    }
    return false;
  };

// var width = document.getElementById("brush-size-in");
// width.onchange = function(ev){
// 	ctx.lineWidth = ev.target.value;
// 	bWidth = ctx.lineWidth;
// brush=null;
// switch(true){
// 	case bWidth <= 1 : 
// 		brush = ctx.createImageData(1, 1);
// 		brushD = brush.data;
// 		brush[0] = 0;
// 		brush[1] = 0;
// 		brush[2] = 0;
// 		brush[3] = 1*bWidth;
// }
//console.log(ctx.lineWidth, brush);
// }
}

function setupPeer(peer){
  conn.on('data', function(data){
    if(data.acc == "stroke"){
      var x = data.x;
      // + document.body.scrollLeft + document.documentElement.scrollLeft - canvas.offsetLeft;
      var y = data.y;
      // + document.body.scrollTop + document.documentElement.scrollTop - canvas.offsetTop;

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();
      // console.log(x, y, prevX, prevY);
      prevX = x;
      prevY = y;
      //  var index = (data.x + data.y * imgData.width) * 4
      // imgData.data[index+0] = 0;
      // imgData.data[index+1] = 0;
      // imgData.data[index+2] = 0;
      // imgData.data[index+3] = 255;
    }
    else if(data.acc == "press"){
      var x = data.x ;
      // + document.body.scrollLeft + document.documentElement.scrollLeft - canvas.offsetLeft;
      var y = data.y ;
      // + document.body.scrollTop + document.documentElement.scrollTop - canvas.offsetTop;
      ctx.beginPath();
      prevX = x;
      prevY = y;
    }
    //ctx.putImageData(imgData, 0, 0);
  });
}