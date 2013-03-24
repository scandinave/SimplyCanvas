function Picture(src, x, y, width, height){
	Item.call(this, x ,y, width, height);
	this.src = src;
}

Picture.prototype = new Item();
Picture.prototype.constructor = Picture;
Picture.prototype.draw = function(){
	var loading = function(ctx, x, y, width, height) {
		ctx.drawImage(img, x, y, width, height);
	};
	var img = new Image();
	img.src = this.src;
	img.onload = loading(this.ctx, this.x, this.y, this.width, this.height);
};
