export class Stat {
    /**
     * Creates new Stat object to store basic stats of Pokemon
     * @param {int} health health
     * @param {int} attack attack
     * @param {int} speed speed
     * @param {int} def defense
     */
    constructor(health, attack, speed, defense) {
        this.health = health
        this.attack = attack
        this.speed = speed
        this.defense = defense
        this.maxhealth = health
    }
}