import { pokedex }  from "../dex/pokedex.js"

export class User {
    /**
     * Set up a new User with blank username and Personal Computer
     * @param {string} username username
     * @param {string} password password
     */
    constructor(username, password) {
        this.username = username
        this.password = password
        this.inventory = {
            pokeballs: new Map(),
            potions: new Map()
        }
        this.pc = []
    }

    /**
     * Adds the given Pokemon to the user's Personal Computer
     * @param {Pokemon} pokemon pokemon to add to pc
     * @param {string} nick nickname of pokemon
     * @returns false if pc is full, true on success
     */
    addPokemonToPc(pokemon, nick) {
        if (this.pc.length == 4) {
            return false
        }
        pokemon.nick = nick
        this.pc.push(pokemon)
        return true
    }

    /**
     * Adds given Pokeball to the user's inventory
     * @param {Pokeball} ball ball to add to user's inventory
     */

    addBall(ball) {
        if (Array.from(this.inventory.pokeballs.keys()).includes(ball)) {
            this.inventory.pokeballs.set(ball, this.inventory.pokeballs.get(ball) + 1)
        } else {
            this.inventory.pokeballs.set(ball, 1)
        }
    }

    /**
     * Adds given potion to the user's inventory
     * @param {Potion} potion potion to add to inventory
     */
    addPotion(potion) {
        if (Array.from(this.inventory.potions.keys()).includes(potion)) {
            this.inventory.potions.set(potion, this.inventory.potions.get(potion) + 1)
        } else {
            this.inventory.potions.set(potion, 1)
        }
    }

    /**
     * 
     * @param {string} givenUsername username given 
     * @param {*} givenPassword 
     * @returns 
     */
    verify(givenUsername, givenPassword) {
        if (givenUsername == this.username && givenPassword == this.password) {
            return true
        }
        return false
    }
}