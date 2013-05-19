function AABBCollision(){
	
}

AABBCollision.prototype.touch = function(item1, item2){
	/*if((item2.x >= item1.x + item1.width) // on the right side
	|| (item2.x + item2.width <= item1.x) // On the left side
	|| ( item2.y >= item1.y + item1.height) // on the bottom
	|| (item2.y + item2.height <= item1.y)){ // on the bottom
		return false;
	} else{
		return true;
	}*/
	
	if(item2.x >= item1.x + item1.width){
		//console.log(" on the right side");
		return false;
	}
	else if(item2.x + item2.width <= item1.x){
		//console.log("On the left side");
		return false;
	}
	else if( item2.y >= item1.y + item1.height){
		//console.log("on the bottom");
		return false;
	}
	else if( item2.y + item2.height <= item1.y){ 
		//console.log("on the bottom");
		return false;
	} else{
		/*console.log("item2.x :" + item2.x, "item2.y : " + item2.y, "item2.width : " + item2.width,
			"item2.heigth : " + item2. heigth, "item1.x:  " +item1.x,  "item1.y : " + item1.y,
			"item1.width : " + item1.width, "item1.height : " + item1.height);*/
		return true;
	}
};