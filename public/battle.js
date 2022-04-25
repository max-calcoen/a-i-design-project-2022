import { pokedex } from "./dex/pokedex.js"
import { BattleLogic } from "./models/battlelogic.js"
let turtwig = pokedex.get("Turtwig")
let raichu = pokedex.get("Raichu")
let battle = new BattleLogic(turtwig, raichu)

window.onload = showOptions

/**
 * Removes event listeners on all buttons
 */
function resetButtonListeners() {
    let buttons = document.getElementsByTagName("button")
    for (let button of buttons) {
        let newbutton = button.cloneNode(true)
        button.parentNode.replaceChild(newbutton, button)
    }
}

/**
 * Shows game options (Fight, Bag, Pokemon, Run)
 */
function showOptions() {
    let buttons = document.getElementsByTagName("button")
    buttons[0].innerText = "Fight"
    document.getElementById("box1").children[0].addEventListener("click", handleFightButtonClick)
    buttons[1].innerText = "Bag"
    document.getElementById("box2").children[0].addEventListener("click", handleBagButtonClick)
    buttons[2].innerText = "Pokemon"
    document.getElementById("box3").children[0].addEventListener("click", handlePokemonButtonClick)
    buttons[3].innerText = "Run"
    document.getElementById("box4").children[0].addEventListener("click", handleRunButtonClick)
}

function handleFightButtonClick() {
    resetButtonListeners()
    let battleoptionsgrid = document.getElementById("battleoptionsgrid")
    for (let i = 0; i < turtwig.moves.length; i++) {
        battleoptionsgrid.children[i].children[0].innerHTML = turtwig.moves[i].name
    }

    let battleOptionsDivs = document.getElementById("battleoptionsgrid").children
    for (let i = 0; i < battleOptionsDivs.length; i++) {
        document.getElementById("box" + (i + 1)).children[0].onclick = () => {
            let battleResult = battle.turn(turtwig.moves[i], raichu.moves[Math.floor(Math.random() * 4)])
            if (battleResult) {
                console.log("winner: " + battleResult.winner)
                turtwig = battleResult.pokemon1
                raichu = battleResult.pokemon2
                // clear screen
            } else {
                resetButtonListeners()
                showOptions()

            }

        }
    }
    showBackButton()
}

// TODO
function handleBagButtonClick() {
    console.log("bag button clicked")
    showBackButton()
}

// TODO
function handlePokemonButtonClick() {
    console.log("pokemon button clicked")
    showBackButton()
}

// TODO
function handleRunButtonClick() {
    console.log("run button clicked")
    showBackButton()
}

// MAX TODO
function showBackButton() {
    document.getElementById("back").classList.remove("hidden")
}

function hideBackButton() {
    document.getElementById("back").classList.add("hidden")
}