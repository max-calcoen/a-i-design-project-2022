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
 * @param {int} rarity rarity for pokemon to spawn, lower = more rare
 */

export let pokedex = new Map()

/**
 * Construct Pokemon object from JSON
 * @param {object} parsedPokemonJSON parsed JSON object containing all Pokemon attributes (no methods)
 * @returns {Pokemon} Pokemon object containing attributes from the JSON and methods from Pokemon class
 */
pokedex.fromJSON = (parsedPokemonJSON) => {
    let newPokemon = new Pokemon(parsedPokemonJSON.name, parsedPokemonJSON.types, parsedPokemonJSON.moves, parsedPokemonJSON.frontImg, parsedPokemonJSON.backImg, parsedPokemonJSON.currentStats, parsedPokemonJSON.maxStats, parsedPokemonJSON.rarity)
    newPokemon.moves = parsedPokemonJSON.moves
    newPokemon.totalExp = parsedPokemonJSON.totalExp
    newPokemon.tempExp = parsedPokemonJSON.tempExp
    newPokemon.nick = parsedPokemonJSON.nick
    newPokemon.level = parsedPokemonJSON.level
    newPokemon.statusEffects = parsedPokemonJSON.statusEffects
    newPokemon.canMove = parsedPokemonJSON.canMove
    newPokemon.levelUp(parsedPokemonJSON.level)
    return newPokemon
}

/**
 * Gets a Pokemon from the Pokedex with given name
 * @param {name} name name of pokemon
 * @returns Pokemon cloned from Pokedex
 */
pokedex.getNewPokemon = function (name) {
    return pokedex.fromJSON(JSON.parse(JSON.stringify(pokedex.get(name))))
}

