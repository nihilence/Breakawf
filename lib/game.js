(function () {
  if (typeof Breakoff === "undefined") {
    window.Breakoff = {};
  }
  var Game = Breakoff.Game = function (ctx) {
    this.timerId = null;
    this.ctx = ctx;
    this.paddle = new Breakoff.Paddle();
    this.ball = new Breakoff.Ball({game: this, paddle: this.paddle});
  };


  Game.prototype.bindKeyHandlers = function(){
    var paddle = this.paddle;
    var game = this;
    key("d", function () { paddle.power(80) });
    key("a", function () { paddle.power(-80) });
    key("space", function(){ game.start()})
  };

  Game.prototype.setup = function(){
    this.drawBoard();
    this.ball.draw(this.ctx);
    this.paddle.draw(this.ctx)
    this.bindKeyHandlers();
  };

  Game.prototype.drawBoard = function(){
    this.ctx.clearRect(0, 0, 1000, 800);
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, 1000, 800);
  };


  Game.prototype.allObjs = function () {
    return [this.ball, this.paddle]
  };

  Game.prototype.moveObjects = function(){
    this.allObjs().forEach(function(obj){
      obj.move()
    })
  };
  Game.prototype.draw = function () {
    this.drawBoard();
    var that = this;
    this.allObjs().forEach(function (object) {
      object.draw(that.ctx);
    });
  };

  Game.prototype.start = function () {
    this.drawBoard(this.ctx);
    var that = this;
    this.timerId = setInterval(
      function () {
        that.ctx.clearRect(0,0,1500,1500)
        that.moveObjects();
        that.ball.paddleCollide();
        if(that.ball.pos[1] > 765){
          that.ball.color = "#000000";
          that.stop();
          that.ball = new Breakoff.Ball({game: that, paddle: that.paddle});
          that.paddle = new Breakoff.Paddle();
          that.draw(that.ctx);
        }
        that.draw(that.ctx);
      }, 31
    );

  };

  Game.prototype.stop = function (first_argument) {
    clearInterval(this.timerId);
  };
})();
