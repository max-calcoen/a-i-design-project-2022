import { BattleLogic } from "./models/battlelogic.js"
import { pokedex } from "./dex/pokedex.js"
import { potions } from "./dex/items/potions.js"
import { pokeballs } from "./dex/items/pokeballs.js"


let mannequin = {
    pc: await getPcByUserId(userId),
    inventory: await getInventoryByUserId(userId)
}
for (let i = 1; i < mannequin.pc.length; i++) {
    if (mannequin.pc[i] == null) {
        continue
    }
    mannequin.pc[i] = pokedex.fromJSON(JSON.parse(mannequin.pc[i]))
}
enemyPokemon = pokedex.fromJSON(enemyPokemon)

let currentPokemonChosen = 1
for (let i = 1; i < mannequin.pc.length; i++) {
    if (mannequin.pc[i] == null) {
        currentPokemonChosen = i + 1
        continue
    }
    if (!mannequin.pc[i].fainted) break
    currentPokemonChosen = i + 1
}
if (currentPokemonChosen > mannequin.pc.length - 1) {
    for (let i = 1; i < mannequin.pc.length; i++) {
        if (mannequin.pc[i] == null) continue
        mannequin.pc[i].heal(Math.floor(mannequin.pc[i].currentStats.maxHealth / 2))
        console.log(mannequin.pc)
        console.log(mannequin.pc[i])
    }
    gameOver("All of your Pokémon fainted. You blacked out!")
}

let battle = new BattleLogic(mannequin.pc[currentPokemonChosen], enemyPokemon)
let turnType
// turntype will be passed into pokemon1move argument for battlelogic.turn(pokemon1move, pokemon2move)
// its value is a string that determines the users turn if it isnt having their pokemon make a move
// for example, if a user decides to try and catch the pokemon and it fails, turntype = "Attempted Catch", and
// turn will proceed as though your pokemon has already made its turn
showOptions()
updateHealth()

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
    let buttonsLabels = ["Fight", "Bag", "Pokémon", "Run"]
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
    for (let i = 0; i < mannequin.pc[currentPokemonChosen].moves.length; i++) {
        if (mannequin.pc[currentPokemonChosen].moves[i] != null) {
            // show moves
            battleOptionsGrid[i].innerHTML = `${mannequin.pc[currentPokemonChosen].moves[i].name} <br />(${mannequin.pc[currentPokemonChosen].moves[i].power}, ${mannequin.pc[currentPokemonChosen].moves[i].type})`
            // add event listener to trigger turn
            battleOptionsGrid[i].onclick = () => {
                // get random move
                let enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
                while (enemyMove == null) {
                    enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
                }
                let turnResult = battle.turn(mannequin.pc[currentPokemonChosen].moves[i], enemyMove)
                updateHealth()
                mannequin.pc[currentPokemonChosen] = turnResult.pokemon1
                enemyPokemon = turnResult.pokemon2
                if (turnResult.winner == 0) {
                    resetButtonListeners()
                    showOptions()
                    return
                } else if (turnResult.winner == 1) {
                    console.log("p1 wins!")
                    gameOver(`${enemyPokemon.name} fainted!`)
                    return
                } else {
                    alert(`${mannequin.pc[currentPokemonChosen].name} fainted!`)
                    handlePokemonButtonClick(false)
                    return
                }
            }
        } else battleOptionsGrid[i].innerHTML = ""
    }
    showBackButton()
}

