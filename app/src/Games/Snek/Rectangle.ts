import { PositionType, TransformType } from "../ge/Components/Transform";
import GameObject, { DimentionsType } from "../ge/GameObject";

export default class Square extends GameObject {

	constructor(name: string, position: PositionType, dimentions: DimentionsType, color?: string) {
		super(name, position, dimentions, color);
	}


	draw(context: any) {
		// console.log('ge draw');
		context.fillStyle = this.color;
		context.fillRect(this.transform.position.x, this.transform.position.y, this.dimentions.width, this.dimentions.height);
	}


}
