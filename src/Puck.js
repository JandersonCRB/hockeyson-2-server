import Circle from './Circle';
import Player from './Player';
import Screen from './Screen';

class Puck extends Circle {
    static list = [];
    constructor({ color='#000000', x=Screen.WIDTH/2, y=Screen.HEIGHT/2, radius=5.0 } = {}) {
        super(...arguments);
        this.color = color;
        this.x = x;
        this.y = y;
        this.radius = radius;

        Puck.list.push(this);
    }

    tick() {
        const KNOCKBACK = 25;
        // LEFT BORDER
        if (this.x - this.radius <= 0) {
            this.x = KNOCKBACK + this.radius;
        }
        // TOP BORDER
        if (this.y - this.radius <= 0) {
            this.y = KNOCKBACK + this.radius;
        }
        // BOTTOM BORDER
        if (this.y + this.radius >= Screen.HEIGHT) {
            this.y = Screen.HEIGHT - KNOCKBACK - this.radius;
        }
        // RIGHT BORDER
        if (this.x + this.radius >= Screen.WIDTH) {
            this.x = Screen.WIDTH - KNOCKBACK - this.radius;
        }
        const players = Player.list;
        for(let i in players) {
            if(Puck.collides(this, players[i])) {
                console.log('----PLAYER----')
                console.log('x', players[i].x, 'y', players[i].y)
                const angle = Puck.angleBetweenPoints (players[i], this, Puck.UNIT.DEGREES); // Angle between puck and collided player
                // Distance between puck and collided player
                const distance = (this.radius + players[i].radius) - Puck.distanceBetweenCircles(this, players[i]) + 0.02;
                console.log(angle);

                console.log("old", this.x, this.y);
                // this.x += (Math.sin(angle) * distance);
                // this.y += (Math.cos(angle) * distance);
                
                // if(angle >= 337.5 && angle <= 360 || angle >= 0 && angle < 22.5) { // RIGHT
                //     this.x += distance;
                // }
                // else if (angle >= 22.5 && angle < 67.5) { // TOP-RIGHT
                //     this.x += distance; this.y -= distance;
                // } else if (angle >= 67.5 && angle < 112.5) { // TOP
                //     this.y -= distance;
                // } else if (angle >= 112.5 && angle < 157.5) { // TOP-LEFT
                //     this.x -= distance; this.y -= distance;
                // } else if (angle >= 157.5 && angle < 202.5) { // LEFT
                //     this.x -= distance;
                // } else if (angle >= 202.5 && angle < 247.5) { // BOTTOM-LEFT
                //     this.x -= distance; this.y += distance;
                // } else if (angle >= 247.5 && angle < 292.5) { // BOTTOM
                //     this.y += distance;
                // } else if (angle >= 292.5 && angle < 337.5) { // BOTTOM-RIGHT
                //     this.x += distance; this.y += distance;
                // }

                // if(angle >= 330 && angle <= 360 || angle >= 0 && angle < 30) { // RIGHT
                //     this.x += distance;
                // }
                // else if (angle >= 30 && angle < 60) { // TOP-RIGHT
                //     if(players[i].spdX > 0) this.x += distance; 
                //     if(players[i].spdY < 0) this.y -= distance;
                // } else if (angle >= 60 && angle < 120) { // TOP
                //     this.y -= distance;
                // } else if (angle >= 120 && angle < 150) { // TOP-LEFT
                //     if(players[i].spdX > 0) this.x -= distance; 
                //     if(players[i].spdY < 0) this.y -= distance;
                // } else if (angle >= 150 && angle < 210) { // LEFT
                //     this.x -= distance;
                // } else if (angle >= 210 && angle < 240) { // BOTTOM-LEFT
                //     if(players[i].spdX > 0) this.x -= distance; 
                //     if(players[i].spdY < 0) this.y += distance;
                // } else if (angle >= 240 && angle < 300) { // BOTTOM
                //     this.y += distance;
                // } else if (angle >= 300 && angle < 330) { // BOTTOM-RIGHT
                //     if(players[i].spdX > 0) this.x += distance; 
                //     if(players[i].spdY < 0) this.y += distance;
                // }
                
                if(angle >= 270 || angle < 90) { //RIGHT
                    if(players[i].spdX > 0) this.x += distance; 
                }
                if(angle >= 0 && angle < 180) { //TOP
                    if(players[i].spdY < 0) this.y -= distance;
                }
                if(angle >= 90 && angle < 270) { //LEFT
                    if(players[i].spdX < 0) this.x -= distance;
                }
                if(angle >= 180 && angle < 360) { //BOTTOM
                    if(players[i].spdY > 0) this.y += distance;
                }

            }
        }
    }
}

export default Puck;