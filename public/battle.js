import { User } from './models/user.js'
import { BattleLogic } from "./models/battlelogic.js"
import { pokedex } from "./dex/pokedex.js"
import { imageMap } from "./itemImages.js"
import { potions } from "./dex/items/potions.js"
import { pokeballs } from "./dex/items/pokeballs.js"
import { revives } from "./dex/items/revives.js"


// FIXME: NEEDS TO CHANGE


user.inventory.pokeballs.set("Pokeball", 20)
user.inventory.pokeballs.set("Great Ball", 10)
user.inventory.pokeballs.set("Ultra Ball", 5)
user.inventory.pokeballs.set("Master Ball", 1)
user.inventory.potions.set("Potion", 20)
user.inventory.potions.set("Super Potion", 15)
user.inventory.potions.set("Hyper Potion", 10)
user.inventory.potions.set("Max Potion", 5)
user.inventory.revives.set("Revive", 30)
user.inventory.revives.set("Max Revive", 10)
let enemyPokemon = enemy
let battle = new BattleLogic(userPokemon, enemyPokemon)
let chosenPokemon = userPokemon
export let turnType
window.onload = () => {
    showOptions()
    updateHealth()
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
    button = button.nextElementSibling
    button.addEventListener("click", handleBackButtonClick)
    button.innerText = "Back to Main"
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
                turnType = userPokemon.moves[i]
                let enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
                while (enemyMove == null) {
                    enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
                }
                let turnResult = battle.turn(turnType, enemyMove)
                updateHealth()
                userPokemon = turnResult.pokemon1
                enemyPokemon = turnResult.pokemon2
                if (turnResult.winner != 0) {
                    gameOver(turnResult.winner == 1 ? userPokemon.name : enemyPokemon.name)
                    /*
                   if(turnResult.winner == 1){
                       console.log(userPokemon.level)
                       userPokemon.levelUp();
                       console.log(userPokemon.level)
                   }
                   */
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
    },
    {
        name: "Catch",
        types: ["Pokeball",
            "Great Ball",
            "Ultra Ball",
            "Master Ball",
        ]
    },
    {
        name: "Revive",
        types: ["Revive", "Max Revive"],
    }
    ]
    for (let i = 0; i < labels.length; i++) {
        buttons[i].innerText = labels[i].name
        buttons[i].addEventListener("click", event => {
            handleBagSubmenus(labels[i].types)
        })
    }
    showBackButton()
}

