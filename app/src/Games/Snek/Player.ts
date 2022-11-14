import GameEngine from "/src/Games/ge/GameEngine";
import { PositionType, RotationType } from "../ge/Components/Transform";
import { DimentionsType } from "../ge/GameObject";
import Square from "./Rectangle";
import Manager from "../ge/Manager";


export default class Player {
	segments: Square[] = [];
	movementspeed = 120; // in ms
	lastIteration: number = Date.now();
	segmentDimentions: DimentionsType = {
		width: 25,
		height: 25
	}
	nextStepDirection: any;
	enemyCollided: boolean = false;
	movementRestricted = false;
	score = 0;
	startingPos = [
		{x: 225, y: 250},
		{x: 225, y: 225}
	]

	start() {
		
		let segment1 = new Square('playerSegment_0', this.startingPos[0], this.segmentDimentions, '#090');
		let segment2 = new Square('playerHeadSegment', this.startingPos[1], this.segmentDimentions, '#070');
		segment2.transform.rotation = [0, -1];
		this.segments.push(segment1);
		this.segments.push(segment2);
	}

	update() {
		this.handleKeyPress();

		let now = Date.now();
		let elapsed = now - this.lastIteration;
		if (elapsed > this.movementspeed) {
			this.lastIteration = now - (elapsed % this.movementspeed);

			this.move();
		}
		// 
	}


	move() {
		console.log(Manager.gameObjects);
		if (this.movementRestricted) {

			return;
		}

		let headSegment = this.segments[this.segments.length - 1];

		if (this.nextStepDirection) {
			if (this.nextStepDirection[0] !== (headSegment.transform.rotation[0] * -1)
				&& this.nextStepDirection[1] !== (headSegment.transform.rotation[1] * -1)) {
				headSegment.transform.rotation = this.nextStepDirection;
			}
		}

		let nextPos = {
			x: headSegment.transform.position.x + (headSegment.dimentions.width * headSegment.transform.rotation[0]),
			y: headSegment.transform.position.y + (headSegment.dimentions.height * headSegment.transform.rotation[1])
		}

		const boundariesKills = true;

		if (boundariesKills) {
			const rightWallCollision = (nextPos.x + headSegment.dimentions.width) > GameEngine.screenWidth;
			const leftWallCollision = nextPos.x < 0;
			const bottomWallCollision = (nextPos.y + headSegment.dimentions.height) > GameEngine.screenHeight;
			const topWallCollision = nextPos.y < 0;
			// colides boundaries
			if (rightWallCollision || leftWallCollision || bottomWallCollision || topWallCollision) {
				this.die();
				return;
			}
		} else {

			// colides boundaries
			if ((nextPos.x + headSegment.dimentions.width) > GameEngine.screenWidth) {
				nextPos.x = 0;
			}

			if (nextPos.x < 0) {
				nextPos.x = GameEngine.screenWidth - headSegment.dimentions.width;
			}

			if ((nextPos.y + headSegment.dimentions.height) > GameEngine.screenHeight) {
				nextPos.y = 0;
			}

			if (nextPos.y < 0) {
				nextPos.y = GameEngine.screenHeight - headSegment.dimentions.height;
			}
		}

		if (this.collidesSelf(nextPos)) {
			this.die();

			return;
		}

		if (this.enemyCollided) {
			this.score++;
			const newHead = new Square('playerSegment_' + this.segments.length, nextPos, this.segmentDimentions, '#070');
			this.segments.push(newHead);
			this.segments[this.segments.length - 2].color = '#090'
			this.segments[this.segments.length - 1].transform.rotation = this.segments[this.segments.length - 2].transform.rotation;
			this.enemyCollided = false;
		} else {
			// body segments
			for (let i = 0; i < this.segments.length; i++) {
				const segment = this.segments[i];
				
				if (this.segments[i + 1]) {
					segment.transform.position = this.segments[i + 1].transform.position;
				} else {
					segment.transform.position = nextPos;
				}
			}
		}
	}


	draw(context: any) {
		for (let i = 0; i < this.segments.length; i++) {
			const segment = this.segments[i];
			segment.draw(context);
		}
	}

	handleKeyPress() {
		const headSegment = this.segments[0];

		// if (GameEngine.keyPressed === 'f')
		// {
		// 	this.movementRestricted = true;
		// }

		if (GameEngine.keyPressed === 'ArrowRight' && (headSegment.transform.rotation[0] !== -1)) {
			
			this.nextStepDirection = [1, 0];
		}

		if (GameEngine.keyPressed === 'ArrowLeft' && (headSegment.transform.rotation[0] !== 1)) {
			this.nextStepDirection = [-1, 0];
		}

		if (GameEngine.keyPressed === 'ArrowUp' && (headSegment.transform.rotation[1] !== 1)) {
			this.nextStepDirection= [0, -1];
		}

		if (GameEngine.keyPressed === 'ArrowDown' && (headSegment.transform.rotation[1] !== -1)) {
			this.nextStepDirection = [0, 1];
		}
	}

	collides(object: any) {
		let headSegment = this.segments[this.segments.length - 1];

		const collidesHorizontaly = (headSegment.transform.position.x + headSegment.dimentions.width) > object.transform.position.x
			&& headSegment.transform.position.x < (object.transform.position.x + object.dimentions.width);

		const collidesVerticaly = (headSegment.transform.position.y + headSegment.dimentions.height) > object.transform.position.y
			&& headSegment.transform.position.y < (object.transform.position.y + object.dimentions.height);
		
		return collidesHorizontaly && collidesVerticaly;
	}

	collidesSelf(nextPos: PositionType) {
		const head = this.segments[this.segments.length - 1];

		let colidesSelf = false;
		for (let i = 0; i < (this.segments.length - 1); i++) {
			const segment = this.segments[i];

			if ((nextPos.x === segment.transform.position.x) && nextPos.y === segment.transform.position.y) {
				colidesSelf = true;
			}
		}


		return colidesSelf;
	}

	die() {
		this.movementRestricted = true;
		GameEngine.gameOver = true;
	}

	restart() {
		this.segments = [];
		let segment1 = new Square('playerSegment_0', this.startingPos[0], this.segmentDimentions, '#090');
		segment1.transform.rotation = [0, 0];
		let segment2 = new Square('playerHeadSegment', this.startingPos[0], this.segmentDimentions, '#070');
		segment2.transform.rotation = [0, -1];
		this.segments.push(segment1);
		this.segments.push(segment2);
		
		this.movementRestricted = false;
	}
}