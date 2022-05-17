import { BattleLogic } from "./models/battlelogic.js"
import { pokedex } from "./dex/pokedex.js"
import { potions } from "./dex/items/potions.js"
import { pokeballs } from "./dex/items/pokeballs.js"

userPokemon = pokedex.fromJSON(userPokemon)
enemyPokemon = pokedex.fromJSON(enemyPokemon)
// FIXME: NEEDS TO CHANGE
let battle = new BattleLogic(userPokemon, enemyPokemon)
let turnType
//turntype will be passed into pokemon1 argument for battlelogic.turn(pokemon1, pokemon2)
//its value is a string that determines the users turn if it isnt having their pokemon make a move
//for example, if a user decides to try and catch the pokemon and it fails, turntype = "Attempted Catch", and
//turn will proceed as though your pokemon has already amde its turn

window.onload = () => {
    showOptions()
    updateHealth()
}

let battleUser = {
    pc: [],
    inventory: new Map()
}

const items = [
    "Pokeball",
    "GreatBall",
    "UltraBall",
    "MasterBall",
    "Potion",
    "SuperPotion",
    "HyperPotion",
    "MaxPotion",
    "Revive",
    "MaxRevive"
]
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
                    return gameOver(turnResult.winner == 1 ? userPokemon.name : enemyPokemon.name + "Won!")
                } else {
                    return showOptions()
                }
            }
        } else {
            battleOptionsGrid[i].innerHTML = ""
        }
    }
    showBackButton()
}

