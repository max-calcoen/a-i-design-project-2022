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
    }
    gameOver("All of your Pokémon fainted. You blacked out!")
}

let battle = new BattleLogic(mannequin.pc[currentPokemonChosen], enemyPokemon)
showOptions()
updateGraphics()

/**
 * Handles bag button click
 */
function handleBagButtonClick() {
    resetButtonListeners()
    showBackButton()
    let buttons = document.getElementById("battleOptionsGrid").children
    buttons[0].innerText = "Potions"
    buttons[1].innerText = "Pokeballs"
    buttons[2].innerText = ""
    buttons[3].innerText = ""
    buttons[0].addEventListener("click", handlePotionsButtonClick)
    buttons[1].addEventListener("click", handlePokeballsButtonClick)
}
/**
 * Handles poition button click
 */
function handlePotionsButtonClick() {
    resetButtonListeners()
    let buttons = document.getElementById("battleOptionsGrid").children
    buttons[0].innerText = "Potion (" + mannequin.inventory[5] + ")"
    buttons[0].addEventListener("click", handlePotionButtonClick)
    buttons[1].innerText = "Super Potion (" + mannequin.inventory[6] + ")"
    buttons[1].addEventListener("click", handleSuperPotionButtonClick)
    buttons[2].innerText = "Hyper Potion (" + mannequin.inventory[7] + ")"
    buttons[2].addEventListener("click", handleHyperPotionButtonClick)
    buttons[3].innerText = "Max Potion (" + mannequin.inventory[8] + ")"
    buttons[3].addEventListener("click", handleMaxPotionButtonClick)
}
/**
 * Handles click on individual potion items
 * @returns nothing (gets out of function)
 */
function handlePotionButtonClick() {
    if (mannequin.inventory[5] == 0) {
        alert("You have no Potions!")
        return
    }
    mannequin.inventory[5]--
    let healAmt = mannequin.pc[currentPokemonChosen].heal(potions.get("Potion").amountToHeal)
    let enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
    while (enemyMove == null) {
        enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
    }
    alert(`Healed ${mannequin.pc[currentPokemonChosen].name} for ${healAmt} HP!`)
    battle.turn("Heal", enemyMove)
    updateGraphics()
    resetButtonListeners()
    showOptions()
}

/**
 * Handles click on individual potion items
 * @returns nothing (gets out of function)
 */
function handleSuperPotionButtonClick() {
    if (mannequin.inventory[6] == 0) {
        alert("You have no Super Potions!")
        return
    }
    mannequin.inventory[6]--
    let healAmt = mannequin.pc[currentPokemonChosen].heal(potions.get("Super Potion").amountToHeal)
    let enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
    while (enemyMove == null) {
        enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
    }
    alert(`Healed ${mannequin.pc[currentPokemonChosen].name} for ${healAmt} HP!`)
    battle.turn("Heal", enemyMove)
    updateGraphics()
    resetButtonListeners()
    showOptions()
}

/**
 * Handles click on individual potion items
 * @returns nothing (gets out of function)
 */
function handleHyperPotionButtonClick() {
    if (mannequin.inventory[7] == 0) {
        alert("You have no Hyper Potions!")
        return
    }
    mannequin.inventory[7]--
    let healAmt = mannequin.pc[currentPokemonChosen].heal(potions.get("Hyper Potion").amountToHeal)
    let enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
    while (enemyMove == null) {
        enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
    }
    alert(`Healed ${mannequin.pc[currentPokemonChosen].name} for ${healAmt} HP!`)
    battle.turn("Heal", enemyMove)
    updateGraphics()
    resetButtonListeners()
    showOptions()
}
/**
 * Handles click on individual potion items
 * @returns nothing (gets out of function)
 */
function handleMaxPotionButtonClick() {
    if (mannequin.inventory[8] == 0) {
        alert("You have no Max Potions!")
        return
    }
    mannequin.inventory[8]--
    let healAmt = mannequin.pc[currentPokemonChosen].heal(potions.get("Hyper Potion").amountToHeal)
    let enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
    while (enemyMove == null) {
        enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
    }
    alert(`Healed ${mannequin.pc[currentPokemonChosen].name} for ${healAmt} HP!`)
    battle.turn("Heal", enemyMove)
    updateGraphics()
    resetButtonListeners()
    showOptions()
}

