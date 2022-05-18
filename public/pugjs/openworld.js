import { pokedex } from "../dex/pokedex.js"
import { pokeballs } from "../dex/items/pokeballs.js"
import { potions } from "../dex/items/potions.js"

let sprite
let spriteArr = []
let tilemapRocks = []
let stage
let tilemap
// Variable so setTimeout wont bug
let setBug = false
// tunable spawn cooldown time in ms
const SPAWN_COOLDOWN = 60000
let frame = 0



const renderer = PIXI.autoDetectRenderer({
    antialias: true,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
    width: 1400,
    height: 680,
})
window.addEventListener('keydown', moveTilemap)


document.body.appendChild(renderer.view)

const loader = new PIXI.Loader()

loader.add('atlas', '/assets/tilemap/atlas.json')

const resources = loader.resources
const size = 32

// calculate the dimensions of the tilemap to build
const pxW = renderer.screen.width
const pxH = renderer.screen.height
const tileW = pxW / size
const tileH = pxH / size


loader.load((_, resources) => {
    // Setup tilemap scene
    stage = new PIXI.Container()
    tilemap = new PIXI.tilemap.CompositeTilemap()
    stage.addChild(tilemap)

    // Setup rendering loop
    PIXI.Ticker.shared.add(() => renderer.render(stage))
    makeTilemap()
})

/**
 * Puts grass and rocks everywhere
 */
function makeTilemap() {

    // clear the tilemap, in case it is being reused.
    tilemap.clear()
    // fill the scene with grass and sparse rocks 
    for (let i = 0; i < tileW * 4; i++) {
        for (let j = 0; j < tileH * 4; j++) {
            let math = Math.random() * 100
            if (math < 95) {
                tilemap.tile(
                    'grass.png',
                    i * size,
                    j * size,
                )
            } else {
                tilemap.tile(
                    'tough.png',
                    i * size,
                    j * size,
                )
                let rockCoords = {
                    x: i * size,
                    y: j * size,
                    width: size,
                    height: size
                }
                tilemapRocks.push(rockCoords)
            }


        }
    }

    // make Sprite tile
    sprite = PIXI.Sprite.from("../assets/tilemap/player.png")
    stage.addChild(sprite)
    sprite.x = tileW / 2 * size
    sprite.y = tileH / 2 * size
    makePokemon()
}

// Define array for the pokemon images and information
let pokemonImgArr = []

// Goes through pokedex and adds everything to the pokemon image array
for (let pokemon of pokedex.values()) {
    pokemonImgArr.push(["/assets/sprites/" + pokemon.frontImg, pokemon.name, pokemon.rarity])
}

let itemImgArr = []

for (let item of potions.values()) {
    itemImgArr.push(["/assets/sprites/" + item.img, item.name, item.rarity])
}

for (let item of pokeballs.values()) {
    itemImgArr.push(["/assets/sprites/" + item.img, item.name, item.rarity])
}

/**
 * Puts pokemon randomly on the tilemap
 */
function makePokemon() {
    // Going through tilemap
    for (let i = 0; i < tileW * 4; i++) {
        for (let j = 0; j < tileH * 4; j++) {
            // Math.random
            let otherMath = Math.random() * 100
            // 0.03% chance for a pokemon to be on any tile
            if (otherMath > 99.7) {
                // More random
                let rarityMath = Math.random() * 100
                // Random index for pokemonImgArr
                let index = Math.floor(Math.random() * pokemonImgArr.length)
                // Does rarity for any given pokemon
                if (rarityMath < pokemonImgArr[index][2]) {
                    makeSprite(i * size, j * size, pokemonImgArr[index][0], pokemonImgArr[index][1])
                }
            }
            let spawnItemRand = Math.random() * 100
            if (spawnItemRand > 99.6) {
                let index = Math.floor(Math.random() * itemImgArr.length)
                let rarityRand = Math.random() * 100
                if (rarityRand < itemImgArr[index][2]) {
                    makeSprite(i * size, j * size, itemImgArr[index][0], itemImgArr[index][1])
                }
            }
        }
    }
    if (setBug == false) {
        spawnPokemon()
        setBug = true;
    }
}

/**
 * setTimeout recursive function for spawning and despawning pokemon once a minute
 */
