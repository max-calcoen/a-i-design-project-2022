import { Potion } from "./models/item/potion.js"

export let potions = new Map()
potions.set("Potion", new Potion("Potion", 20))
potions.set("Super Potion", new Potion("Super Potion", 50))
potions.set("Hyper Potion", new Potion("Hyper Potion", 100))
potions.set("Max Potion", new Potion("Max Potion", 300))
//no pokemon has an HP value that exceeds 300
