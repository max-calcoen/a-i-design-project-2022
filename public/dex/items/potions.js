import { Potion } from "./../../models/item/heal.js"

export let potions = new Map()
potions.set("Potion", new Potion("Potion", 5))
potions.set("SuperPotion", new Potion("SuperPotion", 10))
potions.set("HyperPotion", new Potion("HyperPotion", 20))
potions.set("MaxPotion", new Potion("MaxPotion", 30))
//no pokemon has an HP value that exceeds 30
