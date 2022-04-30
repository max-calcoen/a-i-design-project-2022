import { pokedex } from "./dex/pokedex.js"
import { BattleLogic } from "./models/battlelogic.js"
let turtwig = pokedex.get("Turtwig")
let raichu = pokedex.get("Raichu")
let battle = new BattleLogic(turtwig, raichu)

window.onload = function () {
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
    for (let i = 0; i < turtwig.moves.length; i++) {
        BattleOptionsGrid.children[i].children[0].innerHTML = turtwig.moves[i].name
    }

    let battleOptionsDivs = document.getElementById("battleOptionsGrid").children
    for (let i = 0; i < battleOptionsDivs.length; i++) {
        document.getElementById("box" + (i + 1)).children[0].onclick = () => {
            let turnResult = battle.turn(turtwig.moves[i], raichu.moves[Math.floor(Math.random() * 4)])
            updateHealth()
            turtwig = turnResult.pokemon1
            raichu = turnResult.pokemon2
            console.log(turnResult)
            if (turnResult.winner != 0) {
                gameOver(turnResult.winner == 1 ? turtwig.name : raichu.name)
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

function showBackButton() {
    document.getElementById("back").classList.remove("hidden")
}

function hideBackButton() {
    document.getElementById("back").classList.add("hidden")
}

<<<<<<< HEAD
=======
document.getElementById("back").addEventListener("click", function () {
    handleBackButtonClick()
})

>>>>>>> 31b2c3ed83b245a8fd619a94b2d25225524884d1
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
    document.getElementById("maxNumPlayerHealth").innerText = turtwig.currentStats.maxHealth
    document.getElementById("currentNumPlayerHealth").innerText = turtwig.currentStats.health
    document.documentElement.style.setProperty("--player-health", (100 * turtwig.currentStats.health / turtwig.currentStats.maxHealth) + "%")
    document.documentElement.style.setProperty("--enemy-health", (100 * raichu.currentStats.health / raichu.currentStats.maxHealth) + "%")
}