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
    this.bricks = [];
    this.setBricks();
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
    this.paddle.draw(this.ctx);
    this.ball.pos = [this.paddle.pos[0] + this.paddle.width/2, 640]
    // this.ball.dx = this.paddle.dx
    // this.ball.dy = 0
    // debugger;
    this.ball.draw(this.ctx);
    this.drawBricks();
    this.bindKeyHandlers();
    // var that = this;
    // setInterval(function(){
    //   that.paddle.move()
    //   that.ball.move()
    //   that.draw(that.ctx);
    // }, 32)
  };

  Game.prototype.setBricks = function () {
    for(var col = 80; col < 900; col+=60 ){
      for(var row = 100; row < 400; row += 30){
        this.bricks.push(new Breakoff.Brick({pos: [col, row]}))
      }
    }
    // this.bricks.push(new Breakoff.Brick({pos: [100,30]}));
  };

  Game.prototype.drawBoard = function(){
    this.ctx.clearRect(0, 0, 1000, 750);
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, 1000, 750);
  };

  Game.prototype.drawBricks = function(){
    var that = this;
    this.bricks.forEach(function(brick){
      brick.draw(that.ctx);
    })
  }
  Game.prototype.allObjs = function () {
    return [this.ball, this.paddle];
  };

  Game.prototype.moveObjects = function(){
    this.allObjs().forEach(function(obj){
      obj.move()
    })
  };
  Game.prototype.draw = function () {
    this.drawBoard();
    var that = this;
    this.allObjs().concat(this.bricks).forEach(function (object) {
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
        // that.paddle.move();
        that.ball.brickCollide();
        that.ball.paddleCollide();
        that.draw(that.ctx)
        if(that.ball.pos[1] + that.ball.dy> 660){
          that.restart();
        }




        that.draw(that.ctx);

      }, 34
    );

  };

  Game.prototype.restart= function () {

    clearInterval(this.timerId);
    this.paddle.resetPos();
    this.ball.resetPos();
    this.started = false;

    this.setup();
    };
})();