/**
 * makes pokeball buttons and adds onclick events
 */
function handlePokeballsButtonClick() {
    resetButtonListeners()
    let buttons = document.getElementById("battleOptionsGrid").children
    buttons[0].innerText = "Pokeball (" + mannequin.inventory[1] + ")"
    buttons[0].addEventListener("click", handlePokeballButtonClick)
    buttons[1].innerText = "Greatball (" + mannequin.inventory[2] + ")"
    buttons[1].addEventListener("click", handleGreatballButtonClick)
    buttons[2].innerText = "Ultraball (" + mannequin.inventory[3] + ")"
    buttons[2].addEventListener("click", handleUltraballButtonClick)
    buttons[3].innerText = "Masterball (" + mannequin.inventory[4] + ")"
    buttons[3].addEventListener("click", handleMasterballButtonClick)
}

/**
 * Handles click on individual pokeball buttons
 * @returns nothing (finishes function)
 */
function handlePokeballButtonClick() {
    if (mannequin.inventory[1] == 0) {
        alert("You have no Pokeballs!")
        return
    }
    mannequin.inventory[1]--
    if (enemyPokemon.catch(pokeballs.get("Pokeball"))) {
        for (let i = 1; i < mannequin.pc.length; i++) {
            if (mannequin.pc[i] == null) {
                mannequin.pc[i] = enemyPokemon
                gameOver(`You caught ${enemyPokemon.name}!`)
                return
            }
        }
        handlePcFull()
    } else {
        let enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
        while (enemyMove == null) {
            enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
        }
        alert(`${enemyPokemon.name} broke free!`)
        battle.turn("Catch", enemyMove)
    }
    updateGraphics()
    resetButtonListeners()
    showOptions()
}
/**
 * Handles click on individual pokeball buttons
 * @returns nothing (finishes function)
 */
function handleGreatballButtonClick() {
    if (mannequin.inventory[2] == 0) {
        alert("You have no Great Balls!")
        return
    }
    mannequin.inventory[2]--
    if (enemyPokemon.catch(pokeballs.get("Great Ball"))) {
        for (let i = 1; i < mannequin.pc.length; i++) {
            if (mannequin.pc[i] == null) {
                mannequin.pc[i] = enemyPokemon
                gameOver(`You caught ${enemyPokemon.name}!`)
                return
            }
        }
        handlePcFull()
    } else {
        let enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
        while (enemyMove == null) {
            enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
        }
        alert(`${enemyPokemon.name} broke free!`)
        battle.turn("Catch", enemyMove)
    }
    updateGraphics()
    resetButtonListeners()
    showOptions()
}
/**
 * Handles click on individual pokeball buttons
 * @returns nothing (finishes function)
 */
function handleUltraballButtonClick() {
    if (mannequin.inventory[3] == 0) {
        alert("You have no Pokeballs!")
        return
    }
    mannequin.inventory[3]--
    if (enemyPokemon.catch(pokeballs.get("Ultra Ball"))) {
        for (let i = 1; i < mannequin.pc.length; i++) {
            if (mannequin.pc[i] == null) {
                mannequin.pc[i] = enemyPokemon
                gameOver(`You caught ${enemyPokemon.name}!`)
                return
            }
        }
        handlePcFull()
    } else {
        let enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
        while (enemyMove == null) {
            enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
        }
        alert(`${enemyPokemon.name} broke free!`)
        battle.turn("Catch", enemyMove)
    }
    updateGraphics()
    resetButtonListeners()
    showOptions()
}
/**
 * Handles click on individual pokeball buttons
 * @returns nothing (finishes function)
 */
function handleMasterballButtonClick() {
    if (mannequin.inventory[4] == 0) {
        alert("You have no Pokeballs!")
        return
    }
    mannequin.inventory[4]--
    for (let i = 1; i < mannequin.pc.length; i++) {
        if (mannequin.pc[i] == null) {
            mannequin.pc[i] = enemyPokemon
            gameOver(`You caught ${enemyPokemon.name}!`)
            return
        }
    }
    updateGraphics()
    resetButtonListeners()
    showOptions()
}

/**
 * logic for what happens if Pc is full
 */
