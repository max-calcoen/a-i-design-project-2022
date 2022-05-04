import { Pokemon } from "../models/pokemon.js"
import { moves } from "./moves.js"
import { Stat } from "../models/stat.js"

/**
 * @param {string} name name of pokemon ("Charmander")
 * @param {array} types elemental types of pokemon (["fire"])
 * @param {array} moves array of moves ([moves.get("flamethrower"), moves.get("scratch"), moves.get("growl"))])
 * @param {string} frontImg image url of front of pokemon ("charmanderfront.png")
 * @param {string} backImg image url of back of pokemon ("charmandeback.png")
 * @param {Stat} baseStats starting / level 1 stats of the pokemon (new Stat(15, 20, 100))
 * @param {Stat} maxStats maximum possible / level 100 stats of the pokemon (new Stat(200, 250, 250))
 */

//Stat -- Health, Attack, Speed, Defense

export let pokedex = new Map()
pokedex.set("Bulbasaur", new Pokemon("Bulbasaur", ["grass"], [moves.get("Scratch"), moves.get("Tackle"), moves.get("Vine Whip"), moves.get("Razor Leaf")], "bulbasaurfront.png", "bulbasaurback.png", new Stat(15, 20, 20, 15), new Stat(200, 250, 250, 200)))
pokedex.set("Charmander", new Pokemon("Charmander", ["fire"], [moves.get("Scratch"), moves.get("Ember"), moves.get("Dragon Breath"), moves.get("Slash")], "charmanderfront.png", "charmanderback.png", new Stat(15, 20, 20, 15), new Stat(200, 250, 250, 200)))
pokedex.set("Turtwig", new Pokemon("Turtwig", ["grass"], [moves.get("Scratch"), moves.get("Vine Whip"), moves.get("Razor Leaf"), moves.get("Leech Seed")], "turtwigfront.png", "turtwigback.png", new Stat(20, 25, 20, 20), new Stat(250, 300, 250, 200)))
pokedex.set("Raichu", new Pokemon("Raichu", ["electric"], [moves.get("Thunderbolt"), moves.get("Scratch"), moves.get("Dragon Breath"), moves.get("Slash")], "raichufront.png", "raichuback.png", new Stat(20, 25, 20, 20), new Stat(250, 300, 250, 200)))
pokedex.set("Blastoise", new Pokemon("Blastoise", ["water"], [moves.get("Hydro Pump"), moves.get("Aqua Tail"), moves.get("Water Pulse"), moves.get("Empty")], "blastoisefront.png", "blastoiseback.png", new Stat(30, 25, 15, 25), new Stat(350, 300, 150, 300)))
pokedex.set("Charizard", new Pokemon("Charizard", ["fire"], [moves.get("Inferno"), moves.get("Flare Blitz"), moves.get("Flamethrower"), moves.get("Empty")], "charizardfront.png", "charizardback.png", new Stat(25, 30, 25, 20), new Stat(250, 325, 275, 200)))


