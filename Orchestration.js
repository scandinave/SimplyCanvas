function Orchestration(master){
	this.time;
	this.niveau = 0;
	this.master = master;
	this.text4 = new Text("Vecteur", 50, 50, false);
	this.fg = this.master.getLayers()[1];
	this.text4.font = new Font("20px", "Verdana");
	this.fg.addItem(this.text4);
               
};
 
Orchestration.prototype.loadVagues = function(){
	if(this.niveau == 0 && this.time ==  0){
		this.text4.addForce(new Vecteur(1,1));
	} else if(this.niveau == 0 && this.time ==  1){
		this.text4.addForce(new Vecteur(4,11));
	} else if(this.niveau == 0 && this.time ==  2){
		this.text4.addForce(new Vecteur(-5,4));
	   
	}
};
 
Orchestration.prototype.setTime = function(newTime){
	this.time = newTime;
	this.loadVagues();
};
