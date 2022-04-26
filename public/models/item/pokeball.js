import { Item } from "./item.js"

export class Pokeball extends Item {
    /**
     * @param {string} type type of ball being used
     * @param {int} probabilityModifier probability modifier of catch
     */
    constructor(type, probabilityModifier) {
        this.type = type;
        this.probabilityModifier = probabilityModifier
    }
}