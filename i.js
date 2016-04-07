//Global variables

var CANVAS_WIDTH = 505;
var CANVAS_HEIGHT = 606;

// Enemies our player must avoid

var Enemy = function(x,y) {
 		
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y; 

    this.multiplier = Math.floor((Math.random() * 5) + 1); 
};

Enemy.prototype.update = function(dt) {
    this.x=this.x + 100 * dt * this.multiplier;
    if (this.x > CANVAS_WIDTH) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var player = function() {
    this.sprite='images/char-cat-girl.png';
    this.x=200;
    this.y=435;
}

player.prototype.update = function(dt) {

};

player.prototype.render = function(x,y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.handleInput = function(keys) {
    switch(keys){
        case 'left':
            this.x = this.x - 83;
            break;
        case 'right':
            this.x = this.x + 83;
            break;
        case 'up':
            this.y = this.y - 83;
            break;
        case 'down':
            this.y = this.y + 83;
            break;
    }
};

var player = new player();

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

var allEnemies=[];
var x=10;
var yValue=[65,150,235];
for (var i = 0; i < 5; i++) { 
var y=yValue[Math.floor(Math.random() * 3)];
var enemy=new Enemy(x,y);
    allEnemies.push(enemy);
}