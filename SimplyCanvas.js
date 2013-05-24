var SimplyCanvas = function(){
    var layers = new Array();
	var items = new Array();
    var timer = new Publisher("timer");
	timer.start();
	this.addItem = function(item){
		items.push(item);
	};
	
	this.removeItem = function(item){
		for(var i = 0; i < items.length; i++){
			if(items[i].name == item.name){
				items.splice(i,1);
			}
		}
	};
	
	this.addLayer = function(layer){
		layers.push(layer);
		layer.setMaster(this);
	};
	
	this.removeLayer = function(layer){
		for(var i = 0; i < layers.length; i++){
			if(layers[i].name == layer.name){
				layers.splice(i,1);
				layer.simpleCanvas = null;
			}
		}
	};
	
	this.getLayers = function(){
		return layers;
	}
	
	this.getItems = function(){
		return items;
	};
	
	this.getTimer = function(){
		return timer;
	};
    
	this.update = function(){
		for(var i = 0; i < layers.length; i++){
			layers[i].update();
		}
	};
	
	// Transmission des événement clavier touche pressée aux objets fils.
	if(document.body.onkeydown){
		document.body.onkeydown = keyDown;
	} else if (document){
		document.onkeydown = keyDown;
	}
	
	function keyDown(event){
		for(var i = 0; i < layers.length; i++){
			layers[i].keyDown(event);
		}
	};
	
	// Transmission des événement clavier touche relachée aux objets fils.
	if(document.body.onkeyUp){
		document.body.onkeyup = keyUp;
	} else if (document){
		document.onkeyup = keyUp;
	}
	
	function keyUp(event){
		for(var i = 0; i < layers.length; i++){
			layers[i].keyUp(event);
		}
	};
	
	// Transmission des événement souris aux objects fils.
	if(document.body.onmousepress){
		document.body.onmousepress = onMousePress;
	} else if (document){
		document.onmousepress = onMousePress;
	}
	
	function onMousePress(event){
		for(var i = 0; i < layers.length; i++){
			layers[i].mousePress(event);
		}
	};
	
	if(document.body.onmousemove){
		document.body.onmousemove = onMouseMove;
	} else if (document){
		document.onmousemove = onMouseMove;
	}
	
	function onMouseMove(event){
		for(var i = 0; i < layers.length; i++){
			layers[i].mouseMove(event);
		}
	};
	
	if(document.body.onmouseup){
		document.body.onmouseup = onMouseUp;
	} else if (document){
		document.onmouseup = onMouseUp;
	}
	
	function onMouseUp(event){
		for(var i = 0; i < layers.length; i++){
			layers[i].mouseUp(event);
		}
	};
	
	if(document.body.ondblclick){
		document.body.ondblclick = onDblClick;
	} else if (document){
		document.ondblclick = onDblClick;
	}
	
	function onDblClick(event){
		console.log("toto");
		for(var i = 0; i < layers.length; i++){
			layers[i].dblclick(event);
		}
	};
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
};

function instantiate(className, args) {
    var o, f, c;
    c = window[className]; // get reference to class constructor function
    f = function(){}; // dummy function
    f.prototype = c.prototype; // reference same prototype
    o = new f(); // instantiate dummy function to copy prototype properties
    c.apply(o, args); // call class constructor, supplying new object as context
    o.constructor = c; // assign correct constructor (not f)
    return o;
};

Object.prototype.clone = function(){
	var copy = Object.create( Object.getPrototypeOf(this));
	var propNames = Object.getOwnPropertyNames(this);
	
	propNames.forEach(function(name){
		var desc = Object.getOwnPropertyDescriptor(o, name);
		Object.defineProperty(copy, name, desc);
	});
	
	return copy;
};

Object.prototype.subscribe = function(publisher){
	var that = this;
	var alreadyExists = publisher.subscribers.some(
		function(el){
			if(el === that){
				return;
			}
		}
	);
	if(!alreadyExists){
		publisher.subscribers.push(this);
	}
	return this;
};

Object.prototype.unsubscribe = function(publisher){
	var that = this;
	publisher.subscribers = publisher.subscribers.filter(
		function(el){
			if(el !== that){
				return el;
			}
		}
	);
	return this;
};