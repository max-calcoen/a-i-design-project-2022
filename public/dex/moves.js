import { Move } from "../models/move.js"

/**
     * Contructs Move object
     * @param {string} name name of move (Flamethrower)
     * @param {string} type type of move (fire)
     * @param {boolean} isSpecial special attack not regular attack
     * @param {int} power power of move
     * @param {int} pp power points- number of times a pokemon can use an attack
     * @param {int} accuracy chance out of 100 to hit target
     */
export let moves = new Map()
moves.set("Scratch", new Move("Scratch", "normal", false, 30, 40, 100))
moves.set("Thunderbolt", new Move("Thunderbolt", "electric", true, 70, 10, 100))
moves.set("Vine Whip", new Move("Vine Whip", "grass", true, 40, 30, 100))
moves.set("Razor Leaf", new Move("Razor Leaf", "grass", true, 50, 20, 100))
moves.set("Leech Seed", new Move("Leech Seed", "grass", true, 60, 15, 100))
moves.set("Dragon Breath", new Move("Dragon Breath", "dragon", true, 40, 15, 100))
moves.set("Empty", new Move("Empty", "normal", false, 0, 0, 0))