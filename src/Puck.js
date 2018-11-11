import Circle from './Circle';

class Puck extends Circle {
    constructor({ color= '#000000'} = {}) {
        super(...arguments);
    }
}

export default Puck;