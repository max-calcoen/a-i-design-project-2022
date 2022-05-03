import { pokedex } from "./dex/pokedex.js"
import { BattleLogic } from "./models/battlelogic.js"
// hi ben i am bugfixing pls fix status effects
let userPokemon = user.pc[0]
// userPokemon = pokedex.get("turtwig")
let raichu = pokedex.get("Raichu")

let battle = new BattleLogic(userPokemon, raichu)

window.onload = () => {
    showOptions()
    updateHealth()
    document.getElementById("back").addEventListener("click", function () {
        handleBackButtonClick()
    })
}

/**
 * Removes event listeners on all buttons
 */
function resetButtonListeners() {
    let buttons = document.getElementsByTagName("button")
    for (let button of buttons) {
        let newButton = button.cloneNode(true)
        button.parentNode.replaceChild(newButton, button)
    }
}

/**
 * Shows game options (Fight, Bag, Pokemon, Run)
 */
function showOptions() {
    let buttons = document.getElementsByTagName("button")
    buttons[0].innerText = "Fight"
    document.getElementById("box1").children[0].addEventListener("click", handleFightButtonClick)
    document.getElementById("box1").children[0].addEventListener("click", handleFightButtonClick)
    buttons[1].innerText = "Bag"
    document.getElementById("box2").children[0].addEventListener("click", handleBagButtonClick)
    buttons[2].innerText = "Pokémon"
    document.getElementById("box3").children[0].addEventListener("click", handlePokemonButtonClick)
    buttons[3].innerText = "Run"
    document.getElementById("box4").children[0].addEventListener("click", handleRunButtonClick)
    hideBackButton()
}

function handleFightButtonClick() {
    resetButtonListeners()
    let BattleOptionsGrid = document.getElementById("battleOptionsGrid")
    for (let i = 0; i < userPokemon.moves.length; i++) {
        BattleOptionsGrid.children[i].children[0].innerHTML = userPokemon.moves[i].name
    }



    let movesDivs = document.getElementById("battleOptionsGrid").children
    for (let i = 0; i < movesDivs.length - 1; i++) {
        document.getElementById("box" + (i + 1)).children[0].onclick = () => {
            let turnResult = battle.turn(userPokemon.moves[i], raichu.moves[Math.floor(Math.random() * 4)])
            updateHealth()
            userPokemon = turnResult.pokemon1
            raichu = turnResult.pokemon2
            if (turnResult.winner != 0) {
                gameOver(turnResult.winner == 1 ? userPokemon.name : raichu.name)
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
    let buttons = document.getElementsByTagName("button")
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add("hidden")
    }
    showBackButton()

}

// TODO
function handlePokemonButtonClick() {
    showBackButton()
}

// TODO

function handleRunButtonClick() {
    showBackButton()
}

/**
 * Shows back button
 */
function showBackButton() {
    document.getElementById("back").classList.remove("hidden")
}

/**
 * Hides back button
 */
function hideBackButton() {
    document.getElementById("back").classList.add("hidden")
}

function handleBackButtonClick() {
    resetButtonListeners()
    showOptions()
    let buttons = document.getElementsByTagName("button")
    for (let button of buttons) {
        button.classList.remove("hidden")
    }
    hideBackButton()
}

function gameOver(winner, text = winner + " Won!") {
    showOptions()
    resetButtonListeners()
    document.getElementById("storyText").innerText = text
}

function updateHealth() {
    document.getElementById("maxNumPlayerHealth").innerText = userPokemon.currentStats.maxHealth
    document.getElementById("currentNumPlayerHealth").innerText = userPokemon.currentStats.health
    document.documentElement.style.setProperty("--player-health", (100 * userPokemon.currentStats.health / userPokemon.currentStats.maxHealth) + "%")
    document.documentElement.style.setProperty("--enemy-health", (100 * raichu.currentStats.health / raichu.currentStats.maxHealth) + "%")
}
