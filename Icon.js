function Icon(src, x, y, width, height){
	Container.call(this, x ,y, width, height);
	this.src = src;
}

Icon.prototype = new Container();
Icon.prototype.constructor = Icon;
Icon.prototype.parent = Container.prototype;
Icon.prototype.draw = function(){
	var text;
	var image;
	(this.child[0] instanceof Text) ? text = this.child[0] : image = this.child[1];
	(this.child[1] instanceof Picture) ? image = this.child[1] : text = this.child[0];

	// On initialise la police du text pour récuperer la taille.
	text.init();
	// On redéfinit la taille de l'icone par rapport à celle de l'image ou du texte.
	this.width = (image.width > text.width) ? image.width : text.width;
	this.height = image.height + text.height;
	
	// On positionne l'image par rapport à l'icone
	image.x = this.x + (this.width - image.width)/2;
	image.y = this.y ;
	
	// On positionne le texte dans l'icone
	text.x = this.x + (this.width - text.width)/2;
	text.y = this.y + image.height + text.height;
	// On affiche l'icon.
	for(var i = 0; i < this.child.length; i++){
			this.child[i].draw();
	}
	
	this.ctx.strokeRect(this.x, this.y, this.width, this.height);
};

/**
*	Ajout un item à l'icon. 
*	Surchage la méthode de parent Container
*/
Icon.prototype.addItem = function(item){
	// On vérifie que l'item est un text ou une image. Sinon on lève une erreur.
	if(item instanceof Text || item instanceof Picture){ 
		// Pour chaque attribut à transmettre on compare avec l'attribut présent dans l'object (this) 
		for(var i = 0; i < this.composition.length; i++){ 
			var comp = this.composition[i];
			item[comp] = this[comp];  // On l'ajoute à l'objet fils.
		}
		this.child.push(item);
	} else {
		throw new Error("L'item doit être un Text ou une Image");
	}
	
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
