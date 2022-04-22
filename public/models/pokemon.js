export class Pokemon {
    #frontImg
    #backImg
    #baseStats
    #maxStats
    /**
     * @param {string} name name of pokemon ("Charmander")
     * @param {string} types elemental type of pokemon ("fire")
     * @param {array} moves array of moves ([moves.get("flamethrower"), moves.get("scratch"), moves.get("growl"))])
     * @param {string} frontImg image url of front of pokemon ("charmanderfront.png")
     * @param {string} backImg image url of back of pokemon ("charmandeback.png")
     * @param {Stat} baseStats starting / level 1 stats of the pokemon (new Stat(15, 20, 100))
     * @param {Stat} maxStats maximum possible / level 100 stats of the pokemon (new Stat(200, 250, 250))
     * @param {int} catchRate catch rate modifier
     */
    constructor(name, types, moves, frontImg, backImg, baseStats, maxStats, catchRate = 30) {
        this.name = name
        this.types = types
        this.moves = moves
        this.#frontImg = frontImg
        this.#backImg = backImg
        this.#baseStats = baseStats
        this.#maxStats = maxStats
        this.currentStats = baseStats
        this.totalExp = 0
        this.tempexp = 0
        this.nick = ""
        this.level = 0
        this.statusEffects = []
        this.canMove = true
    }

    /**
     * Replace a pokemon's move with another
     * @param {Move} newMove move to learn
     * @param {Move} moveToReplace move to unlearn
     * @returns true on success, false on failure
     */
    // TODO- make better (using different array methods)
    learnMove(newMove, moveToReplace) {
        for (let i = 0; i < this.moves.length; i++) {
            if (this.moves[i].equals(moveToReplace)) {
                this.moves[i] = newMove
                return true
            }
        }
        return false
    }

    /**
     * adds an array containing the id of the status_effect along with its effect values to the pokemon statuseffects array
     * @param {string} statusEffect the status effect given to the pokemon
     */
    // TODO- check if working
    addStatusEffect(statusEffect) {
        let allEffects = new Map()
        allEffects.set('Burned', {
            duration: 2,
            damage: this.#baseStats.maxHp * 0.1,
            immobility: false,
        })
        allEffects.set('Paralyzed', {
            duration: 2,
            damage: 0,
            immobility: true,
        })
        if (allEffects.has(statusEffect)) {
            this.statusEffects.push(allEffects.get(statusEffect))
        }
    }

    // TODO- check if working
    addExp(amt) {
        this.totalExp += amt
        this.tempexp += amt
        if (this.#getExpRequirement(this.level + 1) <= this.tempexp) {
            this.levelUp()
            this.tempexp = 0
        }
    }

    /**

     * @param {int} amt amount of damage to take
     * @returns true on faint, false otherwise
     */
    takeDamage(amt) {
        this.currentStats.health -= amt
        return this.fainted
    }

    /**
     * @param {int} amt amount of health points to heal / add to current hp
     */
    heal(amt) {
        this.currentStats.health += amt
        if (this.currentStats.health > this.#maxStats.health) this.currentStats.health = this.currentStats.maxHealth
        return true
    }

    /**
     * @param {int} prob probability of getting caught
     */
    catch(prob) {
        prob = (prob * this.catchRate) / 30

        let math = Math.random() * 100;
        if (math < prob) {
            // TODO: implement "caught" (add to User PC)
            return true;
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
    }

    /**
     * @param {int} level level to plug into experience requirement calculation
     * @returns amount of total experience required to level up from level 0 to that level
     */
    #getExpRequirement(level) {
        return 0.4 * Math.pow(level, 3)
    }
    get basics() {
        return `name: ${this.name}
stats:
-> current health: ${this.currentStats.health}
-> fainted: ${this.fainted}`
    }
}