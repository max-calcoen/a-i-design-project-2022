// TODO: INSTEAD OF USERS MAP, USERS IS A CLASS THAT HAS ACCESSORS THAT FETCH FROM DB
import { pokedex } from "./../dex/pokedex.js"
export class User {
    constructor(username, password) {
        this.username = username
        this.password = password
        this.pc = [pokedex.get('Bulbasaur'), pokedex.get('Charmander'), pokedex.get('Pikachu'), pokedex.get('Squirtle')]
        this.inventory = {
            pokeballs: new Map(),
            potions: new Map(),
            revives: new Map()
        }
    }
}