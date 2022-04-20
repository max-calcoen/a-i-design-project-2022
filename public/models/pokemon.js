export class Pokemon {
    #frontImg
    #backImg
    #baseStats
    #maxStats
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
        let defaultElements = ["Water", "Fire", "Poison", "Grass", "Bug", "Fairy", "Dragon", "Normal", "Ghost", "Physic", "Lightning", "Flying", "Ground", "Rock", "Dark", "Steel", "Ice", "Fighting"]
        if (defaultElements.includes(element)) {
            this.element = element
        }
        this.moves = moves
        this.#frontImg = frontImg
        this.#backImg = backImg
        this.#baseStats = baseStats
        this.#maxStats = maxStats
        this.currentStats = baseStats
        this.currentHp = 100
        this.totalExp = 0
        this.tempexp = 0
        this.nick = ""
        this.level = 0
        this.currentHp = this.#baseStats.maxHp
        this.statusEffects = []
    }

    /**
     * Replace a pokemon's move with another
     * @param {Move} newMove move to learn
     * @param {Move} moveToReplace move to unlearn
     * @returns true on success, false on failure
     */
    learnMove(newMove, moveToReplace) {
        for (let i = 0; i < this.moves.length; i++) {
            if (this.moves[i].equals(moveToReplace)) {
                this.moves[i] = newMove
                return true
            }
        }
        return false
    }
    //adds an array containing the id of the status_effect along with its effect values to the pokemon statuseffects array
    addstatuseffect(status_effect) {
        let alleffects = [
            ['Frozen', Frozen = {
                duration = 2,
                damage = 0,
                immobility = true
            }],
            ['Burned', Burned = {
                duration = 2,
                damage = this.#baseStats.maxHp * 0.1,
                immobility = false
            }],
            ['Paralyzed', Paralyzed = {
                duration = 2,
                damage = 0,
                immobility = true
            }],
            ['Poisoned', Poisoned = {
                duration = 2,
                damage = this.#baseStats.maxHp * 0.05,
                immobility = false
            }],
            ['Sleeping', Sleeping = {
                duration = 2,
                damage = 0,
                immobility = true
            }]
        ]
        for (let i = 0; i < alleffects.length; i++) {
            if (status_effect == alleffects[i][0]) {
                this.statusEffects.push(alleffects[i])
            }
        }
    }

    // TODO
    addExp(amt) {
        this.totalExp += amt
        this.tempexp += amt
        if (getExpRequirement(this.level + 1) <= this.tempexp) {
            this.levelUp()
            this.tempexp = 0
        }
    }
    changenick(newnick) {
        if (typeof (newnick) == "string") {
            this.nick = newnick
        }
        else return false
    }
    /**
     * @param {int} amt amount of damage to take
     * @returns true on faint, false otherwise
     */
    takeDamage(amt) {
        this.currentStats.currentHp -= amt
        return this.fainted
    }

    /**
     * @param {int} amt amount of health points to heal / add to current hp
     */
    heal(amt) {
        this.currentStats.currentHp += amt
        if (this.currentStats.currentHp > this.currentStats.maxHp) this.currentStats.currentHp = this.currentStats.maxHp
    }

    /**
     * @returns true on faint, false otherwise
     */
    get fainted() {
        if (this.currentStats.currentHp <= 0) {
            this.currentStats.currentHp = 0
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