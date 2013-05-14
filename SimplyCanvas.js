/**
 * SymplyCanvas is a library that propose to make development with canvas more easy.
 * It is build with POO pattern to allow maintainability and discovery more easier.
 * This class represent a layer. A layer correspond to one canvas. A symplyCanvas application
 * can handle one or multiple canvas. The advantage of multiple canvas is performance.
 * @author LE BARO Romain
 * @version 0.1
 */
function SimplyCanvas(name, width, height, priority){
		var items = new Array();
		this.pictures = new Array();
		this.canvas = document.createElement("canvas");
		this.canvas.id = name;
		this.canvas.height = height;
		this.canvas.width = width;
		var conteneur = document.getElementById("simplyCanvas");
		conteneur.appendChild(this.canvas);
		this.ctx = this.canvas.getContext('2d');
		this.preload = true;
		this.loader = "simpleLoader";
		this.priority = (priority == null) ? 1 : priority;
		this.canvas.style.zIndex = this.priority;
		var that = this;
		
		this.recursive = function(item){
			for(var i = 0; i < item.child.length; i++){
				var child = item.child[i];
				child.canvas = this.canvas;
				child.ctx = this.ctx;
				if(child.child.length != 0){
					this.recursive(child);
				}
			}
		};
	
		this.addItem = function(item){
			item.ctx = this.getCtx();
			item.canvas = this.getCanvas();
			this.recursive(item);
			if(item instanceof Picture){
				this.pictures.push(item);		
			}
			items.push(item);
		};
		
		this.removeItem = function(item){
			for(var i = 0; i < items.length; i++){
				if(items[0].name == item.name){
					items.splice(i,1);
				}
			}
		};
		
		this.getItems = function() {
			return items;
		};
		
		var update = function(){
			
			if(this.preload){
				this.preloadRessources();	
				this.preload = false;
			}
			that.ctx.clearRect(0, 0, that.getCanvas().width, that.getCanvas().height);
			for(var i = 0; i < items.length; i++){
				if(items[i].isDie){
					removeItem(items[i]);
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
		
		// Détection et gestion de la sourie
		this.canvas.onmousepress = function(e){
			var item = isOnItem(new Pointer(e.pageX, e.pageY));
			if(item != false){
				item.mousePress(e);
			}
		};
		
		this.canvas.onmousemove = function(e){
			for(var i = 0; i < items.length; i++){
				items[i].mouseMove(e);
			}	
		};
		
		this.canvas.onmouseup = function(e){
			for(var i = 0; i < items.length; i++){
				items[i].mouseUp(e);
			}	
		};
		
		this.canvas.ondblclick = function(e){
			var item = isOnItem(new Pointer(e.pageX, e.pageY));
			if(item != false) {
				item.dblclick(e);
			}
		};
		
		
		// Transmission des événement clavier touche pressée aux objets fils.
		if(document.body.onkeydown){
			document.body.onkeydown = keyDown;
		} else if (document){
			document.onkeydown = keyDown;
		}
		
		function keyDown(event){
			for(var i = 0; i < items.length; i++){
				items[i].keyDown(event);
			}
		};
		
		// Transmission des événement clavier touche relachée aux objets fils.
		if(document.body.onkeyUp){
			document.body.onkeyup = keyUp;
		} else if (document){
			document.onkeyup = keyUp;
		}
		
		function keyUp(event){
			for(var i = 0; i < items.length; i++){
				items[i].keyUp(event);
			}
		};
		
		//Test si la souris est sur un item.
		var isOnItem = function(pointer){
			for(var i = 0; i < items.length; i++){
				// On test le type de l'item pour déterminer si c'est un text. Car la positionnement se fait à partir du coin inférieur gauche. 
				if(items[i] instanceof Text){
					items[i].init();// On initialise la hauteur et largeur des texte
					if(pointer.x > items[i].x && pointer.x < (items[i].x + items[i].width) && pointer.y > (items[i].y - items[i].height) && pointer.y < items[i].y) {
						return items[i];
					}
				} else {
					if(pointer.x > items[i].x && pointer.x < (items[i].x + items[i].width) && pointer.y > items[i].y && pointer.y < (items[i].y + items[i].height)) {
						return items[i];
					}
				}
			}
			return false;	
		};
};


SimplyCanvas.prototype.preloadRessources = function(){
	var loader = new Loader(this.loader);
	loader.init(this.pictures, this.canvas, this.ctx );
	loader.draw();
};

function extend(subClass, superClass) {
	var F = function() {};
	F.prototype = superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;
	subClass.prototype.parent = superClass.prototype;
	if(superClass.prototype.constructor == Object.prototype.constructor) {
		superClass.prototype.constructor = superClass;
	}
}

function instantiate(className, args) {
    var o, f, c;
    c = window[className]; // get reference to class constructor function
    f = function(){}; // dummy function
    f.prototype = c.prototype; // reference same prototype
    o = new f(); // instantiate dummy function to copy prototype properties
    c.apply(o, args); // call class constructor, supplying new object as context
    o.constructor = c; // assign correct constructor (not f)
    return o;
}