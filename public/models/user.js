import { pokedex } from "../dex/pokedex"
export class User {
    inventory = new Map()
    PC = new Map()
    constructor(username, pwd) {
        this.username = username
        this.pwd = pwd
        // initializes pokeball inventory
        this.inventory.set('Balls', new Map())
        this.inventory.get('Balls').set('Regular', {quantity: 15, catchchance: 30})
        this.inventory.get('Balls').set('Great', {quantity: 5, catchchance: 50})
        this.inventory.get('Balls').set('Ultra', {quantity: 3, catchchance: 70})
        this.inventory.get('Balls').set('Master', {quantity: 1, catchchance: 100})
 
        //initializes revive inventory
        this.inventory.set('Revives', new Map())
        this.inventory.get('Revives').set('Regular', 10)
        this.inventory.get('Revives').set('Max', 3)

        //initializes potion inventory
        this.inventory.set('Potions', new Map())
        this.inventory.get('Potions').set('Regular', 15)
        this.inventory.get('Potions').set('Super', 5)
        this.inventory.get('Potions').set('Hyper', 3)
        this.inventory.get('Potions').set('Max', 1)
        //-------------------------------<PC INITIALIZATION>-------------------------------//
    }
    addBall(type, quantity) {
        this.inventory.get('Balls').get(type).quantity += quantity
        return true
    }
    addRevive(type, quantity) {
        this.inventory.get('Revives').get(type) += quantity
        return true
    }
    addPot(type, quantity) {
        this.inventory.get('Potions').get(type) += quantity
        return true
    }
    useBall(type) {
        this.inventory.get('Balls').get(type).quantity--
        return true
    }
    useRevive(type) {
        this.inventory.get('Revives').get(type)--
        return true
    }
    usePot(type) {
        this.inventory.get('Potions').get(type)--
        return true
    }
    addPokemonToPC(pokemon) {
        if(pokemon.types.length > 1){
            this.PC.set(pokemon.types[0] + " " + pokemon.types[1], new Map())
        }
        else{
            this.PC.set(pokemon.types[0], [])
            this.PC.get(pokemon.types[0]).push(pokemon)
        }    
    }
    //this function used specifically for accessing contents in inventory with 
    get myPokemon (){
        return this.PC
    }
    get myDex(){
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

