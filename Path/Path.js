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
			try{
				path = instantiate(implementation)
			} catch(e) {
				throw Error("Undefined implemantation name " + implementation);
			}
	}
	Interface.ensureImplements(path, PathInterface);
	return path;
	

}