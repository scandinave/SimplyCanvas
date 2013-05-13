function SimpleLoader(){
	var ressources ;
	var canvas;
	var ctx; 
	
	this.getRessources = function(){
		return ressources;
	};
	
	this.setAllRessources = function(newRessources){
		ressources = newRessources;
	};
	
	this.getCanvas = function(){
		return canvas;
	};
	
	this.setCanvas = function(newCanvas){
		canvas = newCanvas;
	};
	
	this.getCtx = function(){
		return ctx;
	};
	
	this.setCtx = function(newCtx){
		ctx = newCtx;
	};
};

SimpleLoader.prototype.init = function (ressources, canvas, ctx){
	this.setAllRessources(ressources);
	this.setCanvas(canvas);
	this.setCtx(ctx);
};

SimpleLoader.prototype.draw = function (){
	var that = this;
	this.getCtx().clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
	this.getCtx().fillStyle = "black";
	this.getCtx().fillRect(0,0,this.getCanvas().width, this.getCanvas().height)
	for(var i = 0; i < this.getRessources().length; i++){
		var data = this.getRessources()[i];
		if(data instanceof Picture){
			var drawLoader = function(nbLoad){
				that.getCtx().clearRect(0, 0, that.getCanvas().width, that.getCanvas().height);
				that.getCtx().fillStyle = "black";
				that.getCtx().fillRect(0,0, that.getCanvas().width, that.getCanvas().height);
				that.getCtx().fillStyle = "white";
				that.getCtx().fillText("Chargement en cours ... " + Number(nbLoad) +"/"+ Number(100), that.getCanvas().width/2, 100 );
			}
			data.img = new Image();
			data.img.src = data.src;
			data.img.onload = drawLoader(Number(i)+1); //Update loader to reflect picture loading progress
		} else if(data instanceof Animation){
			/* Load animation */
		} else if(data instanceof Video){
			/* Load video */
		} else if(data instanceof Sound){
			/* Load sound */
		}else {
		
		}
	}
};