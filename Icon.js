function Icon(src, x, y, width, height){
	Container.call(this, x ,y, width, height);
	this.src = src;
};

extend(Icon, Container);
Icon.prototype.draw = function(){
	// On initialise la police du text pour récuperer la taille.
	this.child[0].init();
	// On redéfinit la taille de l'icone par rapport à celle de l'image ou du texte.
	this.width = (this.child[1].width > this.child[0].width) ? this.child[1].width : this.child[0].width;
	this.height = this.child[1].height + this.child[0].height + 10;
	
	// On positionne l'image par rapport à l'icone
	this.child[1].x = this.x + (this.width - this.child[1].width)/2;
	this.child[1].y = this.y ;
	
	// On positionne le texte dans l'icone
	this.child[0].x = this.x + (this.width - this.child[0].width)/2;
	this.child[0].y = this.y + this.child[1].height + this.child[0].height;
	// On affiche l'icon.
	for(var i = 0; i < this.child.length; i++){
			this.child[i].draw();
	}
	
	//this.ctx.strokeRect(this.x, this.y, this.width, this.height);
};

Icon.prototype.addText = function(item){
		this.child[0] = item;
};


Icon.prototype.addPicture = function(item){
	console.log(this.canvas, this.ctx);
		item.canvas = this.canvas;
		item.ctx = this.ctx;
		this.child[1] = item;
};

Icon.prototype.mouseUp = function(e){
	this.parent.mouseUp.call(this);
	if(this.parent.contains(this)){
		//console.log("dedans");
	} else {
		//console.log("dehors");
	}
};

Icon.prototype.dblclick = function(e){
	if(this.src != undefined) {
		window.open(this.src);
	}
};
