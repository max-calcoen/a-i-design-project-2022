import { Pokemon } from "../models/pokemon.js"
import { moves } from "./moves.js"
import { Stat } from "../models/stat.js"

/**
 * @param {string} name name of pokemon ("Charmander")
 * @param {array} element elemental types of pokemon (["fire"])
 * @param {array} moves array of moves ([moves.get("flamethrower"), moves.get("scratch"), moves.get("growl"))])
 * @param {string} frontImg image url of front of pokemon ("charmanderfront.png")
 * @param {string} backImg image url of back of pokemon ("charmandeback.png")
 * @param {Stat} baseStats starting / level 1 stats of the pokemon (new Stat(15, 20, 100))
 * @param {Stat} maxStats maximum possible / level 100 stats of the pokemon (new Stat(200, 250, 250))
 */

export let pokedex = new Map()
pokedex.set("Bublasaur", new Pokemon("Bulbasaur", ["grass"], [moves.get("Scratch"), moves.get("Tackle"), moves.get("Vine Whip"), moves.get("Razor Leaf")], "bulbasaurfront.png", "bulbasaurback.png", new Stat(15, 20, 20), new Stat(200, 250, 250)))
pokedex.set("Charmander", new Pokemon("Charmander", ["fire"], [moves.get("Scratch"), moves.get("Ember"), moves.get("Dragon Breath"), moves.get("Slash")], "charmanderfront.png", "charmanderback.png", new Stat(15, 20, 20), new Stat(200, 250, 250)))
pokedex.set("Turtwig", new Pokemon("Turtwig", ["grass"], [moves.get("Scratch"), moves.get("Vine Whip"), moves.get("Razor Leaf"), moves.get("Leech Seed")], "turtwigfront.png", "turtwigback.png", new Stat(20, 25, 20), new Stat(250, 300, 2050)))
pokedex.set("Raichu", new Pokemon("Raichu", ["electric"], [moves.get("Thunderbolt"), moves.get("Scratch"), moves.get("Thunderbolt"), moves.get("Scratch")], "turtwigfront.png", "turtwigback.png", new Stat(20, 25, 20), new Stat(250, 300, 2050)))
