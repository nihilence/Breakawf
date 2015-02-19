(function () {
  if (typeof Breakoff === "undefined") {
    window.Breakoff = {};
  }
  var Game = Breakoff.Game = function (ctx) {
    this.timerId = null;
    this.ctx = ctx;
    this.paddle = new Breakoff.Paddle();
    this.ball = new Breakoff.Ball({game: this, paddle: this.paddle});
    this.started = false;
  };


  Game.prototype.bindKeyHandlers = function(){
    var paddle = this.paddle;
    var game = this;
    key("d", function () { paddle.power(80) });
    key("a", function () { paddle.power(-80) });
    key("space",
      function(){ if(game.started === false){
                    game.start();
                    game.started = true;
                  }
                })
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
        if(that.ball.pos[1] + that.ball.dy> 770){
          that.restart();
        }
        that.moveObjects();

        that.ball.paddleCollide();

        that.draw(that.ctx);

      }, 31
    );

  };

  Game.prototype.restart= function () {

    clearInterval(this.timerId);
    this.paddle.resetPos();
    this.ball.resetPos();
    debugger;
    this.started = false;

    this.setup();
    };
})();
