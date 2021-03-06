export class Pokemon {
    frontImg
    backImg
    #maxStats
    #catchRate
    /**
     * @param {string} name name of pokemon ("Charmander")
     * @param {array} types elemental type of pokemon (["fire"])
     * @param {array} moves array of moves ([moves.get("flamethrower"), moves.get("scratch"), moves.get("growl"))])
     * @param {string} frontImg image url of front of pokemon ("charmanderfront.png")
     * @param {string} backImg image url of back of pokemon ("charmandeback.png")
     * @param {Stat} baseStats starting  stats of the pokemon (new Stat(15, 20, 100))
     * @param {Stat} maxStats maximum possible / level 100 stats of the pokemon (new Stat(200, 250, 250))
     * @param {int} rarity chance to appear on the tilemap
     * @param {int} catchRate catch rate modifier
     */
    constructor(name, types, moves, frontImg, backImg, baseStats, maxStats, rarity, catchRate = 30) {
        this.name = name
        this.types = types
        this.moves = moves
        this.frontImg = frontImg
        this.backImg = backImg
        this.currentStats = baseStats
        this.#maxStats = maxStats
        this.totalExp = 0
        this.tempExp = 0
        this.nick = ""
        this.level = 0
        this.statusEffects = []
        this.canMove = true
        this.#catchRate = catchRate
        this.rarity = rarity
    }

    /**
     * Adds an array containing the id of the status_effect along with its effect values to the pokemon statuseffects array
     * @param {string} statusEffect the status effect given to the pokemon
     */
    // TODO- check if working
    addExp(amt) {
        this.totalExp += amt
        this.tempExp += amt
        if (this.#getExpRequirement(this.level + 1) <= this.tempExp) {
            this.levelUp()
            this.tempExp = 0
        }
    }

    /**
     * @param {int} amt amount of damage to take
     * @returns true on faint, false otherwise
     */
    takeDamage(amt) {
        this.currentStats.health = Math.max(this.currentStats.health - amt, 0)
        return this.fainted
    }

    /**
     * @param {int} amt amount of health points to heal / add to current hp
     */
    heal(amt) {
        let temp = this.currentStats.health
        this.currentStats.health += amt
        if (this.currentStats.health > this.currentStats.maxHealth) this.currentStats.health = this.currentStats.maxHealth
        return Math.min(amt, this.currentStats.health - temp)
    }

    /**
     * @param {Pokeball} pokeball pokeball object
     * @returns true if the pokemon has been caught, false if the pokemon escaped
     */
    catch(pokeball) {
        if (pokeball.probabilityModifier == 100) {
            return true
        }
        let check = (pokeball.probabilityModifier * this.#catchRate) / 30
        let rand = Math.random() * 100
        if (rand < check) {
            return true
        }
        return false
    }
    /**
     * @returns true on faint, false otherwise
     */
    get fainted() {
        if (this.currentStats.health <= 0) {
            this.currentStats.health = 0
            return true
        } else {
            return false
        }
    }


    // TODO
    levelUp(toLevel = this.level + 1) {
        // if the total exp is less than normal, boost there
        this.level += toLevel
        return false
    }

    /**
     * @param {int} level level to plug into experience requirement calculation
     * @returns amount of total experience required to level up from level 0 to that level
     */
    #getExpRequirement(level) {
        return 0.4 * Math.pow(level, 3)
    }
}