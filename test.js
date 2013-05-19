window.onload = function(){
    var dash = new SimplyCanvas();
	var bg = new Layer("background", 1680, 889, 1);
	dash.addLayer(bg);
	
	var fg = new Layer("foreground", 1680, 889, 2);
	dash.addLayer(fg);
	
	
	var text1 = new Text("Corbeille", 1, 50);
	text1.font = new Font("15px", "Georgia");
	var text2 = new Text("Corbeille2", 1, 50);
	text2.font = new Font("15px", "Georgia");
	var text3 = new Text("Dashboard", 750, 50, false);
	text3.font = new Font("50px", "Verdana");
	var image = new Picture("img/corbeille.png", 50, 50, 50, 50);
	var image2 = new Picture("img/corbeille.png", 50, 50, 50, 50);
	var icon = new Icon("http://supervisionng.intradef.gouv.fr/supervision/", 1600, 20, 50, 50);
	var icon2 = new Icon("http://supervisionng.intradef.gouv.fr/supervision/", 400, 20, 50, 50);
	var dock = new Dock(0, 250, 816, 1200, 73);
	/*for(var i = 0; i < 20; i++){
		var pic = new Picture("img/corbeille.png", 50, 50, 50, 50);
		pic.isVisible = false;
		fg.addItem(pic);
		
	}*/
	
	icon.addText(text1).addPicture(image);
	icon.draggable = true;
	icon.movable = true;
	icon.movableKey = {"haut" : 90, "bas" : 83, "droite" : 68,  "gauche" : 81};
	icon2.addText(text2);
	icon2.addPicture(image2);
	icon2.draggable = true;
	icon2.movable = true;
	icon2.movableKey = {"haut" : 38, "bas" : 40, "droite" : 39,  "gauche" : 37};
	
	icon.addEnnemy(icon2);
	console.log(icon);
	icon.subscribe(icon2.onDie);
	bg.addItem(text3);
	bg.addItem(icon);
	bg.addItem(dock);
	fg.addItem(icon2);
	var orchest = new Orchestration();
	orchest.subscribe(dash.getTimer());
	
	/*var hashMap = new Map("hashMap");
	hashMap.put("ennemy1", icon);
	hashMap.put("ennemy2", icon);
	hashMap.put("ennemy3", icon);
	hashMap.put("ennemy4", icon);
	//console.log("taille du tableau " + hashMap.size());
	//console.log("Contient la clé ennemy1 : " + hashMap.containsKey("ennemy1"));
	//console.log("Contient la valeur icon : " + hashMap.containsValue(icon));
	hashMap.remove("ennemy3");*/
	//console.log("taille du tableau " + hashMap.size(), hashMap.keySet(), hashMap.entrySet());
	console.log("Background item " + bg.getItems().length);
	console.log("Foreground item " + fg.getItems().length);
	console.log("Dash item " + dash.getItems().length);
	
	dash.update();
};