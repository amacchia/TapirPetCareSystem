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

  setTimeout(function () {requestAnimationFrame(update)}, 750);
}

function make_player(rand)
{
  base_image = new Image();
  petcolor = localStorage.localPetColor;
  if(petcolor == "red")
  {
	  base_image.src = '../images/red.png';
  }
  else if(petcolor == "green")
  {
	base_image.src = '../images/Tapir.png';
  }
  else if(petcolor == "blue")
  {
	  base_image.src = '../images/blue.png';
  } 
  if (rand == 1 || rand == 7 ) {
  //right image
    if(petcolor == "red")
	{
		base_image.src = '../images/red2.png';
	}
	else if(petcolor == "green")
	{
		base_image.src = '../images/Tapir2.png';
	}
	else if(petcolor == "blue")
	{
		base_image.src = '../images/blue2.png';
	} 
  }
  if (rand == 3 || rand == 6 ) {
  //left image
    if(petcolor == "red")
	{
		base_image.src = '../images/red.png';
	}
	else if(petcolor == "green")
	{
		base_image.src = '../images/Tapir.png';
	}
	else if(petcolor == "blue")
	  {
		base_image.src = '../images/blue.png';
	} 
  }
  ctx.drawImage(base_image, player.x, player.y, player.width, player.height);
}

function make_background()
{
  house = new Image();
  house.src = '../images/background.png';
  ctx.drawImage(house, 0, 0, 800, 600);
}
document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});

const ballCond = 70;
const brushCond = 20;
const kibbleCond = 50;
const shampooCond = 100;

function useItem(item) {
    var username = document.getElementById("username").textContent.substr(10);
    var petCond = Number(document.getElementById("petHealth").textContent.substr(12)); 
    var itemCond;
    switch (item) {
        case "ball":
            itemCond = ballCond;
            break;
        case "brush":
            itemCond = brushCond;
            break;
        case "kibble":
            itemCond = kibbleCond;
            break;
        case "shampoo":
            itemCond = shampooCond;
            break;
    }

    if (petCond >= 100) {
        alert("Condition is already max");
    } else {
        // Reference to the user's inventory
        var userRef = database.ref('/users/' + username + '/inventory/');

        // Get the current value of an item and increment it
        userRef.once("value").then(function(snapshot) {
            // Pass in item here in case function ends before read is finished
            var itemName = item;

            var currentValue = snapshot.val()[itemName];
			if(currentValue > 0)
			{
				var newValue = currentValue - 1;
				var updatedItem = {
					[itemName]: newValue
				}

				var newCond = petCond + itemCond;
				if(newCond >= 100)
				{
					newCond = 100;
				}
				var updatedCondition = {
					petHealth: newCond
				}

				// Update the user's inventory and currency
				updateUserInventory(username, updatedItem);
				updateUser(username, updatedCondition);
			}
			else
			{
				alert("Don't own any");
			}	
        });
    }
}

var localstatus = localStorage.getItem('userStatus');
if(localstatus == "online")
{
	window.addEventListener("load",function(){
		update();
	});
}
