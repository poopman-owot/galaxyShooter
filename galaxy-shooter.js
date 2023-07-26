 var hardcoremode = false;
function alertmsg(headerText,bodyText, confirmText) {
	js_alert_active = true;
	elm.confirm_js.style.display = "";
	elm.confirm_js_code.innerHTML = bodyText;
		elm.confirm_js_msg.innerHTML = headerText;
		run_js_confirm.innerText = confirmText;
	try {
    getEventListeners(document);
} catch (error) {
		run_js_confirm.onclick = function() {
			hardcoremode = true;
alert("HARDCORE MODE ACTIVATED")
tryStarting();
		}

	confirm_js_cancel.onclick = tryStarting;
	confirm_js_cancel_x.onclick = tryStarting;

	confirm_js_cancel.onclick = tryStarting;
	confirm_js_cancel_x.onclick = tryStarting;
}
}
alertmsg("Instructions","<h3>Move Left/Right</h1><ol><li>A/D<li>Left Arrow/Right Arrow</ol><br><h3>Fire</h1><ol><li>Spacebar<li></ol><br><br><h3>Goal</h1><ol><li>Stay alive as long as you can and get as many points as possible<li></ol><br>","")

function tryStarting(){
    closeJSAlert();
    doi();

}
  function doi(){
w.disableCursor()
// Create the canvas element and set its style
   const canvas = document.createElement('canvas');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   canvas.style.position = 'fixed';
   canvas.style.top = '0';
   canvas.style.pointerEvents = 'none';

   // Append the canvas to the DOM
   document.body.appendChild(canvas);

   // Get the canvas context
   const ctx = canvas.getContext('2d');
   let spawnNewEnemies = true;
   // Player's ship properties
   const player = {
     x: canvas.width / 2,
     y: canvas.height - 50,
     width: 40,
     height: 20,
     speed: 5,
   };

   // Bullet properties for player
   const playerBullet = {
     x: 0,
     y: 0,
     width: 5,
     height: 15,
     speed: 8,
     active: false,
   };

   // Bullet properties for enemies
   const enemyBullet = {
     x: 0,
     y: 0,
     width: 3,
     height: 10,
     speed: -6,
     active: false,
   };

   // Enemy properties
   const enemies = [];



// Create a new enemy object
function createEnemy(x, y, type) {
  let health, color, size, points,cooldownSet;

  switch (type) {
    case 1:
      health = 1;
      color = '#49E992';
      size = 20;
      points = 100;
      cooldownSet = 100;
     
      break;
    case 2:
      health = 3;
      color = '#E9AF49';
      size = 30;
      points = 500;
      cooldownSet = 50;
      break;
    case 3:
      health = 10;
      color = '#98221F';
      size = 50;
points = 5000;
      cooldownSet = 10;
      break;
    default:
      health = 1;
      color = '#49E992';
      size = 20;
      points = 100;
      cooldownSet = 100;
  }

  return {
    x: x,
    y: y,
    width: size,
    height: size,
    color: color,
    health: health,
    points: points,
    cooldown: cooldownSet, // Adjust the cooldown time (smaller value = more frequent shooting)
    cooldownSet : cooldownSet,
    horizontalDirection: 1, // Horizontal movement direction (1 for right, -1 for left)
    horizontalCounter: 0, // Counter to determine how long the enemy should move in a single direction
    maxHorizontalCounter: 60, // Maximum counter value before changing horizontal direction
  };
}

// Spawn enemies at the top of the canvas
function spawnEnemies() {
  const numberOfEnemies = 5;
  const spacing = canvas.width / (numberOfEnemies + 1);
  for (let i = 0; i < numberOfEnemies; i++) {
    // Example: create an enemy of type 1, 2, or 3
var type;
const num = ~~(Math.random()*100);
if(num < 90){
type = 1;
}
else if(num < 98){
type = 2;
}
else{
type = 3;
}
    enemies.push(createEnemy((i + 1) * spacing, 60, type));
  }
}


   // Draw the player's ship
   function drawPlayerShip() {
     ctx.beginPath();
     ctx.moveTo(player.x, player.y);
     ctx.lineTo(player.x - player.width / 2, player.y + player.height);
     ctx.lineTo(player.x + player.width / 2, player.y + player.height);
     ctx.closePath();
     ctx.fillStyle = '#1F4B98'; // Set the fill color to blue
     ctx.fill();
   }

// Draw an enemy
function drawEnemy(enemy) {
  if (enemy.flashDuration > 0) {
    // Draw the enemy with a yellow fill during the flash duration
    ctx.fillStyle = 'yellow';
  } else {
    // Draw the enemy with its original color when not flashing
    ctx.fillStyle = enemy.color;
  }

  ctx.fillRect(enemy.x - enemy.width / 2, enemy.y, enemy.width, enemy.height);
}


   // Move each enemy independently and make them shoot
   function moveEnemies() {
     for (const enemy of enemies) {
       // Calculate angle between enemy and player
       const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);

       // Check if the enemy can move horizontally (based on the horizontal cooldown)
       if (enemy.horizontalCooldown <= 0) {
         enemy.horizontalCooldown = Math.floor(Math.random() * 100) + 50; // Randomize the horizontal cooldown time for each enemy
         enemy.horizontalDirection *= -1; // Change the horizontal movement direction
       } else {
         enemy.horizontalCooldown--; // Decrease the horizontal cooldown time
       }

       // Move enemy horizontally with individual movement patterns
       enemy.x += 2 * Math.cos(angle) * enemy.horizontalDirection; // Adjust the speed of enemy horizontal movement here

       // Shoot a bullet if the cooldown has passed
       if (enemy.cooldown <= 0) {
         enemyShoot(enemy, angle);
         enemy.cooldown = Math.floor(Math.random() * enemy.cooldownSet) + enemy.cooldownSet; // Randomize the shooting cooldown time for each enemy
       } else {
         enemy.cooldown--; // Decrease the shooting cooldown time
       }
    // Reduce the flash duration of the enemy if greater than zero
    if (enemy.flashDuration > 0) {
      enemy.flashDuration--;
    }
     }
   }
   // Array to store all bullets (player's and enemies')
   const bullets = [];
   const playerBullets = []; // Array to store the player's bullets
