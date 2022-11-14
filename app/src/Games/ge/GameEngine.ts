const SCREEN = {
	width: 800,
	height: 400
}
export default class GameEngine {
	static screenWidth:number;
	static screenHeight:number;
	static keyPressed: any;
	static gameStarted: boolean = false;
	static gameOver: boolean = false;
	
	
	protected context;
	protected canvas;
	

	lastFrame;
	fpsInterval;

	constructor() {
		// window['geManager'] = {
		// 	gameObjects: []
		// }
		const canvas: HTMLCanvasElement | any = document.getElementById("canvas");
		this.context = canvas.getContext("2d");
		this.canvas = this.context.canvas;
		this.canvas.width = SCREEN.width;
		this.canvas.height = SCREEN.height;

		this.context.fillStyle = "#000";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.start();
		this.handleKeyPress();

		let fps = 30;
		this.fpsInterval = 1000 / fps;
		this.lastFrame = Date.now();
		let startTime = this.lastFrame;
		this.run();
		// this.update();
		// while (true) {
		// 	this.update();
		// 	this.draw();
		// }
		
	}

	setScreen(width: number, height: number) {
		GameEngine.screenWidth = width;
		GameEngine.screenHeight = height;

		this.canvas.width = width;
		this.canvas.height = height;
	}

	run = () => {
		requestAnimationFrame(this.run);
		let now = Date.now();
		let elapsed = now - this.lastFrame;
		if (elapsed > this.fpsInterval) {
			this.lastFrame = now - (elapsed % this.fpsInterval);

			this.update();
			this.draw();
		}
	}

	clear() {
		this.context.fillStyle = "#000";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}
	protected start() {};

	protected update() {
		this.clear();
	};

	protected draw() {};

	handleKeyPress() {
		document.addEventListener('keydown', (event) => {
			// console.log(event.key);
			if (event.key) {

				GameEngine.keyPressed = event.key;
			}
		});

		document.addEventListener('keyup', (event) => {

			GameEngine.keyPressed = false;
		});
	}

}
