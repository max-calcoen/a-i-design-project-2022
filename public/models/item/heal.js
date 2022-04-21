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
        let MAXHP = pokemon.baseStats.health
        let currentHP = pokemon.currentStats.health
        if (type == 'potion') {
            if (currentHP == 0) {
                return 'cannot use a potion on a fainted pokemon bozo...'
            }
            if (currentHP == pokemon.baseStats.health) {
                return 'it would be a shame to waste such valuable resources...'
            }
            else {
                if (subtype == '')
                    currentHP += healamt
                if (currentHP > BaseHP) {
                    currentHP = BaseHP
                }
            }
        }
        if (type == 'Revive') {
            if (currentHP == pokemon.baseStats.health) {
                return 'it would be a shame to waste such valuable resources...'
            }
            if (subtype == 'regular') {


            }
            if (subtype = 'max') {

            }

        }
    }
}