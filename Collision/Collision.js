var CollisionInterface = new Interface('Collision', ['touch'])

function Collision(implementatation){
	var collision;
	switch(implementatation){
		case 'AABBCollision':
			collision = new AABBCollision();
		break;
		default:
			collision = new AABBCollision();
	}
	Interface.ensureImplements(collision, CollisionInterface);
	return collision;
}

Collision.prototype.touch = function(item1, item2){
	//this.implementation.touch(item1, item2);
};


Collision.prototype.test = function(){
	throw "Not implemented";
};


