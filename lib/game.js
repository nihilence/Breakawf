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
    this.lives = 3;
    this.score = 0;
    this.setBricks();
    this.ballImg = new Image();
    this.ballImg.src = "assets/ball.png"
  };


  Game.prototype.bindKeyHandlers = function(){
    var paddle = this.paddle;
    var game = this;
    key("d", function () { paddle.power(80) });
    key("a", function () { paddle.power(-80) });
    key("shift+s+a+b", function(){
      game.bricks = [];
    })
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
    this.ball.pos = [this.paddle.pos[0] + this.paddle.width/2, 638]
    this.ball.draw(this.ctx);
    this.drawBricks();
    this.bindKeyHandlers();
  };

  Game.prototype.setBricks = function () {
    for(var col =200; col < 800; col+=105){
      for(var row = 80; row < 350; row += 25){
        this.bricks.push(new Breakoff.Brick({pos: [col, row]}))
      }
    }
  };

  Game.prototype.drawBoard = function(){
    this.ctx.clearRect(0, 0, 1000, 750);
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, 1000, 750);
  };

  Game.LIVESX = [40, 90, 140]
  Game.LIVESY = 10;
  Game.SCORETEXT = [800,30]
  Game.SCOREPOS = [900,30]

  Game.prototype.drawScoreBar = function () {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 50);
    this.ctx.lineTo(1000, 50);
    this.ctx.strokeStyle="white"
    this.ctx.stroke();

    this.ctx.font="20px Georgia";
    this.ctx.fillStyle="#FFFFFF";
    this.ctx.fillText("Score: ",Game.SCORETEXT[0],Game.SCORETEXT[1]);
    this.ctx.fillText(this.score,Game.SCOREPOS[0],Game.SCOREPOS[1]);

    var that = this;
    this.drawLives();
  };

  Game.prototype.drawLives = function () {
    var that = this;
    var lives = Game.LIVESX.slice(0, this.lives)
    lives.forEach(function(posX){
      if(that.ballImg.complete){
        that.ctx.drawImage(that.ballImg, posX, Game.LIVESY);
      }else{
        that.ballImg.onload = function(){
          that.ctx.drawImage(that.ballImg, posX, Game.LIVESY);
        };
      }
    });
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
    this.drawScoreBar();
    var that = this;
    this.allObjs().concat(this.bricks).forEach(function (object) {
      object.draw(that.ctx);
    });
  };

  Game.prototype.gameOver = function(msg){
    clearInterval(this.timerId);

    var that = this;
    var img = new Image();
    img.src = "assets/isla.jpg"
    img.onload = function(){
      that.ctx.drawImage(img, 350, 100);
    }

    this.ctx.font = "20px Georgia";
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillText(msg, 480, 30);
  };


  Game.prototype.start = function () {
    this.drawBoard(this.ctx);
    var that = this;
    this.timerId = setInterval(
      function () {

        that.ctx.clearRect(0,0,1500,1500)
        that.moveObjects();
        that.draw(that.ctx)
        if(that.ball.pos[1] + that.ball.dy> 660){
          that.lives -=1;
          that.restart();
        }

        if(that.lives <1){
          that.drawScoreBar();
          that.gameOver("You Lose!")
        } else if( that.bricks.length === 0){
          that.gameOver("You Win!");
        } else{
          that.draw(that.ctx);
        }
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
