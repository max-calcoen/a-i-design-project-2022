import { Pokeball } from "./../../models/item/pokeball.js"

export let pokeballs = new Map()
pokeballs.set("Pokeball", new Pokeball("Pokeball", 0, "pokeball.png", 60))
pokeballs.set("Great Ball", new Pokeball("Great Ball", 40, "greatball.png"), 40)
pokeballs.set("Ultra Ball", new Pokeball("Ultra Ball", 50, "ultraball.png"), 30)
pokeballs.set("Master Ball", new Pokeball("Master Ball", 100, "masterball.png"), 5)