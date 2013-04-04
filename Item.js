function Item(x, y, width, height){
	this.canvas;
	this.name = this.getUniqueID();
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;	
	this.ctx;
	this.draggable = false;
	this.movable = false; // Indique qu'un élément est déplaçable au clavier
	this.movableKey = {}; // Tableau associatif indiquant les touches utilisées pour le déplacement. ex : {"haut" : 38, "bas" : 40, "droite" : 39,  "gauche" : 37}
	this.moving = {"haut" : false, "bas" : false, "droite" : false,  "gauche" : false};
	this.difX = 0; // Calcule le différentiel de position entre la souris et le coin supérieur gauche d'un item
	this.difY = 0; // lors du clique sur un item.
	this.onDrag = false; // Détermine si un item est en phase de drop.
	this.child = new Array();
}

Item.prototype.attachTo = function(canvas){
	this.canvas = canvas;
	this.ctx = canvas.getCtx();
	canvas.addItem(this);
	for(var i = 0; i < this.child.length; i++){
		this.child[i].canvas = canvas;
		this.child[i].ctx = canvas.getCtx();
	}
};

Item.prototype.update = function(){
	if(this.movable){
		if(this.moving["haut"] == true)
			this.y = this.y - 5;
		if(this.moving["bas"] == true)
			this.y = this.y + 5;
		if(this.moving["droite"] == true)
			this.x = this.x + 5;
		if(this.moving["gauche"] == true)
			this.x = this.x - 5;
	}
	this.draw();
};

Item.prototype.getUniqueID = function() {
	var uniqueID = new Date();
	return uniqueID.getTime() + '' + Math.floor(Math.random()*1000); 
	
};

Item.prototype.clear = function() {
	this.ctx.clearRect(this.x, this.y, this.width, this.height);
};

Item.prototype.isOnIt = function(pointer) {
	if(pointer.x > this.x && pointer.x < (this.x + this.width) && pointer.y > this.y && pointer.y < (this.y + this.height)) {
		return true;
	} else {
		return false;
	}
};

Item.prototype.mousePress = function(e){
	if(this.draggable) {
		this.difX = e.pageX - this.x;
		this.difY = e.pageY - this.y;
		this.onDrag = true;
	}
};

Item.prototype.mouseMove = function(e){
	if(this.onDrag) {
		this.x = e.pageX - this.difX;
		this.y = e.pageY - this.difY;
		//this.canvas.update();
	} else {
		if(this.isOnIt(new Pointer(e.pageX, e.pageY)) && this.draggable){
			$(this.canvas.getCanvas()).css("cursor", "pointer");
		} else {
			$(this.canvas.getCanvas()).css("cursor", "auto");
		}
	}
};

Item.prototype.mouseUp = function(e){
	if(this.onDrag){
		this.onDrag = false;
	}

};



Item.prototype.keyDown = function(e){
	if(this.movable){
		switch(e.keyCode){
			case this.movableKey["haut"] : // Haut
				e.preventDefault();
				this.moving["haut"] = true;
			break;
			case this.movableKey["bas"] : //Bas
				e.preventDefault();
				this.moving["bas"] = true;
			break;
			case this.movableKey["droite"] : // Droite
				e.preventDefault();
				this.moving["droite"] = true;
			break;
			case this.movableKey["gauche"] : // Gauche
				e.preventDefault();
				this.moving["gauche"] = true;
			break;
		}
	}
};

Item.prototype.keyUp = function(e){
	if(this.movable){
		switch(e.keyCode){
			case this.movableKey["haut"] : // Haut
				e.preventDefault();
				this.moving["haut"] = false;
			break;
			case this.movableKey["bas"] : //Bas
				e.preventDefault();
				this.moving["bas"] = false;
			break;
			case this.movableKey["droite"] : // Droite
				e.preventDefault();
				this.moving["droite"] = false;
			break;
			case this.movableKey["gauche"] : // Gauche
				e.preventDefault();
				this.moving["gauche"] = false;
			break;
		}
	}
};


/**
* Détermine si un item contient un autre.
*
*/
Item.prototype.contains = function(item){
	if(item.x > this.x && item.y > this.y && item.x < this.x + this.width && item.y < this.y+this.height)
		return true;
	else if(item.x+item.width > this.x && item.y > this.y && item.x+item.width < this.x + this.width && item.y < this.y+this.height)
		return true;
	else if(item.x > this.x && item.y+item.height > this.y && item.x < this.x + this.width && item.y+item.height < this.y+this.height)
		return true;
	else if(item.x+item.width > this.x && item.y+item.height > this.y && item.x+item.width < this.x + this.width && item.y+item.height < this.y+this.height)
		return true;
	else 
		return false;
};

