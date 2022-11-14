
// TODO
/*
	game over
	perkelt logika i gameobjectus
	
*/
import GameEngine from "/src/Games/ge/GameEngine";
import Player from "./Snek/Player";
import Enemy from "./Snek/Enemy";
import snekGUI from "./Snek/gui";
import Manager from "./ge/Manager";

export default class Snek extends GameEngine {
	player: any;
	enemy: any;
	score: number = 0;
	scoreHTML = document.getElementById('score');
	gui: any;

	constructor() {
		super();

		this.setScreen(500, 500);

		this.gui = new snekGUI("Start", "#000");

		this.player = new Player();
		this.player.start();
		this.enemy = new Enemy({x: 25, y: 25}, {width: 25, height: 25})
		this.enemy.respawn(this.player.segments.map((seg: any) => seg.transform.position));
	}

	start() {
		// console.log(this.player);
	}

	update() {
		if (!GameEngine.gameStarted && GameEngine.keyPressed === ' ') {
			GameEngine.gameStarted = true;
		}

		if (GameEngine.gameOver && GameEngine.keyPressed === ' ') {
			// 
			// console.log( GameEngine.keyPressed);
			GameEngine.gameOver = false;
			this.score = 0;
			this.enemy.respawn(this.player.segments.map((seg: any) => seg.transform.position));
			this.player.restart();
			
		}
		
		if (GameEngine.gameOver || !GameEngine.gameStarted) {
			this.gui.update();
		} else {
			this.player.update();

			if (this.player.collides(this.enemy)) {
				this.score++;

				if (this.scoreHTML) {
					this.scoreHTML.innerHTML = this.score.toString();
				}

				this.player.enemyCollided = true;
				this.enemy.respawn(this.player.segments.map((seg: any) => seg.transform.position));
			}
		}
		
		super.update();
	}

	draw() {

		if (GameEngine.gameStarted && !GameEngine.gameOver) {
			this.enemy.draw(this.context);
			this.player.draw(this.context);
		} else {
			if (GameEngine.gameOver) {
				if (this.gui.screen !== 'GameOver') {
					this.gui.setScreen('GameOver');
				}
			}
			this.gui.draw(this.context, this.score);
		}
		
	}

}