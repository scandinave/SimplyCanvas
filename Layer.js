
function Layer(name, width, height, priority){
		var that = this;
		var master;
		this.name = name;
		var items = new Array();
		this.resources = new Array();
		this.canvas = document.createElement("canvas");
		this.canvas.id = name;
		this.canvas.height = height;
		this.canvas.width = width;
		this.canvas.style.position = 'absolute';
		this.canvas.style.top = '0px';
		this.canvas.style.left = '0px';
		var conteneur = document.getElementById("simplyCanvas");
		conteneur.appendChild(this.canvas);
		this.ctx = this.canvas.getContext('2d');
		this.preload = true;
		this.loader = "simpleLoader";
		this.priority = (priority == null) ? 1 : priority;
		this.canvas.style.zIndex = this.priority;
		
		
		var recursive = function(item){
			for(var i = 0; i < item.children.length; i++){
				var child = item.children[i];
				child.canvas = that.canvas;
				child.ctx = that.ctx;
				if(child.children.length != 0){
					recursive(child);
				}
			}
		};
	
		this.addItem = function(item){
			item.ctx = this.getCtx();
			item.canvas = this.getCanvas();
			item.trajectoireWorker = this.trajectoireWorker;
			recursive(item);
			if(item instanceof Picture){
				this.resources.push(item);		
			}
			items.push(item);
			master.addItem(item);
		};
		
		this.removeItem = function(item){
			for(var i = 0; i < items.length; i++){
				if(items[0].name == item.name){
					items.splice(i,1);
				}
			}
			master.removeItem(item);
		};
		
		this.getItems = function() {
			return items;
		};
		
		var update = function(){
			
			if(that.preload){
				that.preloadRessources();	
				that.preload = false;
			}
			that.ctx.clearRect(0, 0, that.getCanvas().width, that.getCanvas().height);
			for(var i = 0; i < items.length; i++){
				if(items[i].isDie){
					that.removeItem(items[i]);
					console.log(that.name + " item " + items.length);
					console.log("Dash item " + master.getItems().length);
				} else if(items[i].isVisible){
					items[i].update();
				}
			} 
			window.requestAnimationFrame(update);
		}
		
		this.update = function(){
			update();
		};
		
		this.getCtx = function(){	
			return this.ctx;
		};
		
		this.getCanvas = function(){	
			return this.canvas;
		};
		
		this.setMaster = function(newMaster){
			master = newMaster;
		};
		
		this.getMaster = function(){
			return master;
		};
		
};
/*Layer.prototype.getUniqueID = function() {
	var uniqueID = new Date();
	return uniqueID.getTime() + '' + Math.floor(Math.random()*1000); 
	
};*/


Layer.prototype.preloadRessources = function(){
	var loader = new Loader(this.loader);
	loader.init(this.resources, this.canvas, this.ctx );
	loader.draw();
};


/*Layer.prototype.keyUp = function(event){
	for(var i = 0; i < this.getItems().length; i++){
		this.getItems()[i].keyUp(event);
	}
};


Layer.prototype.keyDown = function(event){
	for(var i = 0; i < this.getItems().length; i++){
		this.getItems()[i].keyDown(event);
	}
};

Layer.prototype.mousePress = function(event){
	for(var i = 0; i < this.getItems().length; i++){
		this.getItems()[i].mousePress(event);
	}
};

Layer.prototype.mouseMove = function(event){
	for(var i = 0; i < this.getItems().length; i++){
		this.getItems()[i].mouseMove(event);
	}
};

Layer.prototype.mouseUp = function(event){
	for(var i = 0; i < this.getItems().length; i++){
		this.getItems()[i].mouseUp(event);
	}
};

Layer.prototype.dblclick = function(event){
	var item = this.isOnItem(new Pointer(event.pageX, event.pageY));
	if(item != false) {
		item.dblclick(event);
	}
};*/

/*Layer.prototype.isOnItem = function(pointer){
	//Test si la souris est sur un item.
	for(var i = 0; i < this.getItems().length; i++){
		var item =  this.getItems()[i];
		// On test le type de l'item pour déterminer si c'est un text. Car la positionnement se fait à partir du coin inférieur gauche. 
		if(item instanceof Text){
			item.init();// On initialise la hauteur et largeur des texte
			if(pointer.x > item.x && pointer.x < (item.x + item.width) && pointer.y > (item.y - item.height) && pointer.y < item.y) {
				return item;
			}
		} else {
			if(pointer.x > item.x && pointer.x < (item.x + item.width) && pointer.y > item.y && pointer.y < (item.y + item.height)) {
				return item;
			}
		}
	}
	return false;	
}*/