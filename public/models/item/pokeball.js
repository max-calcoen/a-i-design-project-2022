import { User } from "../user.js"
import { Item } from "./item.js"

export class Pokeball extends Item {
    /**
     * @param {string} name name of ball being used
     * @param {int} probabilityModifier how effective the ball is
     */
    constructor(name, probabilityModifier) {
        this.name = name;
        this.probabilityModifier = probabilityModifier;
    }
}