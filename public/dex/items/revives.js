import { Revive } from "../../models/item/heal"

export let revives = new Map()
potions.set("regular", new Revive("Regular", 1 / 2))
potions.set("Max", new Revive("Max", 1))
//no pokemon has an HP value that exceeds 300
