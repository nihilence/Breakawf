(function () {
  if (typeof Breakoff === "undefined") {
    window.Breakoff = {};
  }
  var Paddle = Breakoff.Paddle = function () {
    this.pos = [450,650]
    this.dx = 0;
  };

  Paddle.prototype.resetPos = function(){
    this.pos = [450,650];
  }


  Paddle.prototype.draw = function (ctx) {
    ctx.fillStyle="red";
    ctx.fillRect(this.pos[0],this.pos[1],100,15);
  };

  Paddle.prototype.move = function () {
    if(this.pos[0]- 50 + this.dx < 0){
      this.pos[0] = 0;
    }else if(this.pos[0]+50+this.dx > 1000){
      this.pos[0] = 900;
    }else {
      this.pos[0] += this.dx;
    }
    this.dx = 0;
  };

  Paddle.prototype.power = function (dx) {
    this.dx = dx;
  };

})();
