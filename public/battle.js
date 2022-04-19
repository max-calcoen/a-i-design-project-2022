import { pokedex } from "./dex/pokedex.js"
import { BattleLogic } from "./models/battlelogic.js"
let turtwig = pokedex.get("Turtwig")
let raichu = pokedex.get("Raichu")
let battle = new BattleLogic(turtwig, raichu)

document.getElementById("box1").children[0].addEventListener("click", () => {
    console.log(turtwig)
    console.log(raichu)
    let battleoptionsgrid = document.getElementById("battleoptionsgrid")
    for (let i = 0; i < turtwig.moves.length; i++) {
        battleoptionsgrid.children[i].children[0].innerHTML = turtwig.moves[i].name
    }
    document.getElementById("box1").children[0].onclick = battle.turn(turtwig.moves[0])
    document.getElementById("box2").children[0].onclick = battle.turn(turtwig.moves[1])
    document.getElementById("box3").children[0].onclick = battle.turn(turtwig.moves[2])
    document.getElementById("box4").children[0].onclick = battle.turn(turtwig.moves[3])
})