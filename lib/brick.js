(function () {
  if (typeof Breakoff === "undefined") {
    window.Breakoff = {};
  }
  var Brick = Breakoff.Brick = function (options) {
    this.pos = options.pos;
    this.color = "#bc03f3";
    this.width = 100;
    this.height = 20;
    this.left = this.pos[0];
    this.top = this.pos[1];
    this.bottom = this.pos[1] + this.height;
    this.right = this.pos[0] + this.width;
  };

  Brick.prototype.draw = function (ctx) {
    ctx.fillStyle= this.color;
    ctx.strokeStyle="#FF0000"
    ctx.fillRect(this.pos[0],this.pos[1],this.width, this.height);
    ctx.strokeRect(this.pos[0], this.pos[1], this.width, this.height);
  };


})();
