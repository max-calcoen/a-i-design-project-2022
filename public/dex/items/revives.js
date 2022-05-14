import { Revive } from "./../../models/item/heal.js"

export let revives = new Map()
revives.set("regular", new Revive("Regular", 1 / 2))
revives.set("Max", new Revive("Max", 1))
//no pokemon has an HP value that exceeds 300
