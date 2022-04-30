export class User {
    /**
     * @param username user's name
     * @param pwd password
     */
    constructor(username, pwd) {
        this.username = username
        this.pwd = pwd
        this.pc = new Map()
        this.inventory = new Map([["Pokeballs", new Map()], ["Potions", new Map()], ["Revives", new Map()]])
    }


    addPokemonToPC(pokemon) {
        if (pokemon.types.length > 1) {
            this.PC.set(pokemon.types[0] + " " + pokemon.types[1], new Map())
        }
        else {
            this.PC.set(pokemon.types[0], [])
            this.PC.get(pokemon.types[0]).push(pokemon)
        }
    }
    //this function used specifically for accessing contents in inventory with 
    get myPokemon() {
        return this.PC
    }
    get myDex() {
        let myDex = []
        return myDex
    }
    get inventory() {
        let arrOfStuff = []
        arrOfStuff.push(this.inventory.get('Balls').get('Regular'))
        arrOfStuff.push(this.inventory.get('Balls').get('Great'))
        arrOfStuff.push(this.inventory.get('Balls').get('Ultra'))
        arrOfStuff.push(this.inventory.get('Balls').get('Master'))
        arrOfStuff.push(this.inventory.get('Revives').get('Regular'))
        arrOfStuff.push(this.inventory.get('Revives').get('Max'))
        arrOfStuff.push(this.inventory.get('Potions').get('Regular'))
        arrOfStuff.push(this.inventory.get('Potions').get('Super'))
        arrOfStuff.push(this.inventory.get('Potions').get('Hyper'))
        arrOfStuff.push(this.inventory.get('Potions').get('Max'))
        /*
        returns the inventory of the user:
        the order of nums is as follows:
        -Pokeballs
        -Great balls
        -Ultra balls
        -Master balls
        -Regular revives
        -Max revives
        -potions
        -super potions
        -hyper potions
        -max potions
        */
        return arrOfStuff
    }
}

