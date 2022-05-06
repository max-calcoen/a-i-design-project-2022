// TODO: class Revive extends Potion

export class Potion extends Item {
    // Potion, super poton, max potion, revive, max revive
    #type
    #amt
    /**
     * Contructs Potion object
     * @param {string} type potion or revive?
     * @param {string} subtype what kind of potion or revive?
     * @param {int} healamt how much item heals by
     */
    constructor(name, amountToHeal) {
        this.name = name
        this.amountToHeal = amountToHeal
    }

    use(pokemon) {
        if (pokemon.currentStats.health == 0) {
            return {
                success: false,
                message: "cannot use a potion on a fainted pokemon bozo..."
            }
        }
        if (pokemon.currentStats.health == pokemon.currentStats.maxHealth) {
            return {
                success: false,
                message: "it would be a shame to waste such valuable resources..."
            }
        }
        return {
            success: pokemon.heal(this.amount),
            message: "successfully used the " + this.name + " potion"
        }
    }
}
export class Revive extends Item {
    // Potion, super poton, max potion, revive, max revive
    percentheal

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
                message: "cannot use a revive on a living pokemon bozo..."
            }
        }

        else {
            return {
                success: pokemon.heal(pokemon.currenStats.maxHealth * this.percentheal),
                message: "successfully used the " + this.name + " revive"
            }
        }
    }
}