import { pokedex } from "./dex/pokedex.js"
import { BattleLogic } from "./models/battlelogic.js"
// hi ben i am bugfixing pls fix status effects
let userPokemon = user.pc[0]
userPokemon = pokedex.get("Turtwig")
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
    resetButtonListeners()
    let buttons = document.getElementsByTagName("button")
    buttons[0].innerText = "Heal"
    document.getElementById("box1").children[0].addEventListener("click", handleBagSubmenus("heal"))
    buttons[1].innerText = "Catch"
    document.getElementById("box2").children[0].addEventListener("click", handleBagSubmenus("Catch"))
    buttons[2].innerText = "Revive"
    buttons[3].innerText = "Return"
    document.getElementById("box4").children[0].addEventListener("click", showOptions)
    showBackButton()
}
function handleBagSubmenus(type) {
    resetButtonListeners()
    let buttons = document.getElementsByTagName("button")
    if (type == "Revive") {
        buttons[0].innerText = "Max revive"
        document.getElementById("box1").children[0].addEventListener("click", handleChooseItem(type, ""))
    }
    if (type == "Heal") {
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
    //TO DO: have the 2nd button show the number of each item and have 3rd button 
    //show an image for the particular item, and have the 4th show the stats of the item
    resetButtonListeners()
    if (item == "Catch") {
        if (type == "Great Ball") {
            buttons[0].innerText = "Use"
            //TO DO: add image for the balls and add access to User inventory Use funcitons
            document.getElementById("box1").children[0].addEventListener("click", handleUseItem(item, type))

        }
        if (type == "Pokeball") {
            buttons[0].innerText = "Use"
            //TO DO: add image for the balls and add access to User inventory Use funcitons
            document.getElementById("box1").children[0].addEventListener("click", handleUseItem(item, type))

        }
        if (type == "Ultra Ball") {
            buttons[0].innerText = "Use"
            //TO DO: add image for the balls and add access to User inventory Use funcitons
            document.getElementById("box1").children[0].addEventListener("click", handleUseItem(item, type))

        }
        if (type == "Master Ball") {
            buttons[0].innerText = "Use"
            //TO DO: add image for the balls and add access to User inventory Use funcitons
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
    //TO DO: use the item passed in 





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
