import GameEngine from "./GameEngine";


export default class GUI {
	screen: string
	backgroundColor: string

	constructor(screen: string, backgroundColor: string) {
		this.screen = screen;
		this.backgroundColor = backgroundColor;
	}

	update() {

	}

	draw(context: any) {
		context.fillStyle = this.backgroundColor;
		// context.globalAlpha = 0.2;
		context.fillRect(0, 0, GameEngine.screenWidth, GameEngine.screenHeight);
		// context.globalAlpha = 1.0;
	}

	setScreen(screen: string) {
		this.screen = screen;
	}
}