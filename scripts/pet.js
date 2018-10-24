(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 800,
    height = 600,
    player = {
      x : width/2,
      y : height - 5,
      width : 252,
      height : 254,
      speed: 5,
      velX: 0,
      velY: 0,
      jumping: false
    },
    keys = [],
    friction = 0.8,
    gravity = 0.3;

canvas.width = width;
canvas.height = height;

function update(){
	var rand = Math.floor((Math.random() * 8) );
	
	 if (rand == 2) {
        // up arrow or space
      if(!player.jumping){
       player.jumping = true;
       player.velY = -player.speed*1.4;
      }
    }
      if (rand == 1 || rand == 7 ) {
        // right arrow
        if (player.velX < player.speed) {
			
            player.velX = player.velX+15;
        }
    }
    if (rand == 3 || rand == 6 ) {
        // left arrow
        if (player.velX > -player.speed) {
			
            player.velX = player.velX-15;
        }
    }
   
    player.velX *= friction;
   
    player.velY += gravity;
  
    player.x += player.velX;
    player.y += player.velY;
    
    if (player.x >= width-player.width) {
        player.x = width-player.width;
    } else if (player.x <= 125) {
        player.x = 125;
    }
  
    if(player.y >= height-player.height){
        player.y = height - player.height;
        player.jumping = false;
    }
  ctx.clearRect(0,0,width,height);
  
make_background();
make_player(rand);
  //ctx.fillStyle = "red";
  //ctx.fillRect(player.x, player.y, player.width, player.height);
  
  setTimeout(function () {requestAnimationFrame(update)}, 800);
}

function make_player(rand)
{
  base_image = new Image();
  base_image.src = '../images/Tapir.png';
  if (rand == 1 || rand == 7 ) {
  //right image
  base_image.src = '../images/Tapir2.png';
  }
  if (rand == 3 || rand == 6 ) {
  //left image
  base_image.src = '../images/Tapir.png';
  }
  ctx.drawImage(base_image, player.x, player.y, player.width, player.height);
}
function make_background()
{
  house = new Image();
  house.src = '../images/background.png';
  ctx.drawImage(house, 0, 0, 800, 600);
  //ctx.drawImage(tree, player.x, 0, 800, 600);
  //ctx.drawImage(tree, player.x - 800, 0, 800, 600);
}
document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load",function(){
    update();
});
