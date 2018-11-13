class GameObject {
    static list = [];
    constructor({x=0, y=0} = {}) {
        this.x = x;
        this.y = y;
    }
    
    tick(){ }
    destroy() {
        // Remove the current element from list
        GameObject.list = GameObject.filter(elmnt => elmnt !== this);
    }
}

export default GameObject;