function spawnPokemon() {
    setTimeout(() => {
        delPokemon()
        makePokemon()
        spawnPokemon()
    }, SPAWN_COOLDOWN)
}


/**
 * Makes a sprite given an X, Y, Image, and a name
 * @param {int} x x corrdinate of sprite
 * @param {int} y y coordinate of sprite
 * @param {string} image image in the format of: '/assets/sprites/raichufront.png'
 * @param {string} name name of pokemon
 */
function makeSprite(x, y, image, name) {
    let newSprite = PIXI.Sprite.from(image)
    stage.addChild(newSprite)
    newSprite.x = x
    newSprite.y = y
    newSprite.width = 48
    newSprite.height = 48
    newSprite.name = name
    spriteArr.push(newSprite)
}

/**
 * Deletes pokemon sprites on tilemap
 */
function delPokemon() {
    for (let i = 0; i < spriteArr.length; i++) {
        stage.removeChild(spriteArr[i])
    }
    spriteArr = []
}

let itemCollisionObj
let pokeCollisionName = ""
/**
 * Checks for sprite collisions
 * @returns true if there is a collision, false if not
 */
function checkSpriteCollisions() {
    for (let i = 0; i < spriteArr.length; i++) {
        if (spriteArr[i].x < sprite.x + sprite.width &&
            spriteArr[i].x + spriteArr[i].width > sprite.x &&
            spriteArr[i].y < sprite.y + sprite.height &&
            spriteArr[i].height + spriteArr[i].y > sprite.y) {
            itemCollisionObj = spriteArr[i]
            pokeCollisionName = spriteArr[i].name
            return true
        }
    }
    return false
}

/**
 * Checks for collisons between user and tilemap
 * @returns True if you collide with a certain tile, fasle if not
 */
function checkTilemapCollisions() {
    for (let i = 0; i < tilemapRocks.length; i++) {
        if (tilemapRocks[i].x < sprite.x + sprite.width &&
            tilemapRocks[i].x + tilemapRocks[i].width > sprite.x &&
            tilemapRocks[i].y < sprite.y + sprite.height &&
            tilemapRocks[i].height + tilemapRocks[i].y > sprite.y) {
            return true
        }
    }
    return false
}
//Add event listener to keydown
window.addEventListener('keydown', moveTilemap)

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
 * Takes a keydown event and moves the canvas if it the key is one of the following: W, A, S or D
 * @param {evt} evt keydown event object
 */
