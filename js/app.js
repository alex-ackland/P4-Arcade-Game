
// Global variables
var height = 606;
var width = 500;

var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 100 + (Math.random() * 150);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var s = (this.speed * dt);
    this.x += s;
    if (this.x> width) this.x = 0;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// PLAYER CLASS

var Player = function(x, y) {
    this.sprite = 'images/char-cat-girl.png';
    // setting the player so that it is the middle of the blocks
    this.x = width/2.5;
    this.y = height/1.5;
};

Player.prototype.reset = function () {
    this.x = width/2.5;
    this.y = height/1.5;
};

Player.prototype.update = function(dt){

    // to stop the player going off of the edges
    if (this.x < 40 || this.x > 400) {
        if(this.x < 40){
            this.x = 0;
        }
        else{
            this.x = 400;
        }
    }
    if (this.y < 0 || this.y > 400) {
        if(this.y < 0){
            this.reset();
            alert('CONGRATULATIONS - you have won the game');
        }
        else{
            this.y = 400;
        }
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
};

Player.prototype.handleInput = function(direction){

    if(direction === 'left'){
        this.x -= TILE_WIDTH;
    }
    if(direction === 'up'){
        this.y -= TILE_HEIGHT;
    }
    if(direction === 'right'){
        this.x += TILE_WIDTH;
    }
    if(direction === 'down'){
        this.y += TILE_HEIGHT;
    }
 };


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy()];
for (var i = 0; i < 3; i++) {
    y = 220 - (80 * i);
    x = 400 / (1 + i);
    allEnemies.push(new Enemy(x, y));
    allEnemies.push(new Enemy(x * 1.75, y)); //adds 3 more bugs at on different x co-ordinate
}

var player = new Player(); 
    

function checkCollisions() {
    for (var i = 0; i < allEnemies.length; i++) {
        if ((allEnemies[i].x) <= player.x +
            40 &&
            (allEnemies[i].x + 40) >= (player.x) &&
            (allEnemies[i].y) <= player.y +
            40 &&
            (allEnemies[i].y + 40) >= (
            player.y)) {
        player.reset();
        alert('GAME OVER - You have been captured by the enemy');
        }
    }
}


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


