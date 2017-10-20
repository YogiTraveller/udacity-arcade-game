var score = 0;


// Enemies our player must avoid
var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = Math.floor(Math.random() * - 150) + 100;
    this.y = row * 80 + 65;
    this.speed = Math.floor(Math.random() * 250) + 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.collision = function(playr) {
    if (player.x < this.x + 75 &&
        player.x + 65 > this.x &&
        player.y < this.y + 50 &&
        70 + player.y > this.y) {
        return true;
    }
    return false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if( this.x > 690) {
      this.x = Math.floor(Math.random() * -200) - 100;
      this.speed = Math.floor(Math.random() * 250) + 100;
    }
    if( this.collision() === true ) {
      player.y = 380;
      player.x = 200;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
  if(this.y < 0) {
    this.y = 380;
    this.x = 200;
    this.countScore();
  } else if (this.y > 380) {
    this.y = 380;
  } else if (this.x < 0) {
    this.x = 0
  } else if (this.x > 402 ) {
    this.x = 402
  }
};

Player.prototype.countScore = function() {
    score++;
    var scoreTag = document.getElementById('score');
    scoreTag.innerHTML = 'Points: ' + score;
};


Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  switch (keyPress) {
    case 'down':
        this.y = this.y + 80;
        break;
    case 'up':
        this.y = this.y - 80;
        break;
    case 'left':
        this.x = this.x - 101;
        break;
    case 'right':
        this.x = this.x + 101;
        break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 8 / 3; j++) {
      allEnemies.push(new Enemy(i));
    }
}


// Place the player object in a variable called player
var player = new Player(200, 380);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
