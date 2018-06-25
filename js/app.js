/* define Enemy */

var eRows = [83*1-20, 83*2-20, 83*3-20];  // array defining y-coordinate of stone-rows 1-3 in which Enemy can move
                                          // row = 83px {28}; -20 to position sprite squarely within row
                                          // note: image size 101x171; image-height:171 > row-height:83, so top-left corner sits way inside row above

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = Math.random() * -500;  // select random horizontal start position (off-screen); changing this value alters how soon Enemy appears
    this.y = eRows[Math.floor(Math.random() * eRows.length)];  // select random row (vertical position)

    this.speed = Math.random() * 400 + 100;  // speed varies randomly from min 100 to max <500; changing this value alters how fast Enemy moves
                                             // if game had difficulty levels speed could increase by a factor, e.g 400*a, for a = [1,2,4]

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if(this.x + 101*0.8 >= player.x && this.x  <= player.x && this.y + 83*0.2 >= player.y && this.y - 83*0.2 <= player.y) {
      // x & y values adjusted for better collision detection; in general, x-position of Enemy = x-position of Player - 10 for better appearence
      this.score = 0; // add to player score
      document.getElementById('score').innerHTML = "Score: 0"; // update score upon collision
      document.getElementById('result').innerHTML = "Ouch! Try again"; // update result upon collision
      player.reset();  // return player to starting position
  };

  this.x += this.speed * dt;  // move at rate of 'dt' {43} (time delta between ticks) to ensure game runs at same speed for all computers

  if (this.x > 505) {  // if Enemy goes off-screen [canvas.width = 505 {135}; each column = 101px, each row = 83px {28}]
      this.x = Math.random() * -400;  // reset position (to initial conditions, see above)
      this.y = eRows[Math.floor(Math.random() * eRows.length)];
  };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {

    this.sprite = 'images/char-boy.png';  // load image // why is game crashing if image is changed??

    this.x = 101*2;  // start in 3rd column [image size 101x171; image-width:101 = width:101, so no adjustment needed]
    this.y = 83*5-10;  // and 6th "row" [see position info in l.9]; -10 offset to position sprite squarely within cell (block)

    this.score = 0; // set initial score = 0

};

Player.prototype.update = function() {

    this.x = this.x;
    this.y = this.y;

};

Player.prototype.handleInput = function(allowedKeys) { // move Player according to keystrokes
    switch(allowedKeys) {
      case 'left':
        this.x = (this.x - 101 >= 0) ? this.x - 101 : 0;  // if not in leftmost cell, move one cell left, else do nothing
        break;
      case 'right':
        this.x = (this.x + 101 <= 101*4) ? this.x + 101 : 101*4;  // if not in rightmost cell, move one cell right, else do nothing
        break;
      case 'down':
        this.y = (this.y + 83 <= 83*5) ? this.y + 83 : 83*5;  // if not in lowermost cell, move one cell down, else do nothing
        break;
      case 'up':
            if(this.y - 83 >= 60){  // if not in topmost cell,
                this.y -= 83;       // move one cell up,
            } else {

                this.score += 100;  // else: add to score
                document.getElementById('score').innerHTML = "Your score: " + this.score; // update score upon success
                document.getElementById('result').innerHTML = "You made it!"; // update result upon success

                this.reset();  // return player to starting position
            }
        break;
      default:
        console.log('default');
        break;
    }
};


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

// draw player on-screen

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

 // Player will reset after collision

 Player.prototype.reset = function() {  // reset Player

    this.x = 101*2;  // start in 3rd "column"
    this.y = 83*5-10;  // and 6th "row"

}
