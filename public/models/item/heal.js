export class Potion {
    // Potion, super poton, max potion, revive, max revive
    /**
     * Contructs Potion object
     * @param {string} type potion or revive?
     * @param {string} subtype what kind of potion or revive?
     * @param {int} healamt how much item heals by
     */
    constructor(name, amountToHeal, img, rarity) {
        this.name = name
        this.amountToHeal = amountToHeal
        this.img = img
        this.rarity = rarity
    }
}
export class Revive {
    /**
     * Contructs Move object
     * @param {string} type potion or revive?
     * @param {string} subtype what kind of potion or revive?
     * @param {int} healamt how much item heals by
     */
    constructor(name, percentheal) {
        this.name = name
        this.percentheal = percentheal
    }

    use(pokemon) {
        if (pokemon.currentStats.health > 0) {
            return {
                success: false,
                message: "cannot use a revive on a living pokemon..."
            }
        }

        else {
            return {
                success: pokemon.heal(pokemon.currenStats.maxHealth * this.percentheal),
                message: "Successfully used the " + this.name + " revive"
            }
        }
    }
}