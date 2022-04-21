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
     * @param {map} inflict array constituting of inflict type, chance to hit (new Map([["burning", 10]]))
     */
    constructor(name, type, isSpecial, power, pp, accuracy, inflict = []) {
        this.name = name
        this.type = type
        this.isSpecial = isSpecial
        this.power = power
        this.pp = pp
        this.accuracy = accuracy
        this.#inflict = inflict
    }

    /**
     * @return {string} returns the inflict type
     * @return {boolean} returns false if no infliction
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