function moveTilemap(evt) {
    if (evt.which === 68) {
        if (tilemap.x > -5008)
            tilemap.x -= 16
        for (let i = 0; i < spriteArr.length; i++) {
            spriteArr[i].x -= 16
        }
        for (let i = 0; i < tilemapRocks.length; i++) {
            tilemapRocks[i].x -= 16
        }
        if (checkTilemapCollisions()) {
            for (let i = 0; i < tilemapRocks.length; i++) {
                tilemapRocks[i].x += 16
            }
            tilemap.x += 16
            for (let i = 0; i < spriteArr.length; i++) {
                spriteArr[i].x += 16
            }
        }
        if (checkSpriteCollisions()) {
            for (let i = 0; i < tilemapRocks.length; i++) {
                tilemapRocks[i].x += 16
            }
            tilemap.x += 16
            for (let i = 0; i < spriteArr.length; i++) {
                spriteArr[i].x += 16
            }

            if (pokedex.has(pokeCollisionName)) {
                sendData("/battle", [pokeCollisionName, userId], ["enemyName", "userId"], "POST")
            } else {
                stage.removeChild(itemImgArr.indexOf(itemCollisionObj))
                spriteArr.splice(itemImgArr.indexOf(itemCollisionObj), 1)
                addToInventoryByUserId(userId, pokeCollisionName.toLowerCase().replace(" ", "") + "Count", 1)
            }
        }
    }
    if (evt.which === 65) {
        if (sprite.x > tilemap.x) {
            tilemap.x += 16
            for (let i = 0; i < spriteArr.length; i++) {
                spriteArr[i].x += 16
            }
            for (let i = 0; i < tilemapRocks.length; i++) {
                tilemapRocks[i].x += 16
            }
            if (checkTilemapCollisions()) {
                for (let i = 0; i < tilemapRocks.length; i++) {
                    tilemapRocks[i].x -= 16
                }
                tilemap.x -= 16
                for (let i = 0; i < spriteArr.length; i++) {
                    spriteArr[i].x -= 16
                }
            }
            if (checkSpriteCollisions()) {
                for (let i = 0; i < tilemapRocks.length; i++) {
                    tilemapRocks[i].x -= 16
                }
                tilemap.x -= 16
                for (let i = 0; i < spriteArr.length; i++) {
                    spriteArr[i].x -= 16
                }
                if (pokedex.has(pokeCollisionName)) {
                    sendData("/battle", [pokeCollisionName, userId], ["enemyName", "userId"], "POST")
                } else {
                    stage.removeChild(itemImgArr.indexOf(itemCollisionObj))
                    spriteArr.splice(itemImgArr.indexOf(itemCollisionObj), 1)
                    addToInventoryByUserId(userId, pokeCollisionName.toLowerCase().replace(" ", "") + "Count", 1)
                }
            }

        }
    }
    if (evt.which === 87) {
        if (tilemap.y < sprite.y) {
            tilemap.y += 16
            for (let i = 0; i < spriteArr.length; i++) {
                spriteArr[i].y += 16
            }
            for (let i = 0; i < tilemapRocks.length; i++) {
                tilemapRocks[i].y += 16
            }
            if (checkTilemapCollisions()) {
                for (let i = 0; i < tilemapRocks.length; i++) {
                    tilemapRocks[i].y -= 16
                }
                tilemap.y -= 16
                for (let i = 0; i < spriteArr.length; i++) {
                    spriteArr[i].y -= 16
                }
            }
            if (checkSpriteCollisions()) {
                for (let i = 0; i < tilemapRocks.length; i++) {
                    tilemapRocks[i].y -= 16
                }
                tilemap.y -= 16
                for (let i = 0; i < spriteArr.length; i++) {
                    spriteArr[i].y -= 16
                }
                if (pokedex.has(pokeCollisionName)) {
                    sendData("/battle", [pokeCollisionName, userId], ["enemyName", "userId"], "POST")
                } else {
                    stage.removeChild(itemImgArr.indexOf(itemCollisionObj))
                    spriteArr.splice(itemImgArr.indexOf(itemCollisionObj), 1)
                    addToInventoryByUserId(userId, pokeCollisionName.toLowerCase().replace(" ", "") + "Count", 1)
                }
            }

        }
    }
    if (evt.which === 83) {
        if (tilemap.y > -2320) {
            tilemap.y -= 16
            for (let i = 0; i < spriteArr.length; i++) {
                spriteArr[i].y -= 16
            }
            for (let i = 0; i < tilemapRocks.length; i++) {
                tilemapRocks[i].y -= 16
            }
            if (checkTilemapCollisions()) {
                for (let i = 0; i < tilemapRocks.length; i++) {
                    tilemapRocks[i].y += 16
                }
                tilemap.y += 16;
                for (let i = 0; i < spriteArr.length; i++) {
                    spriteArr[i].y += 16
                }
            }
            if (checkSpriteCollisions()) {
                for (let i = 0; i < tilemapRocks.length; i++) {
                    tilemapRocks[i].y += 16
                }
                tilemap.y += 16;
                for (let i = 0; i < spriteArr.length; i++) {
                    spriteArr[i].y += 16
                }
                if (pokedex.has(pokeCollisionName)) {
                    sendData("/battle", [pokeCollisionName, userId], ["enemyName", "userId"], "POST")
                } else {
                    stage.removeChild(itemImgArr.indexOf(itemCollisionObj))
                    spriteArr.splice(itemImgArr.indexOf(itemCollisionObj), 1)
                    addToInventoryByUserId(userId, pokeCollisionName.toLowerCase().replace(" ", "") + "Count", 1)
                }
            }
        }
    }
}

/**
 * Adds a item object to the users inventory
 * @param {*} userId userId of current player
 * @param {*} name name of the item object
 * @param {*} quantity how many to add
 * @returns 
 */
async function addToInventoryByUserId(userId, name, quantity) {
    let response = await fetch("/addToInventoryByUserId", {
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