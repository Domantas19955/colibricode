import GameEngine from "/src/Games/ge/GameEngine";
import GUI from "/src/Games/ge/GUI";

export default class snekGUI extends GUI {
	constructor(screen: string, backgroundColor: string) {
		super(screen, backgroundColor);
	}

	draw(context: any, score?: number) {
		super.draw(context);
		context.fillStyle = "#fff";
		context.font = '24px Arial';

		if (this.screen === 'Start') {
			
			let text = 'Press space to start'

			context.fillText(text, this.getHorisontalTextPos(context, text), 160);
		}

		if (this.screen === 'GameOver') {
			let text = 'Game Over! Score: ' + score?.toString();
			context.fillText(text, this.getHorisontalTextPos(context, text), 160);
			text = 'Press space to play again';
			context.font = '18px Arial';
			context.fillText(text, this.getHorisontalTextPos(context, text), 200);

		}
		

	}

	getHorisontalTextPos(context: any, string: string)
	{
		const screenCenter = GameEngine.screenWidth / 2;
		const textWidth = context.measureText(string).width;

		return screenCenter - (textWidth / 2);
	}
}