function handleBagButtonClick() {
    resetButtonListeners()
    let buttons = document.getElementById("battleOptionsGrid").children
    let labels = [{
        name: "Heal",
        types: ["Potion", "Superpotion", "Hyperpotion", "Maxpotion"],
    },
    {
        name: "Catch",
        types: ["Pokeball",
            "Greatball",
            "Ultraball",
            "Masterball",
        ]
    },
    {
        name: "Revive",
        types: ["Revive", "Maxrevive"],
    }
    ]
    for (let i = 0; i < labels.length; i++) {
        buttons[i].innerText = labels[i].name
        buttons[i].addEventListener("click", (e) => {
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
            buttons[i].addEventListener("click", (e) => {
                handleChooseItem(subtypes[0], subtypes[i])
            })
        }
    }
}

function handleChooseItem(itemClass, item) {
    resetButtonListeners()
    let buttons = document.getElementById("battleOptionsGrid").children
    for (let i = 0; i < buttons.length - 1; i++) {
        buttons[i].innerText = ""
    }
    buttons[0].innerText = "USE: " + mannequin.inventory.get(item) + " left"
    buttons[0].addEventListener("click", event => {
        if (itemClass == "Potion" || itemClass == "Revive") {
            if (mannequin.inventory.get(item) > 0) {
                handleHealMenus(itemClass, item)
            } else {
                return {
                    success: false,
                    message: "You dont have any " + item + "s left"
                }
            }
        }
        if (itemClass == "Pokeball") {
            if (mannequin.inventory.get(item) > 0) {
                if (mannequin.pc[currentPokemonChosen].catch(pokeballs.get(item))) {
                    handleCatch(enemyPokemon)
                } else {
                    turnType = "Attempted Catch"
                    alert("Oh no! " + enemyPokemon + " broke free!")
                    let turnResult = battle.turn(turnType, enemyMove)
                    updateHealth()
                    mannequin.pc[currentPokemonChosen] = turnResult.pokemon1
                    enemyPokemon = turnResult.pokemon2
                    if (turnResult.winner == 0) {
                        resetButtonListeners()
                        showOptions()
                    } else if (turnResult.winner == 1) {
                        console.log("p1 wins!")
                        gameOver(`${enemyPokemon.name} fainted!`)
                    } else {
                        alert(`${mannequin.pc[currentPokemonChosen].name} fainted!`)
                        handlePokemonButtonClick(false)
                    }
                }
            } else {
                return {
                    success: false,
                    message: "You are out of " + type + "s!"
                }
            }
        }
    })
}
// if you click on either heal or revive, this funcition with activate and allows you to access the use menus for each healing item
// it also connects the buttons toward the battUser inventory which is based of the user JSON in database
function handleHealMenus(type, item) {
    resetButtonListeners()
    let buttons = document.getElementById("battleOptionsGrid").children
    if (type == "Potion") {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = mannequin.pc[i].name
            if (mannequin.pc[i].currentStats.health > 0 && mannequin.pc[i].currentStats.health < mannequin.pc[i].currentStats.maxHealth) {
                buttons[i].addEventListener("click", (e) => {
                    resetButtonListeners()
                    showOptions()
                    turnType = "Healed/Revived"
                    mannequin.pc[i].heal(potions.get(item).amountToHeal)
                    mannequin.inventory.set(item, mannequin.inventory.get(item) - 1)
                    let turnResult = battle.turn(turnType, enemyMove)
                    mannequin.pc[currentPokemonChosen] = turnResult.pokemon1
                    enemyPokemon = turnResult.pokemon2
                    if (turnResult.winner == 0) {
                        resetButtonListeners()
                        showOptions()
                    } else if (turnResult.winner == 1) {
                        console.log("p1 wins")
                        console.log("p1 wins!")
                        gameOver(`${enemyPokemon.name} fainted!`)
                    } else {
                        alert(`${mannequin.pc[currentPokemonChosen].name} fainted!`)
                        handlePokemonButtonClick(false)
                    }
                })
            }
            else {
                buttons[i].addEventListener("click", event => {
                    alert("You can't use a potion on a Pokémon that's dead or at full health!")
                })
            }
        }
    } else {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = mannequin.pc[i].name
            if (mannequin.pc[i].fainted) {
                buttons[i].addEventListener("click", event => {
                    resetButtonListeners()
                    showOptions()
                    turnType = "Healed/Revived"
                    mannequin.pc[i].heal(potions.get(item).percentHeal * mannequin.pc[i].currentStats.maxHealth)
                    mannequin.inventory.set(item, mannequin.inventory.revives.get(item) - 1)
                    let turnResult = battle.turn(turnType, enemyMove)
                    mannequin.pc[currentPokemonChosen] = turnResult.pokemon1
                    enemyPokemon = turnResult.pokemon2
                    if (turnResult.winner == 0) {
                        resetButtonListeners()
                        showOptions()
                    } else if (turnResult.winner == 1) {
                        console.log("p1 wins!")
                        gameOver(`${enemyPokemon.name} fainted!`)
                    } else {
                        alert(`${mannequin.pc[currentPokemonChosen].name} fainted!`)
                        handlePokemonButtonClick(false)
                    }
                })

            }
            else {
                buttons[i].aaddEventListener("click", event => {
                    alert("You can't revive a Pokémon that has not fainted!")
                    return
                })
            }
        }
    }
}
function handlePokemonButtonClick(p2canmove = true) {
    if (!p2canmove) enemyPokemon.canMove = false
    showBackButton()
    let summativeHealth = 0
    for (let i = 1; i < mannequin.pc.length; i++) {
        if (mannequin.pc[i] == null) continue
        summativeHealth += mannequin.pc[i].currentStats.health
    }
    if (summativeHealth == 0) {
        // EVERETT TODO: heal all pokemon in mannequin.pc to half health
        return gameOver("All of your pokemon fainted. You blacked out!")
    }
    resetButtonListeners()
    let buttons = Array.from(document.getElementById("battleOptionsGrid").children)
    buttons.pop()
    for (let button of buttons) button.innerText = ""
    document.getElementById("storyText").innerText = "Choose a Pokémon"
    for (let i = 1; i < mannequin.pc.length; i++) {
        if (mannequin.pc[i] == null) {
            continue
        }
        buttons[i - 1].innerText = mannequin.pc[i].name
        if (i == currentPokemonChosen) buttons[i - 1].innerText = mannequin.pc[i].name + " (on battlefield)"
        if (mannequin.pc[i].fainted) {
            buttons[i - 1].innerText = mannequin.pc[i].name + " (fainted)"
        }
        buttons[i - 1].addEventListener("click", (e) => {
            if (currentPokemonChosen == i) {
                alert("This Pokémon is already on the battlefield!")
            } else if (mannequin.pc[i].fainted) {
                alert("This Pokémon has fainted!")
            } else {
                resetButtonListeners()
                currentPokemonChosen = i
                battle = new BattleLogic(mannequin.pc[currentPokemonChosen], enemyPokemon)
                alert(mannequin.pc[i].name + ", I choose you!")
                turnType = "Chose New"
                let enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
                while (enemyMove == null) {
                    enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
                }
                let turnResult = battle.turn(turnType, enemyMove)
                mannequin.pc[currentPokemonChosen] = turnResult.pokemon1
                enemyPokemon = turnResult.pokemon2
                updateGraphics()
                if (turnResult.winner == 0) {
                    resetButtonListeners()
                    showOptions()
                } else if (turnResult.winner == 1) {
                    gameOver(`${enemyPokemon.name} fainted!`)
                } else {
                    alert(`${mannequin.pc[currentPokemonChosen].name} fainted!`)
                    handlePokemonButtonClick(false)
                }
            }
        })
    }
}

