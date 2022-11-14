// import Collider from "./Entities/Collider";
import { StringLocale } from "yup/lib/locale";
import Transform, { PositionType, TransformType } from "./Components/Transform";
import Manager from "./Manager";

export type DimentionsType = {
	width: number,
	height: number
}

export type GameObjectType = {
	name: StringLocale
	transform: TransformType
	dimentions: DimentionsType;
	color: string
}

export default class GameObject  {
	name: string;
	components: any[];
	transform: TransformType;
	dimentions: DimentionsType;
	color: string = "#fff";

	constructor(name: string, position: PositionType, dimentions: DimentionsType, color?: string) {
		this.name = name;
		this.transform = new Transform(position);
		this.dimentions = dimentions;
		
		if (color) {
			this.color = color;
		}
		
		Manager.gameObjects[name] = this;
		// window['geManager'].gameObjects['test'] = 'aa';
		//tis.direction = [0, 0]
	}

	// update() {
	// 	this.collider.transform.position = this.transform.position;
	// }

	draw(context: any) {
		// this.context.fillStyle = "blue";
		// this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		console.log('ge draw');
	}

	// move(x: number, y: number) {
		
	// }
}
