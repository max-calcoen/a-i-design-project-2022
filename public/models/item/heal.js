export class Heal extends Item {
    // Potion, super poton, max potion, revive, max revive
    #type
    #amt
    #subtype
    /**
     * Contructs Move object
     * @param {string} type potion or revive?
     * @param {string} subtype what kind of potion or revive?
     * @param {int} healamt how much item heals by
     */
    constructor(type, subtype, healamt) {
        this.#type = type
        this.#amt = healamt
        this.#subtype = subtype
    }
    use(type, pokemon) {
        let MAXHP = pokemon.currentStats.maxHealth
        if (type == 'potion') {
            if (pokemon.currentStats.health == 0) {
                return 'cannot use a potion on a fainted pokemon bozo...'
            }
            if (pokemon.currentStats.health == pokemon.baseStats.health) {
                return 'it would be a shame to waste such valuable resources...'
            }
            else {
                if (subtype == 'regular')
                    pokemon.heal(40)
                if (subtype == 'super')
                    pokemon.heal(100)
            }
        }
        if (type == 'Revive') {
            if (pokemon.currentStats.health == pokemon.baseStats.health) {
                return 'it would be a shame to waste such valuable resources...'
            }
            if (subtype == 'regular') {


            }
            if (subtype = 'max') {

            }

        }
    }
}