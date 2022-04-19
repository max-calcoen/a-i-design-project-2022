import { Move } from "../models/move.js"

/**
     * Contructs Move object
     * @param {string} name name of move (Flamethrower)
     * @param {string} type type of move (fire)
     * @param {boolean} isSpecial special attack not regular attack
     * @param {int} power power of move
     * @param {int} pp power points- number of times a pokemon can use an attack
     * @param {int} accuracy chance out of 100 to hit target
     * @param {Array} inflict array constituting of inflict type, chance to hit
     */
export let moves = new Map()
moves.set("Scratch", new Move("Scratch", "normal", ""))