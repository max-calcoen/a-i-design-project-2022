import { User } from "../user.js";
import { Item } from "./item.js"

export class Pokeball extends Item {
    probabilityModifier = 30;
    /**
     * @param {string} ballType type of ball being used
     */
    constructor(ballType) {
        let validType = ["pokeball", "greatball", "ultraball", "masterball"]
        if(validType.includes(ballType)) this.ballType = ballType;
    }

    /**
     * @param {string} ballType type of ball being used
     */
    catch(ballType){ //Need to check if we have pokeballs before the function is called.
        if(ballType == "pokeball"){
            this.probabilityModifier = 30;
        }
        if(ballType == "greatball"){
            this.probabilityModifier = 50;
        }
        if(ballType == "ultraball"){
            this.probabilityModifier = 70;
        }
        if(ballType == "masterball"){
            this.probabilityModifier = 100;
        } else { //defaults to pokeball if none
            this.probabilityModifier = 30;
        }
    }



}