export class Pokeball {
    /**
     * @param {string} name name of ball being used
     * @param {int} probabilityModifier how effective the ball is
     * @param {string} img route to image
     * @param {int} rarity how rare it is to find in openworld
     */
    constructor(name, probabilityModifier, img, rarity) {
        this.name = name
        this.probabilityModifier = probabilityModifier
        this.img = img
        this.rarity = rarity
    }
}