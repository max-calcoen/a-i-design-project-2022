import { BattleLogic } from "./models/battlelogic.js"
import { pokedex } from "./dex/pokedex.js"
let userPokemon = pokedex.fromJSON(user.pc[0])
let enemyPokemon = pokedex.fromJSON(enemy)
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
    let buttons = Array.from(document.getElementsByTagName("button"))
    buttons.pop()
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
    let buttonsLabels = ["Fight", "Bag", "Pokemon", "Run"]
    button.innerText = buttonsLabels[0]
    button.addEventListener("click", handleFightButtonClick)
    button = button.nextElementSibling
    button.innerText = buttonsLabels[1]
    button.addEventListener("click", handleBagButtonClick)
    button = button.nextElementSibling
    button.innerText = buttonsLabels[2]
    button.addEventListener("click", handlePokemonButtonClick)
    button = button.nextElementSibling
    button.innerText = buttonsLabels[3]
    button.addEventListener("click", handleRunButtonClick)
    hideBackButton()
}
function handleFightButtonClick() {
    resetButtonListeners()
    let battleOptionsGrid = Array.from(document.getElementById("battleOptionsGrid").children)
    battleOptionsGrid.pop()
    for (let i = 0; i < userPokemon.moves.length; i++) {
        if (userPokemon.moves[i] != null) {
            battleOptionsGrid[i].innerHTML = `${userPokemon.moves[i].name} <br />(${userPokemon.moves[i].power}, ${userPokemon.moves[i].type})`
            battleOptionsGrid[i].onclick = () => {
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
        } else {
            battleOptionsGrid[i].innerHTML = ""
        }
    }
    showBackButton()
}

function handleBagButtonClick() {
    resetButtonListeners
    let buttons = document.getElementById("battleOptionsGrid").children
    let labels = [{
        name: "Heal",
        types: ["Potion", "Super Potion", "Hyper Potion", "Max Potion"],
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
    for(let i = 0; i< labels.length; i++){
        buttons[i].innerText = labels[i].name
        buttons[i].addEventListener('click', event => {
            handleBagSubmenus(labels[i].name, labels[i].types)
        })
    }
    showBackButton()
}
function handleBagSubmenus(type, subtypes) {
    resetButtonListeners()
    let buttons = document.getElementById("battleOptionsGrid").children
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = subtypes[i]
        buttons[i].addEventListener('click', event => {
            handleChooseItem(type, subtypes)
        })
    }
}

function handleChooseItem(item, type) {
    resetButtonListeners()
    let buttons = document.getElementById("battleOptionsGrid").children
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = ""
    }
    buttons[0].innerText = 'USE'
   /* buttons[0].addEventListener('click', event => {
        user.inventory.get(item).get(type).use
    })*/
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
