export class Stat {
    /**
     * Creates new Stat object to store basic stats of Pokemon
     * @param {int} health health
     * @param {int} attack attack
     * @param {int} speed speed
     */
    constructor(health, attack, speed) {
        this.health = health
        this.attack = attack;
        this.speed = speed
    }
}