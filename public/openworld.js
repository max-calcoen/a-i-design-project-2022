import { pokedex } from "./dex/pokedex.js"
//Makes a zone on the tilemap 
// TODO: EVERETT: Later if needed
class makeZone {
    /**
     * @param {int} x Top left x coordinate of tile
     * @param {int} y Top left y coordinate of tile
     * @param {int} numTileWidth Number of tiles(width) that you want
     * @param {int} numTileHeight Number of tiles(height) that you want
     */
    constructor(x, y, numTileWidth, numTileHeight) {
        this.x = x
        this.y = y
        this.width = numTileWidth
        this.height = numTileHeight
    }
}


let sprite
let spriteArr = []
let tilemapRocks = []


const renderer = PIXI.autoDetectRenderer({
    antialias: true,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
    width: 1440,
    height: 672,
})
window.addEventListener('keydown', moveTilemap)
let stage
let tilemap
let frame = 0

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
    sprite = PIXI.Sprite.from('chest.png')
    stage.addChild(sprite)
    sprite.x = tileW / 2 * size
    sprite.y = tileH / 2 * size
    makePokemon();
}

let pokemonImgArr = []
for (let pokemon of pokedex.values()) {
    pokemonImgArr.push(["/assets/sprites/" + pokemon.frontImg, pokemon.name, pokemon.rarity])
}
let e = false
function makePokemon(){
    // TODO: add rarity, add spawns/despawns every x seconds, maybe make this a function so it can be called elsewhere
    // Putting pokemon randomly!
    for (let i = 0; i < tileW * 4; i++) {
        for (let j = 0; j < tileH * 4; j++) {
            let otherMath = Math.random() * 100
            if (otherMath > 99.7) {
                let rarityMath = Math.random() * 100
                let index = Math.floor(Math.random() * pokemonImgArr.length)
                if(rarityMath < pokemonImgArr[index][2]){
                    makeSprite(i * size, j * size, pokemonImgArr[index][0], pokemonImgArr[index][1])
                }
            }
        }
    }
    if(e == false){
        test()
        e = true;
    }
}

function test () {
    setTimeout( ()=> {
    delPokemon()
    makePokemon()
    test()
    }, 60000)
}

/**
 * Makes a sprite given an X, Y and an Image
 * image in the format of: '/assets/sprites/raichufront.png'
 */
function makeSprite(x, y, image, name) {
    let newSprite = PIXI.Sprite.from(image)
    stage.addChild(newSprite)
    newSprite.x = x
    newSprite.y = y
    newSprite.name = name
    spriteArr.push(newSprite)
}

function delPokemon(){
    for(let i = 0; i < spriteArr.length; i++){
        stage.removeChild(spriteArr[i])
    }
    spriteArr = [];
}


/**
 * Checks for sprite collisions
 * Returns true if there is a collision, false if not
 */
let pokeCollisionName = ""
function checkSpriteCollisions() {
    for (let i = 0; i < spriteArr.length; i++) {
        if (spriteArr[i].x < sprite.x + sprite.width &&
            spriteArr[i].x + spriteArr[i].width > sprite.x &&
            spriteArr[i].y < sprite.y + sprite.height &&
            spriteArr[i].height + spriteArr[i].y > sprite.y) {
            pokeCollisionName = spriteArr[i].name
            return true
        }
    }
    return false
}


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

// Takes an event and moves the canvas if it the key is one of the following: WASD
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
            alert("You found a " + pokeCollisionName + "!")
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
                alert("You found a " + pokeCollisionName + "!")
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
                alert("You found a " + pokeCollisionName + "!")
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
                alert("You found a " + pokeCollisionName + "!")
            }

        }
    }
    
}