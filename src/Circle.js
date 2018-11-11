import randomcolor from 'randomcolor';

import GameObject from './GameObject';

class Circle extends GameObject {
    constructor({ color=randomcolor(), radius=12.5 }) {
        super( ...arguments );
        this.color = color;
        this.radius = radius;
    }

    static collides(a, b){
		return Math.hypot(b.x-a.x, b.y-a.y) <= a.radius + b.radius;
	}
}

export default Circle;