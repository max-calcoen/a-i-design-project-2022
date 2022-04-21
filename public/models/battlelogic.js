export class BattleLogic {
    constructor(pokemon1, pokemon2) {
        this.pokemon1 = pokemon1
        this.pokemon2 = pokemon2
        this.turnnumber = 0
    }
    // TODO: make it possible to use potions
    turn(pokemon1move, pokemon2move = this.pokemon2.moves[Math.floor(Math.random() * 4)]) {

        let p1level = this.pokemon1.level
        let p1power = pokemon1move.power
        let p1attack = this.pokemon1.currentStats.attack
        let p2def = this.pokemon2.currentStats.defense
        let p1crit = 1
        if (Math.floor(Math.random() * 16) == 15) p1crit = 1.75 // 1/16 chance to deal 1.75x damage on critical attack
        let p1rand = (Math.floor(Math.random() * 15) + 85) / 100
        let p1stab = 1
        if (this.pokemon1.types[0] == pokemon1move.type) p1stab = 1.5
        let p1type = this.getEffectiveness(pokemon1move.type, this.pokemon2.types)
        let p1damage = Math.floor(((((2 * p1level / 5) + 2) * p1power * p1attack / p2def) / 50 + 2) * p1crit * p1rand * p1stab * p1type)

        let p2level = this.pokemon2.level
        let p2power = pokemon2move.power
        let p1def = this.pokemon1.currentStats.defense
        let p2attack = this.pokemon2.currentStats.attack
        let p2crit = 1
        if (Math.floor(Math.random() * 16) == 15) p2crit = 1.75 // 1/16 chance to deal 1.75x damage on crit
        let p2rand = (Math.floor(Math.random() * 15) + 85) / 100
        let p2stab = 1
        if (this.pokemon2.types[0] == pokemon1move.type) p2stab = 1.5
        let p2type = this.getEffectiveness(pokemon2move.type, this.pokemon1.types)

        let p2damage = Math.floor(((((2 * p2level / 5) + 2) * p2power * p2attack / p1def) / 50 + 2) * p2crit * p2rand * p2stab * p2type)

        //--------------------------takes care of effects prior to fight-----------------------------
        // TODO: broken, needs fixing
        let pokemon1effects = this.pokemon1.statusEffects
        for (let i = 0; i < pokemon1effects.length; i++) {
            pokemon1.takeDamage(pokemon1effects[i].damage)
            if (pokemon1effects[i].immobility) {
                this.pokemon1.canMove = false
            }
            pokemon1effects[i].duration--
            if (pokemon1effects[i].duration == 0) {
                this.pokemon1.statusEffects.splice(i, 1)
                this.pokemon1.canMove = true
            }
        }
        let pokemon2effects = this.pokemon2.statusEffects
        for (let i = 0; i < pokemon2effects.length; i++) {
            pokemon2.takeDamage(pokemon2effects[i].damage)
            if (pokemon2effects[i].immobility) {
                this.pokemon2.canMove = false
            }
            pokemon2effects[i].duration--
            if (pokemon2effects[i].duration == 0) {
                this.pokemon2.statusEffects.splice(i, 1)
                this.pokemon2.canMove = true
            }
        }
        //-------------------------------fight---------------------------------
        if (This.pokemon1.canMove && pokemon1.currentStats.speed > this.pokemon2.currentStats.speed) {
            let damageResult = this.pokemon2.takeDamage(p1damage)
            let inflicteffect = pokemon1move.inflict()
            if (inflicteffect != false) {
                this.pokemon1.statusEffects.addStatusEffect(inflicteffect)
            }
            if (this.pokemon1.canMove && damageResult) {
                return {
                    pokemon1: this.pokemon1,
                    pokemon2: this.pokemon2,
                    winner: 1
                }
            } else if (this.pokemon2.canMove && damageResult) {
                return {
                    pokemon1: this.pokemon1,
                    pokemon2: this.pokemon2,
                    winner: 2
                }
            }
        } else if (this.pokemon2.canMove) {
            let damageResult = this.pokemon1.takeDamage(p1damage)
            let inflicteffect = pokemon2move.inflict()
            if (inflicteffect != false) {
                this.pokemon2.statusEffects.addStatusEffect(inflicteffect)
            }
            if (this.pokemon1.canMove && damageResult) {
                return {
                    pokemon1: this.pokemon1,
                    pokemon2: this.pokemon2,
                    winner: 2
                }
            } else if (this.pokemon1.canMove && damageResult) {
                return {
                    pokemon1: this.pokemon1,
                    pokemon2: this.pokemon2,
                    winner: 1
                }
            }
        }
        this.turnnumber += 1
        return false
        // calculate damage ((((2 * level / 5) + 2) * power * attack / def) / 50 + 2) * crit * rand * stab * type
        // trigger status effects
    }

    // TODO: make it possible to throw pokeballs (calls turn())



    /**
     * @param {string} attack type of attacking pokemon
     * @param {string} def type of defending pokemon
     * @returns damage modifier
     */
    getEffectiveness(attack, def) {
        let types = new Map()

        types.set("normal", new Map())
        types.get("normal").set("normal", 1)
        types.get("normal").set("fighting", 1)
        types.get("normal").set("flying", 1)
        types.get("normal").set("poison", 1)
        types.get("normal").set("ground", 1)
        types.get("normal").set("rock", 0.5)
        types.get("normal").set("bug", 1)
        types.get("normal").set("ghost", 0)
        types.get("normal").set("steel", 0.5)
        types.get("normal").set("fire", 1)
        types.get("normal").set("water", 1)
        types.get("normal").set("grass", 1)
        types.get("normal").set("electric", 1)
        types.get("normal").set("physic", 1)
        types.get("normal").set("ice", 1)
        types.get("normal").set("dragon", 1)
        types.get("normal").set("dark", 1)
        types.get("normal").set("fairy", 1)

        types.set("fighting", new Map())
        types.get("fighting").set("normal", 2)
        types.get("fighting").set("fighting", 1)
        types.get("fighting").set("flying", 0.5)
        types.get("fighting").set("poison", 0.5)
        types.get("fighting").set("ground", 1)
        types.get("fighting").set("rock", 2)
        types.get("fighting").set("bug", 0.5)
        types.get("fighting").set("ghost", 0)
        types.get("fighting").set("steel", 2)
        types.get("fighting").set("fire", 1)
        types.get("fighting").set("water", 1)
        types.get("fighting").set("grass", 1)
        types.get("fighting").set("electric", 1)
        types.get("fighting").set("physic", 0.5)
        types.get("fighting").set("ice", 2)
        types.get("fighting").set("dragon", 1)
        types.get("fighting").set("dark", 2)
        types.get("fighting").set("fairy", 0.5)

        types.set("flying", new Map())
        types.get("flying").set("normal", 1)
        types.get("flying").set("fighting", 2)
        types.get("flying").set("flying", 1)
        types.get("flying").set("poison", 1)
        types.get("flying").set("ground", 1)
        types.get("flying").set("rock", 0.5)
        types.get("flying").set("bug", 2)
        types.get("flying").set("ghost", 1)
        types.get("flying").set("steel", 0.5)
        types.get("flying").set("fire", 1)
        types.get("flying").set("water", 1)
        types.get("flying").set("grass", 2)
        types.get("flying").set("electric", 0.5)
        types.get("flying").set("physic", 1)
        types.get("flying").set("ice", 1)
        types.get("flying").set("dragon", 1)
        types.get("flying").set("dark", 1)
        types.get("flying").set("fairy", 1)

        types.set("poison", new Map())
        types.get("poison").set("normal", 1)
        types.get("poison").set("fighting", 1)
        types.get("poison").set("flying", 1)
        types.get("poison").set("poison", 0.5)
        types.get("poison").set("ground", 0.5)
        types.get("poison").set("rock", 0.5)
        types.get("poison").set("bug", 1)
        types.get("poison").set("ghost", 0.5)
        types.get("poison").set("steel", 0)
        types.get("poison").set("fire", 1)
        types.get("poison").set("water", 1)
        types.get("poison").set("grass", 2)
        types.get("poison").set("electric", 1)
        types.get("poison").set("physic", 1)
        types.get("poison").set("ice", 1)
        types.get("poison").set("dragon", 1)
        types.get("poison").set("dark", 1)
        types.get("poison").set("fairy", 2)

        types.set("ground", new Map())
        types.get("ground").set("normal", 1)
        types.get("ground").set("fighting", 1)
        types.get("ground").set("flying", 0)
        types.get("ground").set("poison", 2)
        types.get("ground").set("ground", 1)
        types.get("ground").set("rock", 2)
        types.get("ground").set("bug", 0.5)
        types.get("ground").set("ghost", 1)
        types.get("ground").set("steel", 2)
        types.get("ground").set("fire", 2)
        types.get("ground").set("water", 1)
        types.get("ground").set("grass", 0.5)
        types.get("ground").set("electric", 2)
        types.get("ground").set("physic", 1)
        types.get("ground").set("ice", 1)
        types.get("ground").set("dragon", 1)
        types.get("ground").set("dark", 1)
        types.get("ground").set("fairy", 1)

        types.set("rock", new Map())
        types.get("rock").set("normal", 1)
        types.get("rock").set("fighting", 0.5)
        types.get("rock").set("flying", 2)
        types.get("rock").set("poison", 1)
        types.get("rock").set("ground", 0.5)
        types.get("rock").set("rock", 1)
        types.get("rock").set("bug", 2)
        types.get("rock").set("ghost", 1)
        types.get("rock").set("steel", 0.5)
        types.get("rock").set("fire", 2)
        types.get("rock").set("water", 1)
        types.get("rock").set("grass", 1)
        types.get("rock").set("electric", 1)
        types.get("rock").set("physic", 1)
        types.get("rock").set("ice", 2)
        types.get("rock").set("dragon", 1)
        types.get("rock").set("dark", 1)
        types.get("rock").set("fairy", 1)

        types.set("bug", new Map())
        types.get("bug").set("normal", 1)
        types.get("bug").set("fighting", 0.5)
        types.get("bug").set("flying", 0.5)
        types.get("bug").set("poison", 0.5)
        types.get("bug").set("ground", 1)
        types.get("bug").set("rock", 1)
        types.get("bug").set("bug", 1)
        types.get("bug").set("ghost", 0.5)
        types.get("bug").set("steel", 0.5)
        types.get("bug").set("fire", 0.5)
        types.get("bug").set("water", 1)
        types.get("bug").set("grass", 2)
        types.get("bug").set("electric", 1)
        types.get("bug").set("physic", 2)
        types.get("bug").set("ice", 2)
        types.get("bug").set("dragon", 1)
        types.get("bug").set("dark", 2)
        types.get("bug").set("fairy", 0.5)

        types.set("ghost", new Map())
        types.get("ghost").set("normal", 0)
        types.get("ghost").set("fighting", 1)
        types.get("ghost").set("flying", 1)
        types.get("ghost").set("poison", 1)
        types.get("ghost").set("ground", 1)
        types.get("ghost").set("rock", 1)
        types.get("ghost").set("bug", 1)
        types.get("ghost").set("ghost", 2)
        types.get("ghost").set("steel", 1)
        types.get("ghost").set("fire", 1)
        types.get("ghost").set("water", 1)
        types.get("ghost").set("grass", 1)
        types.get("ghost").set("electric", 1)
        types.get("ghost").set("physic", 2)
        types.get("ghost").set("ice", 1)
        types.get("ghost").set("dragon", 1)
        types.get("ghost").set("dark", 0.5)
        types.get("ghost").set("fairy", 1)

        types.set("steel", new Map())
        types.get("steel").set("normal", 1)
        types.get("steel").set("fighting", 1)
        types.get("steel").set("flying", 1)
        types.get("steel").set("poison", 1)
        types.get("steel").set("ground", 1)
        types.get("steel").set("rock", 2)
        types.get("steel").set("bug", 1)
        types.get("steel").set("ghost", 1)
        types.get("steel").set("steel", 0.5)
        types.get("steel").set("fire", 0.5)
        types.get("steel").set("water", 0.5)
        types.get("steel").set("grass", 1)
        types.get("steel").set("electric", 0.5)
        types.get("steel").set("physic", 1)
        types.get("steel").set("ice", 2)
        types.get("steel").set("dragon", 1)
        types.get("steel").set("dark", 1)
        types.get("steel").set("fairy", 2)

        types.set("fire", new Map())
        types.get("fire").set("normal", 1)
        types.get("fire").set("fighting", 1)
        types.get("fire").set("flying", 1)
        types.get("fire").set("poison", 1)
        types.get("fire").set("ground", 1)
        types.get("fire").set("rock", 0.5)
        types.get("fire").set("bug", 2)
        types.get("fire").set("ghost", 1)
        types.get("fire").set("steel", 2)
        types.get("fire").set("fire", 0.5)
        types.get("fire").set("water", 0.5)
        types.get("fire").set("grass", 2)
        types.get("fire").set("electric", 1)
        types.get("fire").set("physic", 1)
        types.get("fire").set("ice", 2)
        types.get("fire").set("dragon", 0.5)
        types.get("fire").set("dark", 1)
        types.get("fire").set("fairy", 1)

        types.set("water", new Map())
        types.get("water").set("normal", 1)
        types.get("water").set("fighting", 1)
        types.get("water").set("flying", 1)
        types.get("water").set("poison", 1)
        types.get("water").set("ground", 2)
        types.get("water").set("rock", 2)
        types.get("water").set("bug", 1)
        types.get("water").set("ghost", 1)
        types.get("water").set("steel", 1)
        types.get("water").set("fire", 2)
        types.get("water").set("water", 0.5)
        types.get("water").set("grass", 0.5)
        types.get("water").set("electric", 1)
        types.get("water").set("physic", 1)
        types.get("water").set("ice", 1)
        types.get("water").set("dragon", 0.5)
        types.get("water").set("dark", 1)
        types.get("water").set("fairy", 1)

        types.set("grass", new Map())
        types.get("grass").set("normal", 1)
        types.get("grass").set("fighting", 1)
        types.get("grass").set("flying", 0.5)
        types.get("grass").set("poison", 0.5)
        types.get("grass").set("ground", 2)
        types.get("grass").set("rock", 2)
        types.get("grass").set("bug", 0.5)
        types.get("grass").set("ghost", 1)
        types.get("grass").set("steel", 0.5)
        types.get("grass").set("fire", 0.5)
        types.get("grass").set("water", 2)
        types.get("grass").set("grass", 0.5)
        types.get("grass").set("electric", 1)
        types.get("grass").set("physic", 1)
        types.get("grass").set("ice", 1)
        types.get("grass").set("dragon", 0.5)
        types.get("grass").set("dark", 1)
        types.get("grass").set("fairy", 1)

        types.set("electric", new Map())
        types.get("electric").set("normal", 1)
        types.get("electric").set("fighting", 1)
        types.get("electric").set("flying", 2)
        types.get("electric").set("poison", 1)
        types.get("electric").set("ground", 0)
        types.get("electric").set("rock", 1)
        types.get("electric").set("bug", 1)
        types.get("electric").set("ghost", 1)
        types.get("electric").set("steel", 1)
        types.get("electric").set("fire", 1)
        types.get("electric").set("water", 2)
        types.get("electric").set("grass", 0.5)
        types.get("electric").set("electric", 0.5)
        types.get("electric").set("physic", 1)
        types.get("electric").set("ice", 1)
        types.get("electric").set("dragon", 0.5)
        types.get("electric").set("dark", 1)
        types.get("electric").set("fairy", 1)

        types.set("physic", new Map())
        types.get("physic").set("normal", 1)
        types.get("physic").set("fighting", 2)
        types.get("physic").set("flying", 1)
        types.get("physic").set("poison", 2)
        types.get("physic").set("ground", 1)
        types.get("physic").set("rock", 1)
        types.get("physic").set("bug", 1)
        types.get("physic").set("ghost", 1)
        types.get("physic").set("steel", 0.5)
        types.get("physic").set("fire", 1)
        types.get("physic").set("water", 1)
        types.get("physic").set("grass", 1)
        types.get("physic").set("electric", 1)
        types.get("physic").set("physic", 0.5)
        types.get("physic").set("ice", 1)
        types.get("physic").set("dragon", 1)
        types.get("physic").set("dark", 0)
        types.get("physic").set("fairy", 1)

        types.set("ice", new Map())
        types.get("ice").set("normal", 1)
        types.get("ice").set("fighting", 1)
        types.get("ice").set("flying", 2)
        types.get("ice").set("poison", 1)
        types.get("ice").set("ground", 2)
        types.get("ice").set("rock", 1)
        types.get("ice").set("bug", 1)
        types.get("ice").set("ghost", 1)
        types.get("ice").set("steel", 0.5)
        types.get("ice").set("fire", 0.5)
        types.get("ice").set("water", 0.5)
        types.get("ice").set("grass", 2)
        types.get("ice").set("electric", 1)
        types.get("ice").set("physic", 1)
        types.get("ice").set("ice", 0.5)
        types.get("ice").set("dragon", 2)
        types.get("ice").set("dark", 1)
        types.get("ice").set("fairy", 1)

        types.set("dragon", new Map())
        types.get("dragon").set("normal", 1)
        types.get("dragon").set("fighting", 1)
        types.get("dragon").set("flying", 1)
        types.get("dragon").set("poison", 1)
        types.get("dragon").set("ground", 1)
        types.get("dragon").set("rock", 1)
        types.get("dragon").set("bug", 1)
        types.get("dragon").set("ghost", 1)
        types.get("dragon").set("steel", 0.5)
        types.get("dragon").set("fire", 1)
        types.get("dragon").set("water", 1)
        types.get("dragon").set("grass", 1)
        types.get("dragon").set("electric", 1)
        types.get("dragon").set("physic", 1)
        types.get("dragon").set("ice", 1)
        types.get("dragon").set("dragon", 2)
        types.get("dragon").set("dark", 1)
        types.get("dragon").set("fairy", 0)

        types.set("dark", new Map())
        types.get("dark").set("normal", 1)
        types.get("dark").set("fighting", 2)
        types.get("dark").set("flying", 1)
        types.get("dark").set("poison", 0.5)
        types.get("dark").set("ground", 1)
        types.get("dark").set("rock", 1)
        types.get("dark").set("bug", 1)
        types.get("dark").set("ghost", 1)
        types.get("dark").set("steel", 0.5)
        types.get("dark").set("fire", 0.5)
        types.get("dark").set("water", 1)
        types.get("dark").set("grass", 1)
        types.get("dark").set("electric", 1)
        types.get("dark").set("physic", 1)
        types.get("dark").set("ice", 1)
        types.get("dark").set("dragon", 2)
        types.get("dark").set("dark", 2)
        types.get("dark").set("fairy", 1)

        types.set("fairy", new Map())
        types.get("fairy").set("normal", 1)
        types.get("fairy").set("fighting", 2)
        types.get("fairy").set("flying", 1)
        types.get("fairy").set("poison", 1)
        types.get("fairy").set("ground", 0.5)
        types.get("fairy").set("rock", 1)
        types.get("fairy").set("bug", 1)
        types.get("fairy").set("ghost", 1)
        types.get("fairy").set("steel", 0.5)
        types.get("fairy").set("fire", 0.5)
        types.get("fairy").set("water", 1)
        types.get("fairy").set("grass", 1)
        types.get("fairy").set("electric", 1)
        types.get("fairy").set("physic", 1)
        types.get("fairy").set("ice", 1)
        types.get("fairy").set("dragon", 0.5)
        types.get("fairy").set("dark", 0.5)
        types.get("fairy").set("fairy", 1)
        if (def.length == 1) return types.get(attack).get(def[0])
        return types.get(attack).get(def[0]) * types.get(attack).get(def[1])
    }
}