function Container(x, y, width, height){
	Item.call(this, x ,y, width, height);
}

Container.prototype = new Item();
Container.prototype.constructor = Container;
Container.prototype.draw = function(){
	for(var i = 0; i < this.child.length; i++){
			this.child[i].draw();
	}
};

Container.prototype.addItem = function(item){
		this.child.push(item);
};

Container.prototype.removeItem = function(item){
	for(var i = 0; i < this.child.length; i++){
		if(this.child[0].name == item.name){
			this.child.splice(i,1);
		}
	}
};