function handleBagButtonClick() {
    resetButtonListeners()
    let buttons = document.getElementById("battleOptionsGrid").children
    let labels = [{
        name: "Heal",
        types: ["Potion", "SuperPotion", "HyperPotion", "MaxPotion"],
    },
    {
        name: "Catch",
        types: ["Pokeball",
            "GreatBall",
            "UltraBall",
            "MasterBall",
        ]
    },
    {
        name: "Revive",
        types: ["Revive", "MaxRevive"],
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
    buttons[0].innerText = "USE: " + battleUser.inventory.get(item) + " left"
    buttons[0].addEventListener("click", event => {
        if (itemClass == "Potion" || itemClass == "Revive") {
            if (battleUser.inventory.get(item) > 0) {
                handleHealMenus(itemClass, item)
            } else {
                return {
                    success: false,
                    message: "you dont have any " + item + "s left"
                }
            }
        }
        if (itemClass == "Pokeball") {
            if (battleUser.inventory.get(item) > 0) {
                if (pokedex.get(userPokemon.name).catch(pokeballs.get(item))) {
                    battleUser.inventory.set(item, battleUser.inventory.get(item) - 1)
                    turnType = "Successful Catch"
                    battleUser.pc.push(enemyPokemon)
                    let turnResult = battle.turn(turnType, enemyMove)
                    updateHealth()
                    userPokemon = turnResult.pokemon1
                    enemyPokemon = turnResult.pokemon2
                    return getNewPokemon(enemyPokemon)
                } else {
                    turnType = "Attempted Catch"
                    battleUser.inventory.set(item, battleUser.inventory.get(item) - 1)
                    alert("Oh no! " + enemyPokemon + " broke free!")
                    let turnResult = battle.turn(turnType, enemyMove)
                    updateHealth()
                    userPokemon = turnResult.pokemon1
                    enemyPokemon = turnResult.pokemon2
                    if (turnResult.winner != 0) {
                        if (userPokemon.currentStats.health == 0) {
                            alert('Your current pokemon has died')
                            return handlePokemonButtonClick()
                        }
                        if (turnResult == 1) {
                            return gameOver('You Win!')
                        }
                    }
                    return showOptions()
                }
            } else {
                return {
                    success: false,
                    message: "Bruh you dont have anymore " + type + "s"
                }
            }
        }
    })
}
//if you click on either heal or revive, this funcition with activate and allows you to access the use menus for each healing item
//it also connects the buttons toward the battUser inventory which is based of the user JSON in database
function handleHealMenus(type, item) {
    resetButtonListeners() //
    let buttons = document.getElementById("battleOptionsGrid").children
    if (type == "Potion") {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = battleUser.pc[i].name
            if (battleUser.pc[i].currentStats.health > 0 && battleUser.pc[i].currentStats.health < battleUser.pc[i].currentStats.maxHealth) {
                buttons[i].addEventListener("click", event => {
                    resetButtonListeners();
                    showOptions();
                    turnType = "Healed/Revived"
                    battleUser.pc[i].heal(potions.get(item).amountToHeal)
                    battleUser.inventory.set(item, battleUser.inventory.get(item) - 1)
                    let turnResult = battle.turn(turnType, enemyMove)
                    userPokemon = turnResult.pokemon1
                    enemyPokemon = turnResult.pokemon2
                    if (turnResult.winner != 0) {
                        if (userPokemon.currentStats.health == 0) {
                            alert('your current pokemon has died')
                            return handlePokemonButtonClick()
                        }
                        if (turnResult == 1) {
                            return gameOver('You Win!')
                        }
                    }
                    return showOptions()
                })
            }
            else {
                buttons[i].addEventListener("click", event => {
                    alert("you cant use a potion on a pokemon thats dead or at full health")
                })

            }
        }
    } else {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = battleUser.pc[i].name
            if (battleUser.pc[i].currentStats.health == 0) {
                buttons[i].addEventListener("click", event => {
                    resetButtonListeners();
                    showOptions();
                    turnType = "Healed/Revived"
                    battleUser.pc[i].heal(potions.get(item).percentHeal * battleUser.pc[i].currentStats.maxHealth)
                    battleUser.inventory.set(item, battleUser.inventory.revives.get(item) - 1)
                    let turnResult = battle.turn(turnType, enemyMove)
                    userPokemon = turnResult.pokemon1
                    enemyPokemon = turnResult.pokemon2
                    if (turnResult.winner != 0) {
                        if (userPokemon.currentStats.health == 0) {
                            alert('your current pokemon has died')
                            return handlePokemonButtonClick()
                        }
                        if (turnResult == 1) {
                            return gameOver('You Win!')
                        }
                    }
                    return showOptions()
                })

            }
            else {
                buttons[i].aaddEventListener("click", event => {
                    alert("You cant revive a pokemon that is not dead my guy")
                    return
                })
            }
        }
    }
}
function handlePokemonButtonClick() {
    let summativeHealth = 0
    for (let i = 0; i < battleUser.pc.length; i++) {
        summativeHealth += battleUser.pc[i].currentStats.health
    }
    if (summativeHealth == 0) {
        return gameOver('All your pokemon are dead. Bit of a cope moment if I do say so myself')
    }
    resetButtonListeners();
    let buttons = document.getElementById("battleOptionsGrid").children
    alert('Choose the pokemon you to use next')
    for (let i = 0; i < battleUser.pc.length; i++) {
        buttons[i].innerText = battleUser.pc[i].name
        buttons[i].addEventListener("click", event => {
            resetButtonListeners()
            buttons[3].innerText = " "
            buttons[1].innerText = battleUser.pc[i].name
            buttons[2].innerText = "Send to Battle"
            buttons[2].addEventListener("click", event => {
                if (userPokemon == battleUser.pc[i]) {
                    alert("This pokemon is already on the battlefield bozo")
                    showBackButton()
                }
                else if (battleUser.pc[i].currentStats.health == 0) {
                    alert("This pokemon is dead my guy")
                    showBackButton()
                }
                else {
                    userPokemon = battleUser.pc[i]
                    alert(user.pc[i].name + ", I choose you!")
                    turnType = "Chose New"
                    console.log(enemyPokemon)
                    let turnResult = battle.turn(turnType, enemyPokemon)
                    userPokemon = turnResult.pokemon1
                    enemyPokemon = turnResult.pokemon2
                    if (turnResult.winner != 0) {
                        if (userPokemon.currentStats.health == 0) {
                            handlePokemonButtonClick()
                        }
                        return gameOver(turnResult.winner == 1 ? "You " : enemyPokemon.name + "Won!")
                    }
                    else {
                        return showOptions();
                    }
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
    sendData("/openworld", [userId], ["userId"], "POST")
}

function sendData(path, values, names, method = "POST") {
    const form = document.createElement("form")
    form.method = method
    form.action = path
    document.body.appendChild(form)
    for (let i = 0; i < values.length; i++) {
        let formField = document.createElement("input")
        formField.type = "hidden"
        formField.name = names[i]
        formField.value = values[i]
        form.appendChild(formField)
    }
    form.submit()
}

/**
 * Shows back button
 */
function showBackButton() {
    document.getElementById("back").classList.remove("hidden")
}
function getNewPokemon() {
    let buttons = document.getElementById("battleOptionsGrid").children
    resetButtonListeners()
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = " "
    }
    buttons[0].innerText = "Keep"
    buttons[0].addEventListener("click", event => {
        if (battleUser.pc.length == 4) {
            resetButtonListeners()
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].innerText = battleUser.pc[i]
                alert("Click on the pokemon you want to replace with " + enemyPokemon.name)
                buttons[i].addEventListener("click", event => {
                    alert("Goodbye " + battleUser.pc[i].name + ", my comrade, you are free!")
                    alert("Hello " + enemyPokemon.name + ", welcome to the team!")
                    battleUser.pc[i] = pokedex.get(enemyPokemon.name)
                    handleRunButtonClick()
                    return
                })
            }
        }
        else {
            battleUser.pc.push(pokedex.get(enemyPokemon.name))
        }
    })
    buttons[1].innerText = "Release"
    buttons[1].addEventListener("click", event => {
        alert(enemyPokemon.name + ", Be Free!")
        showOptions()
        gameOver("You freed the wild " + enemyPokemon.name)
        return
    })
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
//when fight is over though any result, gameOver is called and it send you back to the open world
function gameOver(message) {
    alert(message)
    handleRunButtonClick()
}

function updateHealth() {
    document.getElementById("maxNumPlayerHealth").innerText = userPokemon.currentStats.maxHealth
    document.getElementById("currentNumPlayerHealth").innerText = userPokemon.currentStats.health
    document.documentElement.style.setProperty("--player-health", (100 * userPokemon.currentStats.health / userPokemon.currentStats.maxHealth) + "%")
    document.documentElement.style.setProperty("--enemy-health", (100 * enemyPokemon.currentStats.health / enemyPokemon.currentStats.maxHealth) + "%")
}
/* 
//takes the data from user JSON in database and updates the batteUser's attribtues accordingly
export function updateBattleUser() {
    for (let i = 0; i < items.length; i++) {
        battleUser.inventory.set(items[i], database.getInventoryByUserId(userId).get(items[i].toLowerCase() + "Count"))
    }
    battleUser.pc.splice(0, battleUser.pc.length)
    for (let i = 1; i < database.getPcByUserId(userId).length; i++) {
        battleUser.pc.push(pokedex.fromJSON(database.getPcByUserId(userId[i])))
    }
}
//takes the data from battUser and updates the data in the user JSON in database
export function updateDatabaseUser() {
    for (let i = 1; i < database.getPcByUserId(userId).length; i++) {
        database.updatePokemonInUserPc(userId, battleUser.pc[i - 1], i)
    }
    for (let i = 0; i < items.length; i++) {
        database.updateInventoryByUserId(userId, items[i].toLowerCase() + "Count", battleUser.inventory.get(items[i]))
    }
} */

async function getPcByUserId(userId) {
    let response = await fetch("/getPcByUserId", {
        method: "POST",
        body: JSON.stringify({
            userId: userId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json()
    })
    return response
}

async function updateInventoryByUserId(userId, name, quantity) {
    let response = await fetch("/updateInventoryByUserId", {
        method: "POST",
        body: JSON.stringify({
            userId: userId,
            name: name,
            quantity: quantity
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json()
    })
    return response
}


async function getInventoryByUserId(userId) {
    let response = await fetch("/getInventoryByUserId", {
        method: "POST",
        body: JSON.stringify({
            userId: userId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json()
    })
    return response
}


async function insertNewPokemonIntoUserPc(userId, pokemon) {
    let response = await fetch("/insertNewPokemonIntoUserPc", {
        method: "POST",
        body: JSON.stringify({
            userId: userId,
            pokemon: pokemon
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json()
    })
    return response
}



async function updatePokemonInUserPc(userId, pokemon, index) {
    let response = await fetch("/updatePokemonInUserPc", {
        method: "POST",
        body: JSON.stringify({
            userId: userId,
            pokemon: pokemon,
            index: index
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json()
    })
    return response
}


async function getUserByUserId(userId) {
    let response = await fetch("/getUserByUserId", {
        method: "POST",
        body: JSON.stringify({
            userId: userId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json()
    })
    return response
}


async function writeToDisk() {
    let response = await fetch("/writeToDisk", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json()
    })
    return response
}

async function getUsers() {
    let response = await fetch("/getUsers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json()
    })
    return response
}

async function printUsers() {
    let response = await fetch("/printUsers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json()
    })
    return response
}

async function printPcs(sqlstr) {
    let response = await fetch("/printPcs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json()
    })
    return response
}

async function printInventories() {
    let response = await fetch("/printInventories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json()
    })
    return response
}

async function printAll() {
    let response = await fetch("/printAll", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json()
    })
    return response
}


async function executeSelectSql(sqlstr) {
    let response = await fetch("/executeSelectSql", {
        method: "POST",
        body: JSON.stringify({
            sqlstr: sqlstr
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json()
    })
    return response
}


async function executeSql(sqlstr) {
    let response = await fetch("/executeSql", {
        method: "POST",
        body: JSON.stringify({
            sqlstr: sqlstr
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json()
    })
    return response
}
