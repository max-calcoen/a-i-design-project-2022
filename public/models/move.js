export class Move {
    #inflict
    /**
     * Contructs Move object
     * @param {string} name name of move ("Flamethrower")
     * @param {string} type type of move ("fire")
     * @param {boolean} isSpecial true if special attack, false if regular attack (true)
     * @param {int} power power of move (70)
     * @param {int} pp power points- number of times a pokemon can use an attack (10)
     * @param {int} accuracy chance out of 100 to hit target (90)
     */
    constructor(name, type, isSpecial, power, pp, accuracy) {
        this.name = name
        this.type = type
        this.isSpecial = isSpecial
        this.power = power
        this.pp = pp
        this.accuracy = accuracy
    }
}