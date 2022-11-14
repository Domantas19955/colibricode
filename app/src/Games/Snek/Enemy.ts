import GameEngine from "/src/Games/ge/GameEngine";
import { PositionType } from "../ge/Components/Transform";
import { DimentionsType } from "../ge/GameObject";
import Square from "./Rectangle";


export default class Enemy extends Square {
	constructor(position: PositionType, dimentions: DimentionsType) {
		super('enemy', position, dimentions, "#f00")
	}

	draw(context: any) {
		super.draw(context);
	}

	respawn(nonRespawnPositions: PositionType[]) {
		// let newPos = this.getNewEnemyPosition();

		// let inclides = false;
		// for (const pos of nonRespawnPositions) {
		// 	if ((pos.x == newPos.x) && (pos.y === newPos.y)) {
		// 		inclides = true;
		// 		break;
		// 	}
		// }

		// if (inclides) {
		// 	console.log(nonRespawnPositions);
		// 	this.respawn(nonRespawnPositions);
		// } else {
		// 	this.transform.position = newPos;
		// }
		let newPos = this.getNewEnemyPosition();

		for (const pos of nonRespawnPositions) {
			if ((pos.x == newPos.x) && (pos.y === newPos.y)) {
				this.respawn(nonRespawnPositions);
				console.log(nonRespawnPositions);
				return;
			}
		}

		this.transform.position = newPos;
	}

	getNewEnemyPosition() {
		// regenerate if colides player
		let maxMapSquaresX = GameEngine.screenWidth / this.dimentions.width;
		let maxMapSquaresY = GameEngine.screenHeight / this.dimentions.height;

		return {
			x: generateRandomIntegerInRange(0, maxMapSquaresX - 1) * 25,
			y: generateRandomIntegerInRange(0, maxMapSquaresY - 1) * 25
		}
	}


}

function generateRandomIntegerInRange(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}