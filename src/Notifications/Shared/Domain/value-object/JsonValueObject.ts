export abstract class JsonValueObject {
	readonly value: object;

	constructor(value: object) {
		this.value = value;
	}
}
