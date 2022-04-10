export class Pokemon {
    #frontimg
    #backimg
    #basestats
    #maxstats
    #stats
    constructor(name, element, moves, frontImg, backImg, baseStats, maxStats) {
        this.name = name
        defaultElements = ["Water", "Fire", "Poison", "Grass", "Bug", "Fairy", "Dragon", "Normal", "Ghost", "Physic", "Lightning", "Flying", "Ground", "Rock", "Dark", "Steel", "Ice", "Fighting"]
        if (defaultElements.includes(element)) this.element = element
        this.moves = moves
        this.#frontImg = frontImg
        this.#backImg = backImg
        this.#baseStats = baseStats
        this.#maxStats = maxStats
        this.totalExp = 0
        this.nick = ""
        this.level = 0
    }

    /**
     * Replaces a pokemon's move with another
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

    addExp(amt) {

    }

    levelUp(toLevel = this.level + 1) {

    }
    /**
     * @param {int} level level to plug into experience requirement calculation
     * @returns amount of total experience required to level up from level 0 to that level
     */
    #getExpRequirement(level) {
        return 0.4 * Math.pow(level, 3)
    }
}