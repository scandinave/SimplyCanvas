function Picture(src, x, y, width, height){
	Item.call(this, x ,y, width, height);
	this.src = src;
	this.img = null;
}

Picture.prototype = new Item();
Picture.prototype.constructor = Picture;
Picture.prototype.draw = function(){
	// If picture was preloaded,  draw picture immediately
	if(this.img != null){
		this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}else { // else wait for picture loading before draw it
		var loading = function(ctx, x, y, width, height) {
			ctx.drawImage(img, x, y, width, height);
		};
		var img = new Image();
		img.src = this.src;
		img.onload = loading(this.ctx, this.x, this.y, this.width, this.height);
		this.img = img;
	}
	
};
