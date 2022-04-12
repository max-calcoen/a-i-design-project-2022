export class Move {
    #inflict
    /**
     * Contructs Move object
     * @param {String} name name of move (Flamethrower)
     * @param {String} type type of move (Fire)
     * @param {boolean} isSpecial special attack not regular attack
     * @param {int} power power of move
     * @param {int} pp power points- number of times a pokemon can use an attack
     * @param {int} accuracy chance out of 100 to hit target
     * @param {Array} inflict array constituting of inflict type, chance to hit
     */
    constructor(name, type, isSpecial, power, pp, accuracy, inflict) {
        this.name = name
        this.type = type
        this.isSpecial = isSpecial
        this.power = power
        this.pp = pp
        this.accuracy = accuracy
        this.#inflict = inflict
    }
    /**
     * @return {String, boolean} returns the inflict type if success, returns false otherwise
     */
    get inflict() {
        if (this.#inflict.length <= 1) return false
        let random = Math.round(Math.random() * 100 + 1)
        if (this.#inflict[1] >= random) {
            return this.#inflict[0]
        }
        return false
    }


}