export type PositionType = {
	x: number,
	y: number
}

export type RotationType = number[];

export type TransformType = {
	position: PositionType
	rotation: RotationType
}

export default class Transform {
	position: PositionType = {
		x: 0,
		y: 0
	};
	rotation: RotationType = [0, 0];

	constructor(position?: PositionType) {
		if (position) {
			this.position = position;
		}
	}

	translate() {

	}

}
