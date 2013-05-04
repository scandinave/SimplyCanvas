function Line(){
	this.courbe = new Array();
	this.type;
	this.a;
	this.b;
	this.x;
	this.y;
	this.pointArriver;
}

Line.prototype.init = function (pointDepart, pointArriver){
	this.pointArriver = pointArriver;
	this.a = (pointArriver.y - pointDepart.y) / (pointArriver.x - pointDepart.x);
	this.x = pointDepart.x;
	this.y = pointDepart.y;
	this.b = this.y-(this.a*this.x);
};

Line.prototype.next = function (){
	if(this.x < this.pointArriver.x){
		var h = (this.a * this.x/this.y);
		this.x += 2 - (this.a / h);
		
		this.y = this.a*this.x + this.b;
	}
	return new Point(this.x, this.y);
};