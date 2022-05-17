import { Pokeball } from "./../../models/item/pokeball.js"
/**
 * @param {string} type type of ball being used
 * @param {int} probabilityModifier probability modifier of catch
 */

export let pokeballs = new Map()
pokeballs.set("Pokeball", new Pokeball("Pokeball", 30))
pokeballs.set("GreatBall", new Pokeball("GreatBall", 50))
pokeballs.set("UltraBall", new Pokeball("UltraBall", 70))
pokeballs.set("MasterBall", new Pokeball("MasterBall", 0)) // reminder: check if 0, if 0, catch automatically