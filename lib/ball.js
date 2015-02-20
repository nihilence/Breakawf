(function () {
  if (typeof Breakoff === "undefined") {
    window.Breakoff = {};
  }

  var Ball = Breakoff.Ball = function (options) {
    this.dx = 10;
    this.dy = -10;
    this.radius = 10;
    this.color = "#cbf063";
    this.game = options.game;
    this.paddle = options.paddle;
  };



  Ball.prototype.resetPos = function(){
    this.pos = [500,638];
    this.dx = 10;
    this.dy = -10;
  }

  Ball.prototype.brickCollide = function () {
    var ball = this;
    var ballY = this.pos[1];
    var ballX = this.pos[0];
    var dirX = (ballX+ this.dx - ballX);
    var dirY = (ballY+ this.dy - ballY);
    this.game.bricks.forEach(function(brick){
      var pt = ball.ballIntercept(ball, brick, dirX, dirY);
       if (pt) {
         switch(pt.d) {
           case 'left':
           case 'right':
             ball.dx= -ball.dx;
             ball.removeBrick(brick);
             break;
           case 'top':
           case 'bottom':
             ball.dy = -ball.dy;
             ball.removeBrick(brick);
             break;
         }
      }
    })

  };


  Ball.prototype.moveToPaddle =  function() {
     this.setpos(this.game.paddle.left + (this.game.paddle.w/2),
     this.game.court.bottom - this.game.paddle.h - this.radius);
   };

  Ball.prototype.paddleCollide = function (otherObject) {
    // if bottom of ball reaches the top of paddle,
    if (this.pos[1] + this.dy + this.radius/2 >= this.paddle.pos[1]){
        // and it is positioned between the two ends of the paddle (is on top)
        if (this.pos[0] + this.dx >= this.paddle.pos[0] &&
            this.pos[0] + this.dx <= this.paddle.pos[0] + 100){
            this.dy = -this.dy;
            return true;
        }
    }
    return false;
  };

  Ball.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "#FFFFFF"
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.stroke();
  };


  Ball.prototype.move = function () {
    rad = this.radius
    if(this.pos[0] + rad + this.dx > 1000 || this.pos[0] +this.dx - rad < 0){
      this.dx = -this.dx;
    } else if(this.pos[1] +this.dy - rad < 0){
      this.dy = -this.dy;
    }
    this.paddleCollide();
    this.brickCollide();
    this.pos = [this.pos[0]+ this.dx, this.pos[1] + this.dy];
  };

  Ball.prototype.intercept =  function(x1, y1, x2, y2, x3, y3, x4, y4, d) {
    var denom = ((y4-y3) * (x2-x1)) - ((x4-x3) * (y2-y1));
    if (denom != 0) {
      var ua = (((x4-x3) * (y1-y3)) - ((y4-y3) * (x1-x3))) / denom;
      if ((ua >= 0) && (ua <= 1)) {
        var ub = (((x2-x1) * (y1-y3)) - ((y2-y1) * (x1-x3))) / denom;
        if ((ub >= 0) && (ub <= 1)) {
          var x = x1 + (ua * (x2-x1));
          var y = y1 + (ua * (y2-y1));
          return { x: x, y: y, d: d};
        }
      }
    }
    return null;
  };

  Ball.prototype.removeBrick = function (brick) {
    var i = this.game.bricks.indexOf(brick);
    this.game.bricks.splice(i, 1);
  };


  Ball.prototype.ballIntercept = function(ball, rect, dirX, dirY) {
    var ballX = this.pos[0]
    var ballY = this.pos[1]
    var pt;
    if (dirX < 0) {
      pt = this.intercept(ballX, ballY, ballX + dirX, ballY + dirY,
                                 rect.right  + ball.radius,
                                 rect.top    - ball.radius,
                                 rect.right  + ball.radius,
                                 rect.bottom + ball.radius,
                                 "right");
    }
    else if (dirX > 0) {
      pt = this.intercept(ballX, ballY, ballX + dirX, ballY + dirY,
                                 rect.left   - ball.radius,
                                 rect.top    - ball.radius,
                                 rect.left   - ball.radius,
                                 rect.bottom + ball.radius,
                                 "left");
    }
    if (!pt) {
      if (dirY < 0) {
        pt = this.intercept(ballX, ballY, ballX + dirX, ballY + dirY,
                                   rect.left   - ball.radius,
                                   rect.bottom + ball.radius,
                                   rect.right  + ball.radius,
                                   rect.bottom + ball.radius,
                                   "bottom");
      }
      else if (dirY > 0) {
        pt = this.intercept(ballX, ballY, ballX + dirX, ballY + dirY,
                                   rect.left   - ball.radius,
                                   rect.top    - ball.radius,
                                   rect.right  + ball.radius,
                                   rect.top    - ball.radius,
                                   "top");
      }
    }
    return pt;
  };

})();