// Player's health and score
let playerHealth = 100;
let score = 0;
   // Function to handle player shooting
   function playerShoot() {
     if (!playerBullet.active) {
       // Shoot a bullet from the player's ship
       const bullet = {
         x: player.x,
         y: player.y,
         width: playerBullet.width,
         height: playerBullet.height,
         speed: playerBullet.speed,
         angle: -Math.PI / 2, // Make the bullet move upwards (opposite to enemy bullets)
         active: true,
       };
       playerBullets.push(bullet); // Add the player's bullet to the playerBullets array
       playerBullet.active = true;
     }
   }
// Draw the player's health bar at the top of the screen
function drawHealthBar() {
  const healthBarWidth = 200;
  const healthBarHeight = 40;
  const healthBarX = canvas.width / 2 - healthBarWidth / 2;
  const healthBarY = 10;
  
  ctx.fillStyle = 'gray';
  ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
  
  ctx.fillStyle = 'green';
  const currentHealthWidth = (playerHealth / 100) * healthBarWidth;
  ctx.fillRect(healthBarX, healthBarY, currentHealthWidth, healthBarHeight);
}

// Draw the player's score at the top of the screen
function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Score: ' + score, canvas.width / 2, 40);
}
   // Enemy shooting
   function enemyShoot(enemy, angle) {
     // Shoot a bullet from the enemy
     const bullet = {
       x: enemy.x,
       y: enemy.y + enemy.height,
       width: enemyBullet.width,
       height: enemyBullet.height,
       speed: enemyBullet.speed,
       angle: angle + Math.PI, // Change the angle to make the bullet move downwards
       active: true,
     };
     // Add the enemy's bullet to the bullets array
     bullets.push(bullet);
   }
// Player's shooting cooldown in milliseconds
const playerShootCooldown = 300; // 0.3 seconds

// Timestamp to track the time of the last shot
let lastPlayerShootTime = 0;

// Function to handle player shooting
function playerShoot() {
  // Calculate the time elapsed since the last shot
  const currentTime = Date.now();
  const timeSinceLastShoot = currentTime - lastPlayerShootTime;

  if (!playerBullet.active && timeSinceLastShoot >= playerShootCooldown) {
    // Shoot a bullet from the player's ship
    const bullet = {
      x: player.x,
      y: player.y,
      width: playerBullet.width,
      height: playerBullet.height,
      speed: playerBullet.speed,
      angle: -Math.PI / 2, // Make the bullet move upwards (opposite to enemy bullets)
      active: true,
    };
    playerBullets.push(bullet); // Add the player's bullet to the playerBullets array
    playerBullet.active = true;

    // Update the timestamp of the last shot
    lastPlayerShootTime = currentTime;
  }
}

   // Handle keyboard inputs
   const keys = {};
   window.addEventListener('keydown', (e) => {
     keys[e.key] = true;
     if (e.key === ' ') {
       playerShoot(); // Call playerShoot function when spacebar is pressed
     }
   });


   window.addEventListener('keyup', (e) => (keys[e.key] = false));
   // Draw the bullet
