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
	this.children = new Array();
	this.onDie = new Publisher("ennemy");
	this.ennemies = new Array();
	this.isDie = false;
	this.isVisible = true;
	this.forces = new Array();
	this.vitesse = 1;
	
};

/**
* function update of the item. This function updates all caractéristic of item during the loop.
* 2 Case, the first, item is movable, so we manage the moving by keyboard.
* The second, the item has one or more forces over it. In this case, we resolves this forces by calculating it resulting.
*/
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
	} else if(this.forces.length > 0) { 
		var resultante = new Vecteur(this.forces[0].x, this.forces[0].y);
		// We add the vectors for calculate the resulting force
		for(var i=1; i<this.forces.length; i++){
					   resultante.add(this.forces[i]);
		}
		var x = 0;
		var y = 0;
		var absX = Math.abs(Number(resultante.x));
		var absY =  Math.abs(Number(resultante.y));
	  
		// We calculate the variations of x and y.
		if(absX > absY) {
		   x = Number(resultante.x) / absX;
		   y = Number(resultante.y) / absX;
		} else if(absY > absX){
		   x = Number(resultante.x) / absY;
		   y = Number(resultante.y) / absY;
		} else {
		   x = Number(resultante.x);
		   y = Number(resultante.y);
		}
		// We update the position of the item taking into account of velocity
		this.setPosition(this.x + (x*this.vitesse), this.y+(y*this.vitesse));
	}
	this.draw();
};

Item.prototype.setPosition = function(x, y) {

	this.x = x;
	this.y = y;
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
			this.canvas.style.cursor = "pointer";
		} else {
			this.canvas.style.cursor = "auto";
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

Item.prototype.die = function(){
	this.isDie = true;
	this.onDie.deliver(this);
};

Item.prototype.addEnnemy = function(item){
	this.ennemies.push(item);
};

Item.prototype.removeEnnemy = function(item){
	for(var i = 0; i < this.ennemies.length; i++){
		if(this.ennemies[i].name == item.name){
			this.ennemies.splice(i,1);
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