function handleBagSubmenus(subtypes) {
    resetButtonListeners()
    let buttons = document.getElementById("battleOptionsGrid").children
    for (let i = 0; i < buttons.length - 1; i++) {
        if (subtypes[i] == undefined) {
            buttons[i].innerText = " "
        } else {
            buttons[i].innerText = subtypes[i]
            buttons[i].addEventListener("click", event => {
                handleChooseItem(subtypes[0], subtypes[i])
            })
        }
    }
}
function handleChooseItem(itemClass, item) {

    resetButtonListeners()
    let buttons = document.getElementById("battleOptionsGrid").children
    for (let i = 0; i < buttons.length - 1; i++) {
        buttons[i].innerText = " "
    }
    if (itemClass == 'Potion') {
        buttons[0].innerText = "USE: " + user.inventory.potions.get(item) + ' left'
    }
    if (itemClass == 'Pokeball') {
        buttons[0].innerText = "USE: " + user.inventory.pokeballs.get(item) + ' left'
    }
    if (itemClass == 'Revive') {
        buttons[0].innerText = "USE: " + user.inventory.pokeballs.get(item) + ' left'
    }

    buttons[1].innerHTML = imageMap.get(item)
    buttons[0].addEventListener("click", event => {
        if (itemClass == "Potion" || itemClass == "Revive") {
            if (user.inventory.potions.get(item) > 0) {
                handleHealMenus(itemClass, item)
            } else {
                return {
                    success: false,
                    message: 'you dont have any ' + item + 's left'
                }
            }
        }
        if (itemClass == 'Pokeball') {
            if (user.inventory.pokeballs.get(item) > 0) {
                if (pokedex.get(userPokemon.name).catch(pokeballs.get(item))) {
                    user.inventory.pokeballs.set(item, user.inventory.pokeballs.get(item) - 1)
                    turnType = 'Successful Catch'
                    user.pc.push(enemyPokemon)
                    let turnResult = battle.turn(turnType, enemyMove)
                    updateHealth()
                    userPokemon = turnResult.pokemon1
                    enemyPokemon = turnResult.pokemon2
                } else {
                    turnType = 'Attempted Catch'
                    user.inventory.pokeballs.set(item, user.inventory.pokeballs.get(item) - 1)
                    alert('Oh no! ' + enemyPokemon + ' broke free!')
                    let turnResult = battle.turn(turnType, enemyMove)
                    updateHealth()
                    userPokemon = turnResult.pokemon1
                    enemyPokemon = turnResult.pokemon2
                    return
                }
            } else {
                return {
                    success: false,
                    message: 'Bruh you dont have anymore ' + type + 's'
                }
            }

        }
    })
}
function handleHealMenus(type, item) {
    resetButtonListeners() //
    let buttons = document.getElementById('battleOptionsGrid').children
    if (type == "Potion") {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = user.pc[i].name
            if (user.pc[i].currentStats.health > 0 && user.pc[i].currentStats.health < user.pc[i].maxHP) {
                buttons[i].addEventListener('click', event => {
                    resetButtonListeners();
                    showOptions();
                    turnType = 'Healed/Revived'
                    user.pc[i].heal(potions.get(item).amountToHeal)
                    user.inventory.potions.set(item, user.inventory.potions.get(item) - 1)
                    let turnResult = battle.turn(turnType, enemyMove)
                    userPokemon = turnResult.pokemon1
                    enemyPokemon = turnResult.pokemon2
                    if (turnResult.winner != 0) {
                        gameOver(turnResult.winner == 1 ? userPokemon.name : enemyPokemon.name)
                    }
                })
            }
            else {
                buttons[i].addEventListener('click', event => {
                    alert('you cant use a potion on a pokemon thats dead or at full health')
                })

            }
        }
    } else {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = user.pc[i].name
            if (user.pc[i].currentStats.health == 0) {
                buttons[i].addEventListener('click', event => {
                    resetButtonListeners();
                    showOptions();
                    turnType = 'Healed/Revived'
                    user.pc[i].heal(potions.get(item).percentHeal * user.pc[i].maxHP)
                    user.inventory.revives.set(item, user.inventory.revives.get(item) - 1)
                    let turnResult = battle.turn(turnType, enemyMove)
                    userPokemon = turnResult.pokemon1
                    enemyPokemon = turnResult.pokemon2
                    if (turnResult.winner != 0) {
                        gameOver(turnResult.winner == 1 ? userPokemon.name : enemyPokemon.name)
                    }
                    return
                })
            }
            else {
                buttons[i].aaddEventListener('click', event => {
                    alert('You cant revive a pokemon that is not dead my guy')
                    return
                })
            }
        }
    }
}
// TODO
function handlePokemonButtonClick() {
    resetButtonListeners();
    let buttons = document.getElementById("battleOptionsGrid").children
    for (let i = 0; i < chosenPokemon.length; i++) {
        buttons[i].innerText = chosenPokemon[i].name
        buttons[i].addEventListener('click', event => {
            resetButtonListeners()
            buttons[3].innerText = ' '
            buttons[0].innerText = chosenPokemon[i].nick
            buttons[1].innerText = chosenPokemon[i].name
            buttons[2].innerText = 'Send to Battle'
            buttons[2].addEventListener('click', event => {
                let ppCounter = 0
                if (userPokemon == chosenPokemon[i]) {
                    alert('This pokemon is already on the battlefield bozo')
                    showBackButton()
                }
                else if (chosenPokemon[i].currentStats.health == 0) {
                    alert('This pokemon is dead my guy')
                    showBackButton()
                }
                else {
                    userPokemon = chosenPokemon[i]
                    alert(chosenPokemon[i].name + ', I choose you!')
                    turnType = 'Chose New'
                    console.log(enemyPokemon)
                    let turnResult = battle.turn(turnType, enemyPokemon)
                    userPokemon = turnResult.pokemon1
                    enemyPokemon = turnResult.pokemon2
                    if (turnResult.winner != 0) {
                        gameOver(turnResult.winner == 1 ? userPokemon.name : enemyPokemon.name)
                    }
                    showOptions()
                }
            })

            showBackButton()
        })
    }
    showBackButton()
}
// TODO
function handleRunButtonClick() {
    resetButtonListeners()
    sendData("/openworld", "openworld", "POST")
}

function sendData(path, name, method = 'post') {

    const form = document.createElement('form');
    form.method = method;
    form.action = path;
    document.body.appendChild(form);

    const formField = document.createElement('input');
    formField.type = 'hidden';
    formField.name = name;


    form.appendChild(formField);

    form.submit();
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
    alert(text)
    handleRunButtonClick()
}

function updateHealth() {
    document.getElementById("maxNumPlayerHealth").innerText = userPokemon.currentStats.maxHealth
    document.getElementById("currentNumPlayerHealth").innerText = userPokemon.currentStats.health
    document.documentElement.style.setProperty("--player-health", (100 * userPokemon.currentStats.health / userPokemon.currentStats.maxHealth) + "%")
    document.documentElement.style.setProperty("--enemy-health", (100 * enemyPokemon.currentStats.health / enemyPokemon.currentStats.maxHealth) + "%")
}