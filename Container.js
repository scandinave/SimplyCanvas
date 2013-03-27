function Container(x, y, width, height){
	Item.call(this, x ,y, width, height);
	this.child = new Array();
	this.composition = new Array("canvas","ctx");
}

Container.prototype = new Item();
Container.prototype.constructor = Container;
Container.prototype.parent = Item.prototype;
Container.prototype.draw = function(){
	for(var i = 0; i < this.child.length; i++){
			this.child[i].draw();
	}
};

Container.prototype.addItem = function(item){
	for(var i = 0; i < this.composition.length; i++){
		var comp = this.composition[i];
		item[comp] = this[comp];
	}	
	this.child.push(item);
};

Container.prototype.removeItem = function(item){
	for(var i = 0; i < this.child.length; i++){
		if(this.child[0].name == item.name){
			this.child.splice(i,1);
		}
	}
};