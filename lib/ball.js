(function () {
  if (typeof Breakoff === "undefined") {
    window.Breakoff = {};
  }

  var Ball = Breakoff.Ball = function (options) {
    this.pos = [500,740];
    this.dx = 10;
    this.dy = -10;
    this.radius = 10;
    this.color = "#cbf063";
    this.game = options.game;
    this.paddle = options.paddle;
  };

  Ball.prototype.paddleCollide = function (otherObject) {
    // if bottom of ball reaches the top of paddle,
    if (this.pos[1] + this.dy + this.radius >= this.paddle.pos[1]){
        // and it is positioned between the two ends of the paddle (is on top)
        if (this.pos[0] + this.dx >= this.paddle.pos[0] &&
            this.pos[0] + this.dx <= this.paddle.pos[0] + 60){
            this.dy = -this.dy;
        }
    }
  };

  Ball.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();

  };

  // MovingObject.prototype.isCollidedWith = function (otherObject) {
  //   var centerDist = Breakoff.Util.dist(this.pos, otherObject.pos);
  //   return centerDist < (this.radius + otherObject.radius);
  // };
  //
  // MovingObject.prototype.isWrappable = true;
  //
  Ball.prototype.move = function () {
    rad = this.radius
    if(this.pos[0] + rad + this.dx > 1000 || this.pos[0] +this.dx - rad < 0){
      this.dx = -this.dx;
    }
    if(this.pos[1] +this.dy - rad < 0){
      this.dy = -this.dy;
    }


    this.pos = [this.pos[0]+ this.dx, this.pos[1] + this.dy];
  };
  //
  // MovingObject.prototype.remove = function () {
  //   this.game.remove(this);
  // };
})();
