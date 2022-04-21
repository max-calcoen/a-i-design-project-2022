import { Pokeball } from "./item/pokeball.js"
export let pokeballs = new Map()
pokeballs.set("Pokeball", new Pokeball("Pokeball", 30))
pokeballs.set("Great Ball", new Pokeball("Great Ball", 50))
pokeballs.set("Ultra Ball", new Pokeball("Ultra Ball", 70))
pokeballs.set("Master Ball", new Pokeball("Master Ball", 0)) // reminder: check if 0, if 0, catch automatically