pokedex.set("Zapdos", new Pokemon("Zapdos", ["electric", "flying"], [moves.get("Zap Cannon"), moves.get("Thunder"), moves.get("Spark"), null], "zapdosfront.png", "zapdosback.png", new Stat(30, 45, 30, 35), new Stat(300, 400, 400, 250), 1))
pokedex.set("Bulbasaur", new Pokemon("Bulbasaur", ["grass"], [moves.get("Scratch"), moves.get("Tackle"), moves.get("Vine Whip"), moves.get("Razor Leaf")], "bulbasaurfront.png", "bulbasaurback.png", new Stat(15, 20, 20, 15), new Stat(200, 250, 250, 200), 70))
pokedex.set("Charmander", new Pokemon("Charmander", ["fire"], [moves.get("Scratch"), moves.get("Ember"), moves.get("Dragon Breath"), moves.get("Slash")], "charmanderfront.png", "charmanderback.png", new Stat(15, 20, 20, 15), new Stat(200, 250, 250, 200), 70))
pokedex.set("Turtwig", new Pokemon("Turtwig", ["grass"], [moves.get("Scratch"), moves.get("Vine Whip"), moves.get("Razor Leaf"), moves.get("Leech Seed")], "turtwigfront.png", "turtwigback.png", new Stat(20, 25, 20, 20), new Stat(250, 300, 250, 200), 70))
pokedex.set("Raichu", new Pokemon("Raichu", ["electric"], [moves.get("Thunderbolt"), moves.get("Scratch"), moves.get("Dragon Breath"), moves.get("Slash")], "raichufront.png", "raichuback.png", new Stat(20, 25, 20, 20), new Stat(250, 300, 250, 200), 15))
pokedex.set("Blastoise", new Pokemon("Blastoise", ["water"], [moves.get("Hydro Pump"), moves.get("Aqua Tail"), moves.get("Water Pulse"), null], "blastoisefront.png", "blastoiseback.png", new Stat(30, 25, 15, 25), new Stat(350, 300, 150, 350), 5))
pokedex.set("Charizard", new Pokemon("Charizard", ["fire", "flying"], [moves.get("Inferno"), moves.get("Flare Blitz"), moves.get("Flamethrower"), null], "charizardfront.png", "charizardback.png", new Stat(25, 30, 25, 20), new Stat(250, 325, 275, 200), 5))
pokedex.set("Charmeleon", new Pokemon("Charmeleon", ["fire"], [moves.get("Ember"), moves.get("Inferno"), moves.get("Flamethrower"), null], "charmeleonfront.png", "charmeleonback.png", new Stat(20, 25, 25, 20), new Stat(175, 225, 225, 200), 25))
pokedex.set("Ivysaur", new Pokemon("Ivysaur", ["grass"], [moves.get("Scratch"), moves.get("Leech Seed"), moves.get("Razor Leaf"), null], "ivysaurfront.png", "ivysaurback.png", new Stat(20, 25, 15, 30), new Stat(200, 250, 150, 300), 25))
pokedex.set("Pikachu", new Pokemon("Pikachu", ["electric"], [moves.get("Thunderbolt"), moves.get("Spark"), moves.get("Thundershock"), null], "pikachufront.png", "pikachuback.png", new Stat(20, 20, 20, 20), new Stat(200, 200, 300, 150), 70))
pokedex.set("Squirtle", new Pokemon("Squirtle", ["water"], [moves.get("Water Pulse"), moves.get("Water Gun"), moves.get("Hydro Pump"), null], "squirtlefront.png", "squirtleback.png", new Stat(25, 20, 15, 25), new Stat(200, 150, 150, 300), 70))
pokedex.set("Venusaur", new Pokemon("Venusaur", ["grass", "poison"], [moves.get("Solar Beam"), moves.get("Seed Bomb"), moves.get("Leech Seed"), moves.get("Razor Leaf")], "venusaurfront.png", "venusaurback.png", new Stat(25, 25, 25, 30), new Stat(300, 300, 200, 300), 5))
pokedex.set("Wartortle", new Pokemon("Wartortle", ["water"], [moves.get("Water Gun"), moves.get("Water Pulse"), moves.get("Hydro Pump"), null], "wartortlefront.png", "wartortleback.png", new Stat(25, 20, 20, 25), new Stat(225, 200, 150, 325), 25))
pokedex.set("Nidoran", new Pokemon("Nidoran", ["poison"], [moves.get("Scratch"), moves.get("Tackle"), moves.get("Poison Fang"), null], "nidoranfront.png", "nidoranback.png", new Stat(15, 15, 20, 15), new Stat(210, 250, 250, 175), 70))
pokedex.set("Nidorino", new Pokemon("Nidorino", ["poison", "ground"], [moves.get("Tackle"), moves.get("Poison Fang"), moves.get("Poison Jab"), null], "nidorinofront.png", "nidorinoback.png", new Stat(25, 25, 30, 25), new Stat(280, 300, 300, 230), 40))
pokedex.set("Nidoking", new Pokemon("Nidoking", ["poison", "ground"], [moves.get("Poison Fang"), moves.get("Poison Jab"), moves.get("Earthquake"), moves.get("Fissure")], "nidokingfront.png", "nidokingback.png", new Stat(35, 45, 45, 35), new Stat(310, 310, 300, 250), 25))
pokedex.set("Vulpix", new Pokemon("Vulpix", ["fire"],[moves.get("Tackle"), moves.get("Scratch"), moves.get("Ember"), null], "vulpixfront.png", "vulpixback.png", new Stat(15, 15, 20, 10), new Stat(200, 240, 230, 175), 40))
pokedex.set("Ninetales", new Pokemon("Ninetales", ["fire"], [moves.get("Ember"), moves.get("Flare Blitz"), moves.get("Tackle"), moves.get("Flamethrower")], "ninetailsfront.png", "ninetailsback.png", new Stat(30, 30, 35, 25), new Stat(290, 310, 330, 250), 20))
pokedex.set("Jigglypuff", new Pokemon("Jigglypuff", ["normal", "fairy"], [moves.get("Tackle"), moves.get("Egg Bomb"), moves.get("Dazzling Gleam"), null], "jigglypufffront.png", "jigglypuffback.png", new Stat(25, 20, 25, 30), new Stat(210, 250, 250, 210), 60))
pokedex.set("Wigglytuff", new Pokemon("WigglyTuff", ["fairy"], [moves.get("Dazzling Gleam"), moves.get("Moonblast"), moves.get("Tackle"), moves.get("Body Slam")], "wigglytufffront.png", "wigglytuffback.png", new Stat(35, 30, 30, 40), new Stat(280, 310, 310, 250), 15))