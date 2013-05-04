var PathInterface = new Interface('Path', ['init', 'next'])

/**
 * Le pattern est un chemin.
 */
function Path(implementation){
	var path;
	
	switch(implementation){
		case 'line':
			path = new Line();
		break;
		case 'circle':
			path = new Circle();
		break;
		case 'bezierCurve':
			path = new BezierCurve();
		break;
		default:
			path = new Line();
	}
	Interface.ensureImplements(path, PathInterface);
	return path;
	

}

Path.prototype.next = function (){
	if(this.x < this.pointArriver.x){
		var h = (this.a * this.x/this.y);
		this.x += 2 - (this.a / h);
		
		this.y = this.a*this.x + this.b;
	}
	return new Point(this.x, this.y);
};

Path.prototype.ligne = function (pointDepart, pointArriver){
	this.pointArriver = pointArriver;
	this.a = (pointArriver.y - pointDepart.y) / (pointArriver.x - pointDepart.x);
	this.x = pointDepart.x;
	this.y = pointDepart.y;
	this.b = this.y-(this.a*this.x);
};



Path.prototype.cercle = function (centre, rayon){
	this.a = centre.x;
	this.b = centre.y;
	this.r = rayon;
	
	/*(y - b)² = r² -(x - a)² 
	(y² - 2yb + b²) = r² -(x - a)² 
	y² = r² -(x - a)² + 2b + -b²*/
};
