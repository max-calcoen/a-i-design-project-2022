export class Pokeball extends Item {
    chance = 0;

    // pokeball, great ball, ultra ball, master ball
    /**
     * @param {string} type type of ball being used
     * @param {int} probability probability modifier of catch
     */
    constructor(type, probability) {
        this.type = type;
        this.probability = probability

    }
    /**
     * @param {Pokemon} pokemon pokemon trying to catch
     * @return true on catch, false otherwise
     */
    catch(pokemon) {
        return pokemon.catch(this.probability)
    }

}