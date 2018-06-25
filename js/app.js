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
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
