import randomcolor from 'randomcolor';

import Circle from './Circle';
import Screen from './Screen';

class Player extends Circle {
	static list = {};
	constructor({ id=null, color=randomcolor(), radius=12.5 }) {
		super( ...arguments );
		this.id = id;
		this.color = color;
		this.maxSpd = 5;
		this.radius = radius;
		this.pressignUp    = false;
		this.pressingRight = false;
		this.pressingDown  = false;
		this.pressingLeft  = false;

		this.spdX = 0;
		this.spdY = 0;
		
		if(id) Player.list[id] = this;
	}
	
	static collides(a, b){
		return Math.hypot(b.x-a.x, b.y-a.y) <= a.radius + b.radius;
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
	// Simula o player na posição futura na qual ele está tentando se mover.
	const playerIntent = new Player({ x: player.x + player.spdX, y: player.y + player.spdY, radius: player.radius });

	// Verifica se o player está dentro dos limites da tela.
	if(playerIntent.x >= Screen.WIDTH || playerIntent.x < 0 || playerIntent.y >= Screen.HEIGHT || playerIntent.y < 0) {
		return
	}

	// Verifica a colisão de si mesmo com todos os outros players no jogo.
	for(let key in Player.list) {
		if(key === player.id){
			continue;
		}
		if(Player.collides(playerIntent, Player.list[key])){
			return;
		}
	}

	// Caso tudo tenha ocorrido bem, vai mover o player para a nova posição.
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