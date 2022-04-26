import { pokedex } from "../dex/pokedex"
export class User {
    inventory = new Map()
    PC = new Map()
    constructor(username, pwd) {
        this.username = username
        this.pwd = pwd
        // initializes pokeball inventory
        this.inventory.set('Balls', new Map())
        this.inventory.get('Balls').set('Regular', 15)
        this.inventory.get('Balls').set('Great', 5)
        this.inventory.get('Balls').set('Ultra', 3)
        this.inventory.get('Balls').set('Master', 1)

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
        this.PC.set()
    }
    addBall(type, quantity) {
        this.inventory.get('Balls').get(type) += quantity
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
        this.inventory.get('Balls').get(type)--
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


    addPokemon(pokemon) {

    }
    //this function used specifically for accessing contents in inventory with 
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

