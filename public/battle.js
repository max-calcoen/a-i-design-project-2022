import { pokedex } from "./dex/pokedex.js"
import { BattleLogic } from "./models/battlelogic.js"
import { Pokemon } from "./models/pokemon.js"

let userPokemon = Pokemon.fromJSON(user.pc[0])
let enemyPokemon = pokedex.get("Raichu")
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
            BattleOptionsGrid.children[i].innerHTML = userPokemon.moves[i].name
        } else {
            BattleOptionsGrid.children[i].innerHTML = ""
        }
    }

    let movesDivs = document.getElementById("battleOptionsGrid").children
    for (let i = 0; i < movesDivs.length - 1; i++) {
        console.log(userPokemon.moves[i])
        if (userPokemon.moves[i] != null) {
            movesDivs[i].onclick = () => {
                let turnResult = battle.turn(userPokemon.moves[i], enemyPokemon.moves[Math.floor(Math.random() * 4)])
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
    resetButtonListeners()
    let labels = ['Heal', 'Catch', 'Revive', 'Return']
    let buttons = document.getElementById("battleOptionsGrid")
    let button = buttons.firstElementChild
    for (let i = 0; i < labels.length; i++) {
        console.log(button)
        button.innerHTML = labels[i]
        button.addEventListener('click', handleBagSubmenus(labels[i].toLowerCase()))
        button = button.nextElementSibling
    }
    showBackButton()
}

function handleBagSubmenus(type) {
    resetButtonListeners()
    let buttons = document.getElementsByTagName("button")
    if (type == "Revive") {
        resetButtonListeners()

        buttons[0].innerText = "Max Revive"
        document.getElementById("box1").children[0].addEventListener("click", handleChooseItem(type, ""))
        buttons[1].innerText = "Regular Revive"
        document.getElementById("box1").children[0].addEventListener("click", handleChooseItem(type, ""))

    }
    if (type == "Heal") {
        resetButtonListeners()
        buttons[0].innerText = "Potions"
        document.getElementById("box1").children[0].addEventListener("click", handleChooseItem(type, "Potion"))
        buttons[1].innerText = "Potions"
        document.getElementById("box2").children[0].addEventListener("click", handleChooseItem(type, "Potion"))
        buttons[2].innerText = "Potions"
        document.getElementById("box3").children[0].addEventListener("click", handleChooseItem(type, "Potion"))
        buttons[3].innerText = "Potions"
        document.getElementById("box4").children[0].addEventListener("click", handleChooseItem(type, "Potion"))
    }
    if (type == "Catch") {
        resetButtonListeners()
        buttons[0].innerText = "Pokeball"
        document.getElementById("box1").children[0].addEventListener("click", handleChooseItem(type, "Pokeball"))
        buttons[1].innerText = "Great Ball"
        document.getElementById("box2").children[0].addEventListener("click", handleChooseItem(type, "Great Ball"))
        buttons[2].innerText = "Ultra Ball"
        document.getElementById("box3").children[0].addEventListener("click", handleChooseItem(type, "Ultra Ball"))
        buttons[3].innerText = "Master Ball"
        document.getElementById("box4").children[0].addEventListener("click", handleChooseItem(type, "Master Ball"))
    }
    showBackButton()
}
function handleChooseItem(item, type) {
    //TODO: have the 2nd button show the number of each item and have 3rd button 
    //show an image for the particular item, and have the 4th show the stats of the item
    resetButtonListeners()
    let buttons = document.getElementsByTagName("button")
    if (item == "Catch") {
        buttons[0].innerText = "Use"
        if (type == "Great Ball") {
            //TODO: add image for the balls and add access to User inventory Use funcitons
            document.getElementById("box1").children[0].addEventListener("click", handleUseItem(item, type))
        }
        if (type == "Pokeball") {
            //TODO: add image for the balls and add access to User inventory Use funcitons
            document.getElementById("box1").children[0].addEventListener("click", handleUseItem(item, type))
        }
        if (type == "Ultra Ball") {
            //TODO: add image for the balls and add access to User inventory Use funcitons
            document.getElementById("box1").children[0].addEventListener("click", handleUseItem(item, type))

        }
        if (type == "Master Ball") {
            //TODO: add image for the balls and add access to User inventory Use funcitons
            document.getElementById("box1").children[0].addEventListener("click", handleUseItem(item, type))

        }
    }
    if (item == "Potions") {
        if (type = "Potion") {

        }
    }
    if (item == "Revives") {
        if (type = "Great Ball") {
        }
    }

    showOptions()
}

function handleUseItem(item, type) {
    if (item == "Potion") {
        if (type == "Potion") {

        }
        if (type == "Super Potion") {

        }
        if (type == "Hyper Potion") {

        }
        if (type == "Max Potion") {

        }

    }
    if (item == "Revive") {
        if (type == "Max") {

        }
        if (type == "Regular") {

        }

    }
    if (item == "Ball") {
        if (type == "Pokeball") {

        }
        if (type == "Great Ball") {

        }
        if (type == "Ultra Ball") {

        }
        if (type == "Master Ball") {

        }
    }
    //TODO: use the item passed in 





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
