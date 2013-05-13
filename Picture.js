function Picture(src, x, y, width, height){
	Item.call(this, x ,y, width, height);
	this.img = new Image();
	this.img.src = src;
}

extend(Picture, Item);
Picture.prototype = new Item();
Picture.prototype.constructor = Picture;
Picture.prototype.draw = function(){
	this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
};