// Draw the bullet
function drawBullet(b) {
  ctx.fillStyle = b.active ? (b === playerBullet ? 'red' : 'purple') : 'transparent';
  ctx.fillRect(b.x - b.width / 2, b.y, b.width, b.height);
}

   // Update the bullet's position
   function updateBullet(b) {
     b.x += b.speed * Math.cos(b.angle); // Move bullet in x-direction
     b.y += b.speed * Math.sin(b.angle); // Move bullet in y-direction
     if (b.y < 0 || b.y > canvas.height || b.x < 0 || b.x > canvas.width) {
       b.active = false;
     }
   }
// Update the player's bullets' positions
function updatePlayerBullets() {
  for (let i = playerBullets.length - 1; i >= 0; i--) {
    const b = playerBullets[i];
    if (b.active) {
      drawBullet(b);
      updateBullet(b);
    } else {
      playerBullets.splice(i, 1); // Remove inactive bullets from the array
    }
  }
}


   // Update player's position based on keyboard inputs
   function updatePlayer() {
     if (keys.ArrowLeft && player.x > player.width / 2) {
       player.x -= player.speed;
     }
     if (keys.ArrowRight && player.x < canvas.width - player.width / 2) {
       player.x += player.speed;
     }
   }

// Handle collisions between bullets and enemies
function handleCollisions() {
  // Check player's bullets against enemies
  for (const bullet of playerBullets) {
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      if (
        bullet.x > enemy.x - enemy.width / 2 &&
        bullet.x < enemy.x + enemy.width / 2 &&
        bullet.y > enemy.y &&
        bullet.y < enemy.y + enemy.height
      ) {
        // Bullet hit an enemy
        bullet.active = false;
        enemy.health -= 1; // Reduce the enemy's health by 1
        enemy.flashDuration = 10; // Set the duration for the flash effect (in frames)
        if (enemy.health <= 0) {
          // Enemy's health reached 0, remove the enemy
          enemies.splice(i, 1);

          // Increase the score when the player destroys an enemy
          score += enemy.points;

          // Prevent spawning new enemies for 1 second
          spawnNewEnemies = false;
          setTimeout(() => {
            spawnNewEnemies = true;
            // Spawn two more enemies after the delay
            if (enemies.length < 5) {
              spawnEnemies();
              spawnEnemies();
            }
          }, 1000); // 1000 milliseconds = 1 second
        }
      }
    }
  }

  // Check enemies' bullets against the player
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    if (
      bullet.x > player.x - player.width / 2 &&
      bullet.x < player.x + player.width / 2 &&
      bullet.y > player.y &&
      bullet.y < player.y + player.height
    ) {
      // Bullet hit the player, remove the bullet
      bullet.active = false;
      // Decrease player's health when hit by an enemy's bullet
      playerHealth -= 10;
      if (playerHealth <= 0) {
        // Game over or any other desired action when player health reaches zero

api_chat_send(`My Galaxy Shooter Score is: ${score} Can you beat it?`);
alert("you died");
        location.reload();
      }
    }
  }
}
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updatePlayer();
  updateBullet(playerBullet);
  moveEnemies();
  drawPlayerShip();
  
  drawHealthBar(); // Draw the health bar
  drawScore(); // Draw the score

  // Draw and update all bullets (player's and enemies')
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    if (b.active) {
      drawBullet(b);
      updateBullet(b);
    } else {
      bullets.splice(i, 1); // Remove inactive bullets from the array
    }
  }

  // Draw and update player's bullets
  updatePlayerBullets();

  // Handle collisions between bullets and enemies
  handleCollisions();

  // Draw all enemies
  for (const enemy of enemies) {
    drawEnemy(enemy);
  }

  // Reset playerBullet active status
  playerBullet.active = false;
positionY +=1;
w.render()
  requestAnimationFrame(gameLoop);
}



   // Spawn initial enemies
   spawnEnemies();

   gameLoop();
}
