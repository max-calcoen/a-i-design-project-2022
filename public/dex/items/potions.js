import { Potion } from "../../models/item/heal.js"

export let potions = new Map()
potions.set("Potion", new Potion("Potion", 5))
potions.set("Super Potion", new Potion("Super Potion", 10, "potion.png", 50))
potions.set("Hyper Potion", new Potion("Hyper Potion", 20, "hyperpotion.png", 30))
potions.set("Max Potion", new Potion("Max Potion", 30, "maxpotion.png", 20))
//no pokemon has an HP value that exceeds 30