function handleRunButtonClick() {
    gameOver("You ran away!")
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

function handleCatch() {
    let buttons = document.getElementById("battleOptionsGrid").children
    resetButtonListeners()
    for (let i = 0; i < buttons.length - 1; i++) {
        buttons[i].innerText = ""
    }
    document.getElementById("storyText").innerText = `What will ${mannequin[currentPokemonChosen].name} do?`
    buttons[0].innerText = "Keep"
    buttons[0].addEventListener("click", (e) => {
        if (mannequin.pc.length == 5) {
            resetButtonListeners()
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].innerText = mannequin.pc[i]
                alert("Click on the pokemon you want to replace with " + enemyPokemon.name)
                buttons[i].addEventListener("click", (e) => {
                    alert("Goodbye " + mannequin.pc[i].name + ", you are free!")
                    alert("Hello " + enemyPokemon.name + ", welcome to the team!")
                    mannequin.pc[i] = pokedex.get(enemyPokemon.name)
                    gameOver()
                    return
                })
            }
        }
        else {
            mannequin.pc.push(pokedex.get(enemyPokemon.name))
        }
    })
    buttons[1].innerText = "Release"
    buttons[1].addEventListener("click", event => {
        alert(enemyPokemon.name + ", be free!")
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
// when fight is over, gameOver is called and it sends you back to openworld
function gameOver(message) {
    if (message) alert(message)
    for (let i = 1; i < mannequin.pc.length; i++) {
        mannequin.pc[i] = JSON.stringify(mannequin.pc[i])
    }
    updatePcByUserId(userId, mannequin.pc)
    console.log(mannequin.inventory)
    updateInventoryByUserId(userId, mannequin.inventory)
    sendData("/openworld", [userId], ["userId"], "POST")
}

function updateHealth() {
    document.getElementById("maxNumPlayerHealth").innerText = mannequin.pc[currentPokemonChosen].currentStats.maxHealth
    document.getElementById("currentNumPlayerHealth").innerText = mannequin.pc[currentPokemonChosen].currentStats.health
    document.documentElement.style.setProperty("--player-health", (100 * mannequin.pc[currentPokemonChosen].currentStats.health / mannequin.pc[currentPokemonChosen].currentStats.maxHealth) + "%")
    document.documentElement.style.setProperty("--enemy-health", (100 * enemyPokemon.currentStats.health / enemyPokemon.currentStats.maxHealth) + "%")
}

function updateGraphics() {
    document.getElementById("playerHealth").children[0].innerHTML = `${mannequin.pc[currentPokemonChosen].name} <span id="currentNumPlayerHealth"></span> / <span id="maxNumPlayerHealth"></span>`
    document.getElementById("storyText").innerText = `What will ${mannequin.pc[currentPokemonChosen].name} do?`
    document.getElementById("p1").src = `/assets/sprites/${mannequin.pc[currentPokemonChosen].backImg}`
    updateHealth()
}

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

async function updateInventoryByUserId(userId, newInventory) {
    let response = await fetch("/updateInventoryByUserId", {
        method: "POST",
        body: JSON.stringify({
            userId: userId,
            name: newInventory
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

async function updatePcByUserId(userId, newPc) {
    let response = await fetch("/updatePcByUserId", {
        method: "POST",
        body: JSON.stringify({
            userId: userId,
            newPc: newPc
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