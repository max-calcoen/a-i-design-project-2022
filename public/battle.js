import { pokedex } from "./dex/pokedex.js"
import { BattleLogic } from "./models/battlelogic.js"
let turtwig = pokedex.get("Turtwig")
let raichu = pokedex.get("Raichu")
let battle = new BattleLogic(turtwig, raichu)









// moves
document.getElementById("box1").children[0].onclick = () => {
    let battleOptionsDivs = document.getElementById("battleoptionsgrid").children
    for (let i = 0; i < battleOptionsDivs.length; i++) {
        document.getElementById("box1").children[0].onclick = () => {
            let battleResult = battle.turn(turtwig.moves[0])
            if (battleResult) {
                console.log("winner: %s" % battleResult.winner)
                turtwig = battleResult.pokemon1
                raichu = battleResult.pokemon2
            } else {
                resetButtonListeners()
                showOptions()
            }
        }
    }
}

// remove their click listeners
function resetButtonListeners() {
    let buttons = document.getElementsByTagName("button")
    for (let button of buttons) {
        button.onclick = ""
    }
}

function showOptions() {
    let buttons = document.getElementsByTagName("button")
    buttons[0].innerText = "Fight"
    document.getElementById("box1").children[0].addEventListener("click", handleFight)
    buttons[1].innerText = "Bag"
    document.getElementById("box2").children[0].addEventListener("click", handleBag)
    buttons[2].innerText = "Pokemon"
    document.getElementById("box3").children[0].addEventListener("click", handlePokemon)
    buttons[3].innerText = "Run"
    document.getElementById("box4").children[0].addEventListener("click", handleRun)
}

function handleFight() {
    console.log(turtwig)
    console.log(raichu)
    let battleoptionsgrid = document.getElementById("battleoptionsgrid")
    for (let i = 0; i < turtwig.moves.length; i++) {
        battleoptionsgrid.children[i].children[0].innerHTML = turtwig.moves[i].name
    }
}