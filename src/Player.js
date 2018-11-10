import randomcolor from 'randomcolor';

import GameObject from './GameObject';

class Player extends GameObject {
	static list = {};
	constructor(id, { color=randomcolor(), radius=12.5} = {}) {
		super();
		this.color = color;
		this.maxSpd = 10;
		this.radius = radius;
		this.pressignUp    = false;
		this.pressingRight = false;
		this.pressingDown  = false;
		this.pressingLeft  = false;

		this.spdX = 0;
		this.spdY = 0;

		Player.list[id] = this;
	}
	
	/**
	 * 
	 * @param {string} side 
	 *      Indicates the side the player is moving to
	 * @param {boolean} state 
	 * 		True if player is pressing the key, false if he unpressed the key
	 */
	move(side, state){
		if(side === "up"){
			this.pressingUp = state;
		} else if(side === "right"){
			this.pressingRight = state;
		} else if(side === "down") {
			this.pressingDown = state;
		} else if(side === "left") {
			this.pressingLeft = state;
		}
	}

	tick(){
		super.tick();
		updateSpeed(this);
		updatePosition(this);
	}

}

const updatePosition = player => {
	player.x += player.spdX;
	player.y += player.spdY;
}

const updateSpeed = player => {
	// Y axis
	if(player.pressingUp) {
		player.spdY = -player.maxSpd;
	}
	else if(player.pressingDown) {
		player.spdY = player.maxSpd;
	} else {
		player.spdY = 0;
	}

	// X axis
	if(player.pressingRight) {
		player.spdX = player.maxSpd;
	}
	else if(player.pressingLeft) {
		player.spdX = -player.maxSpd;
	} else {
		player.spdX = 0;
	}
}

export default Player;