import Circle from './Circle';

import Screen from './Screen';

class Puck extends Circle {
    constructor({ color='#000000', x=Screen.WIDTH/2, y=Screen.HEIGHT/2 } = {}) {
        super();
    }
}

export default Puck;