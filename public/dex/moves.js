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
moves.set("Scratch", new Move("Scratch", "normal", false, 40, 40, 100))
moves.set("Tackle", new Move("Tackle", "normal", false, 30, 40, 100))
moves.set("Thunderbolt", new Move("Thunderbolt", "electric", true, 70, 10, 0))
moves.set("Vine Whip", new Move("Vine Whip", "grass", true, 40, 30, 100))
moves.set("Razor Leaf", new Move("Razor Leaf", "grass", true, 50, 20, 100))
moves.set("Leech Seed", new Move("Leech Seed", "grass", true, 30, 15, 100))
moves.set("Dragon Breath", new Move("Dragon Breath", "dragon", true, 80, 15, 100))
moves.set("Slash", new Move("Slash", "normal", false, 70, 20, 100))
moves.set("Ember", new Move("Ember", "fire", false, 40, 30, 100))
moves.set("Hydro Pump", new Move("Hydro Pump", "water", true, 110, 5, 80))
moves.set("Water Pulse", new Move("Water Pulse", "water", false, 60, 20, 100))
moves.set("Aqua Tail", new Move("Aqua Tail", "water", false, 90, 10, 90))
moves.set("Flare Blitz", new Move("Flare Blitz", "fire", true, 120, 15, 100))
moves.set("Flamethrower", new Move("Flamethrower", "fire", false, 90, 15, 100))
moves.set("Inferno", new Move("Inferno", "fire", false, 100, 5, 50))
moves.set("Ember", new Move("Ember", "fire", true, 40, 25, 100))
moves.set("Thundershock", new Move("Thundershock", "electric", true, 40, 30, 100))
moves.set("Spark", new Move("Spark", "electric", false, 65, 20, 100))
moves.set("Water Gun", new Move("Water Gun", "water", false, 40, 25, 100))
moves.set("Solar Beam", new Move("Solar Beam", "grass", true, 120, 10, 100))
moves.set("Seed Bomb", new Move("Seed Bomb", "grass", false, 80, 15, 100))
moves.set("Zap Cannon", new Move("Zap Cannon", "electric", true, 200, 5, 85))
moves.set("Thunder", new Move("Thunder", "electric", false, 110, 40, 100))