import { BattleLogic } from "./models/battlelogic.js"
import { Pokemon } from "./models/pokemon.js"

let userPokemon = Pokemon.fromJSON(user.pc[0])
let enemyPokemon = Pokemon.fromJSON(enemy)
let battle = new BattleLogic(userPokemon, enemyPokemon)

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
    let buttons = document.getElementById("battleOptionsGrid").children
    for (let button of buttons) {
        let newButton = button.cloneNode(true)
        button.parentNode.replaceChild(newButton, button)
    }
}

/**
 * Shows game options (Fight, Bag, Pokemon, Run)
 */
function showOptions() {
    let buttons = document.getElementById("battleOptionsGrid")
    let button = buttons.firstElementChild
    button.innerText = "Fight"
    button.addEventListener("click", handleFightButtonClick)
    button = button.nextElementSibling
    button.innerText = "Bag"
    button.addEventListener("click", handleBagButtonClick)
    button = button.nextElementSibling
    button.innerText = "Pokemon"
    button.addEventListener("click", handlePokemonButtonClick)
    button = button.nextElementSibling
    button.innerText = "Run"
    button.addEventListener("click", handleRunButtonClick)
    hideBackButton()
}
function handleFightButtonClick() {
    resetButtonListeners()
    let BattleOptionsGrid = document.getElementById("battleOptionsGrid")
    for (let i = 0; i < userPokemon.moves.length; i++) {
        if (userPokemon.moves[i] != null) {
            BattleOptionsGrid.children[i].innerHTML = `${userPokemon.moves[i].name} <br />(${userPokemon.moves[i].power}, ${userPokemon.moves[i].type})`
        } else {
            BattleOptionsGrid.children[i].innerHTML = ""
        }
    }

    let movesDivs = document.getElementById("battleOptionsGrid").children
    for (let i = 0; i < movesDivs.length - 1; i++) {
        if (userPokemon.moves[i] != null) {
            movesDivs[i].onclick = () => {
                let enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
                while (enemyMove == null) {
                    enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
                }
                let turnResult = battle.turn(userPokemon.moves[i], enemyMove)

                updateHealth()
                userPokemon = turnResult.pokemon1
                enemyPokemon = turnResult.pokemon2
                if (turnResult.winner != 0) {
                    gameOver(turnResult.winner == 1 ? userPokemon.name : enemyPokemon.name)
                } else {
                    resetButtonListeners()
                    showOptions()
                }
            }
        }
    }
    showBackButton()
}

function handleBagButtonClick() {
    alert("bag button clicked")
    resetButtonListeners()
    let buttons = document.getElementById("battleOptionsGrid").children
    let labels = [{
        name: "Heal",
        types: ["Potion", "Super Potion", "Hyper Potion", "M    ax Potion"],
        image: null,
        action: "Use"
    },
    {
        name: "Catch",
        types: ["Pokeball", "Great Ball", "Ultra Ball", "Master Ball"],
        image: null
    },
    {
        name: "Revive",
        types: ["Revive", "Max Revive"],
        image: null
    }]

    for (let i = 0; i < labels.length; i++) {
        buttons[i].addEventListener("click", handleBagSubmenus(labels[i].name, labels[i].types))
        buttons[i].innerHTML = labels[i].name
    }
    buttons[3].innerText = ''
    showBackButton()
}

function handleBagSubmenus(type, subtypes) {
    resetButtonListeners()
    let buttons = document.getElementById("battleOptionsGrid").children
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = ""
    }
    resetButtonListeners()
    for (let i = 0; i < subtypes.length; i++) {
        buttons[i].innerText = subtypes[i]
        buttons[i].addEventListener('click', handleChooseItem(type, subtypes[i]))
    }
}

function handleChooseItem(item, type) {
    resetButtonListeners()
    let buttons = document.getElementById("battleOptionsGrid").children

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = ''
    }
    buttons[0].innerText = 'Use'
    buttons[0].addEventListener('Click', handleUseItem(item, type))
}

function handleUseItem(item, type) {

}
// TODO
function handlePokemonButtonClick() {
    showBackButton()
}

// TODO

function handleRunButtonClick() {
    resetButtonListeners()
    window.location.href = "../openworld.html"
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
    document.documentElement.style.setProperty("--enemy-health", (100 * enemyPokemon.currentStats.health / enemyPokemon.currentStats.maxHealth) + "%")
}
