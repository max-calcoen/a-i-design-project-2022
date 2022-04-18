export class Pokemon {
    #frontimg
    #backimg
    #basestats
    #maxstats
    #stats
    /**
     * @param {string} name name of pokemon ("Charmander")
     * @param {string} element elemental type of pokemon ("fire")
     * @param {array} moves array of moves ([moves.get("flamethrower"), moves.get("scratch"), moves.get("growl"))])
     * @param {string} frontImg image url of front of pokemon ("charmanderfront.png")
     * @param {string} backImg image url of back of pokemon ("charmandeback.png")
     * @param {Stat} baseStats starting / level 1 stats of the pokemon (new Stat(15, 20, 100))
     * @param {Stat} maxStats maximum possible / level 100 stats of the pokemon (new Stat(200, 250, 250))
     */
    constructor(name, element, moves, frontImg, backImg, baseStats, maxStats) {
        this.name = name
        defaultElements = ["Water", "Fire", "Poison", "Grass", "Bug", "Fairy", "Dragon", "Normal", "Ghost", "Physic", "Lightning", "Flying", "Ground", "Rock", "Dark", "Steel", "Ice", "Fighting"]
        if (defaultElements.includes(element)) this.element = element
        this.moves = moves
        this.#frontImg = frontImg
        this.#backImg = backImg
        this.#baseStats = baseStats
        this.#maxStats = maxStats
        this.stats = baseStats
        this.totalExp = 0
        this.nick = ""
        this.level = 0
        this.currentHp = this.#basestats.maxHp
        this.statusEffects = []
    }

    /**
     * Replace a pokemon's move with another
     * @param {Move} newMove move to learn
     * @param {Move} moveToReplace move to unlearn
     * @returns true on success, false on failure
     */
    learnMove(newMove, moveToReplace) {
        for (let i = 0; i < this.#moves.length; i++) {
            if (this.moves[i].equals(moveToReplace)) {
                this.moves[i] = newMove
                return true
            }
        }
        return false
    }

    // TODO
    addExp(amt) {

    }

    /**
     * @param {int} amt amount of damage to take
     * @returns true on faint, false otherwise
     */
    takeDamage(amt) {
        this.#stats.currentHp -= amt
        return this.fainted
    }

    /**
     * @param {int} amt amount of health points to heal / add to current hp
     */
    heal(amt) {
        this.#stats.currentHp += amt
        if (this.#stats.currentHp > this.#stats.maxHp) this.#stats.currentHp = this.#stats.maxHp
    }

    /**
     * @returns true on faint, false otherwise
     */
    get fainted() {
        if (this.#stats.currentHp <= 0) {
            return true
        } else {
            return false
        }
    }

    // TODO
    levelUp(toLevel = this.level + 1) {
        // if the total exp is less than normal, boost there
    }

    /**
     * @param {int} level level to plug into experience requirement calculation
     * @returns amount of total experience required to level up from level 0 to that level
     */
    #getExpRequirement(level) {
        return 0.4 * Math.pow(level, 3)
    }
}