function handlePcFull() {
    resetButtonListeners()

    let buttons = document.getElementById("battleOptionsGrid").children
    document.getElementById("storyText").innerText = "Pick a Pokemon to release! (or press Back to release the wild Pokémon)"
    buttons[0].innerText = mannequin.pc[1].name
    buttons[0].addEventListener("click", handlePick(1))
    buttons[1].innerText = mannequin.pc[2].name
    buttons[0].addEventListener("click", handlePick(2))
    buttons[2].innerText = mannequin.pc[3].name
    buttons[0].addEventListener("click", handlePick(3))
    buttons[3].innerText = mannequin.pc[4].name
    buttons[0].addEventListener("click", handlePick(4))
}

/**
 * Logic for which pokemon to release if all pc slots are full
 * @param {int} index 
 */
function handlePick(index) {
    let temp = mannequin[index]
    mannequin[index] = enemyPokemon
    gameOver(`${temp.name} was released! Welcome, ${enemyPokemon.name}`)
}

/**
 * resets button listeners so we can have same button do diff things
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
 * Shows initial options
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
    button.innerText = "Home"
    hideBackButton()
}

/**
 * handles fight click
 */
function handleFightButtonClick() {
    resetButtonListeners()
    showBackButton()
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
                mannequin.pc[currentPokemonChosen] = turnResult.pokemon1
                enemyPokemon = turnResult.pokemon2
                updateGraphics()
                if (turnResult.winner == 0) {
                    resetButtonListeners()
                    showOptions()
                    return
                } else if (turnResult.winner == 1) {
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
}

/**
 * handles pokemon button and the Pc
 * @param {boolean} p2canmove 
 * @returns if the other pokemon can move
 */
function handlePokemonButtonClick(p2canmove = true) {
    if (!p2canmove) enemyPokemon.canMove = false
    showBackButton()
    let summativeHealth = 0
    for (let i = 1; i < mannequin.pc.length; i++) {
        if (mannequin.pc[i] == null) continue
        summativeHealth += mannequin.pc[i].currentStats.health
    }
    if (summativeHealth == 0) {
        for (let i = 1; i < mannequin.pc.length; i++) {
            if (mannequin.pc[i] == null) continue
            mannequin.pc[i].heal(Math.floor(mannequin.pc[i].currentStats.maxHealth / 2))
        }
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
                let enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
                while (enemyMove == null) {
                    enemyMove = enemyPokemon.moves[Math.floor(Math.random() * 4)]
                }
                let turnResult = battle.turn("Choose new", enemyMove)
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

/**
 * Run button
 */
function handleRunButtonClick() {
    gameOver("You ran away!")
}

/**
 * makes a form and submits it dynamically 
 * @param {string} path path to send get or post request to
 * @param {string} values Value of form
 * @param {string} names Name of forms
 * @param {string} method POST or GET
 */
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

/**
 * hides back button
 */
function hideBackButton() {
    document.getElementById("back").classList.add("hidden")
}

/**
 * Handles back button 
 */
function handleBackButtonClick() {
    resetButtonListeners()
    showOptions()
    let buttons = document.getElementsByTagName("button")
    for (let button of buttons) {
        button.classList.remove("hidden")
    }
    hideBackButton()
}

/**
 * Handles gameover logic
 * @param {string} message message for what happens when game is over
 */
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

/**
 * Updates graphics
 */
function updateGraphics() {
    document.getElementById("playerHealth").children[0].innerHTML = `${mannequin.pc[currentPokemonChosen].name} <span id="currentNumPlayerHealth"></span> / <span id="maxNumPlayerHealth"></span>`
    document.getElementById("storyText").innerText = `What will ${mannequin.pc[currentPokemonChosen].name} do?`
    document.getElementById("p1").src = `/assets/sprites/${mannequin.pc[currentPokemonChosen].backImg}`
    document.getElementById("maxNumPlayerHealth").innerText = mannequin.pc[currentPokemonChosen].currentStats.maxHealth
    document.getElementById("currentNumPlayerHealth").innerText = mannequin.pc[currentPokemonChosen].currentStats.health
    document.documentElement.style.setProperty("--player-health", (100 * mannequin.pc[currentPokemonChosen].currentStats.health / mannequin.pc[currentPokemonChosen].currentStats.maxHealth) + "%")
    document.documentElement.style.setProperty("--enemy-health", (100 * enemyPokemon.currentStats.health / enemyPokemon.currentStats.maxHealth) + "%")
}

//#region database
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

//#endregion