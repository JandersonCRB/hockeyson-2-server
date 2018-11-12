import Circle from './Circle';

import Screen from './Screen';

class Puck extends Circle {
    constructor({ color='#000000', x=Screen.WIDTH/2, y=Screen.HEIGHT/2, radius=5.0 } = {}) {
        super(...arguments);
        this.color = color;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}

export default Puck;