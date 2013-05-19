function Timer(){
	this.subscribers = [];
	this.time = 0;
}

Timer.prototype.deliver = function(){
	this.time++;
	console.log(this.time);
	/*this.subscribers.forEach(
		function(element, index, array){
			element.removeEnnemy(item);
		}
	);*/
};