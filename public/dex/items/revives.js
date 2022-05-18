import { Revive } from "./../../models/item/heal.js"
/**
 * revive object map (NOT USED--FUTURE IMPLEMENTATION)
 */
export let revives = new Map()
revives.set("regular", new Revive("Revive", 1 / 2))
revives.set("Max", new Revive("Max Revive", 1))
//no pokemon has an HP value that exceeds 300
