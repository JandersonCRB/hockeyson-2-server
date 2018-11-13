import randomcolor from 'randomcolor';

import GameObject from './GameObject';

class Circle extends GameObject {
	constructor({ color=randomcolor(), radius=12.5 } = {}) {
		super( ...arguments );
		this.color = color;
		this.radius = radius;
	}


	static UNIT = Object.freeze({ RADIANS: 1, DEGREES: 2 })
	static angleBetweenPoints(src, target, unit=this.UNIT.RADIANS) {
		let theta = Math.atan2(target.y - src.y, target.x - src.x); // range (-PI, PI]
		if(unit === this.UNIT.RADIANS) {
			return theta;
		} 
		theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
		if (theta > 0) theta -= 360; // range [0, 360)
		theta *= -1;
		return theta;
		
	}

	static distanceBetweenCircles(a, b) {
		return Math.hypot(b.x-a.x, b.y-a.y);
	}

	static collides(a, b){
		return Circle.distanceBetweenCircles(a, b) < a.radius + b.radius;
	}
}

export default Circle;