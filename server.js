// import neccesary modules
import express from "express"
import bodyParser from "body-parser"
import bcrypt from "bcryptjs"
import initSqlJs from "sql.js"
import fs from "fs"
import { pokedex } from "./public/dex/pokedex.js"
import { createServer } from "http"
import { Database } from "./public/models/database.js"

// tunables for server setup
const SERVER_PORT = 8080
const PUBLIC_FILES_DIR = "public"

const SQL = await initSqlJs()
let database = new Database(fs, bcrypt, SQL)
const app = express()
const server = createServer(app)

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(express.static(PUBLIC_FILES_DIR))

// set up pug rendering engine
app.set("views", "views")
app.set("view engine", "pug")

server.listen(SERVER_PORT, function () {
    console.log(`Server listening on port ${SERVER_PORT}`)
})

app.get("/", (req, res) => {
    let errorMessage = req.query.errorMessage
    res.render("index", {
        errorMessage: errorMessage
    })
})

app.post("/login", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let userId = -1
    if (!database.users) {
        res.redirect("/?errorMessage=There are no registered users in the database")
        return
    }
    for (let user of database.users) {
        if (user[1] == username) {
            userId = user[0]
        }
    }
    if (!(userId + 1)) {
        res.redirect("/?errorMessage=There are no registered users with this username")
        return
    }
    let hash = database.getUserByUserId(userId)[2]
    bcrypt.compare(password, hash, (err, result) => {
        if (result) {
            res.render("openworld", {
                userId: userId
            })
        } else {
            res.redirect("/?errorMessage=Incorrect username or password")
        }
    })
})

app.post("/createaccount", (req, res) => {

    let createAccountUsername = req.body.createAccountUsername
    let createAccountPassword = req.body.createAccountPassword
    if (!(createAccountUsername.length >= 4)) {
        res.redirect("/?errorMessage=Username must be greater than or equal to 4 characters")
        return
    }
    if (!(createAccountUsername.length <= 10)) {
        res.redirect("/?errorMessage=Username must be less than or equal to 10 characters")
        return
    }
    if (!(createAccountPassword.length >= 5)) {
        res.redirect("/?errorMessage=Password must be greater than or equal to 5 characters")
        return
    }
    if (!(createAccountPassword.length <= 15)) {
        res.redirect("/?errorMessage=Password must be less than or equal to 15 characters")
        return
    }
    for (let i = 0; i < database.users.length; i++) {
        if (database.users[i][1] == createAccountUsername) {
            res.redirect("/?errorMessage=There is already an account associated with this username")
            return
        }
    }
    let userId = database.createNewUser(createAccountUsername, createAccountPassword)
    res.render("starterpokemon", {
        userId: userId
    })
    return
})

app.post("/battle", (req, res) => {
    let enemyPokemon = req.body.enemyName
    let userId = req.body.userId
    res.render("battle-interface", {
        userId: userId,
        enemyPokemon: pokedex.getNewPokemon(enemyPokemon),
        userPokemon: JSON.parse(database.getPcByUserId(userId)[1])
    })
})

app.post("/openworld", (req, res) => {
    let userId = req.body.userId
    let pokemon = req.body.pokemon
    if (req.body.pokemon != undefined || req.body.pokemon != null) {
        database.insertNewPokemonIntoUserPC(userId, pokedex.getNewPokemon(pokemon))
    }
    res.render("openworld", {
        userId: userId
    })
})

//#region database fetch
app.post("/getPcByUserId", (req, res) => {
    let userId = req.body.userId
    let pc = database.getPcByUserId(userId)
    res.send(pc)
})

app.post("/updateInventoryByUserId", (req, res) => {
    let userId = req.body.userId
    let name = req.body.name
    let quantity = req.body.quantity
    database.updateInventoryByUserId(userId, name, quantity)
})

app.post("/addToInventoryByUserId", (req, res) => {
    let userId = req.body.userId
    let name = req.body.name
    let quantity = req.body.quantity
    res.send(database.addToInventoryByUserId(userId, name, quantity))
})

app.post("/getInventoryByUserId", (req, res) => {
    let userId = req.body.userId
    let inv = database.getInventoryByUserId(userId)
    res.send(inv)
})

app.post("/insertNewPokemonIntoUserPc", (req, res) => {
    let userId = req.body.userId
    let pokemon = req.body.pokemon
    if (database.insertNewPokemonIntoUserPC(userId, pokemon)) res.send(true)
    else res.send(false)
})

app.post("/updatePokemonInUserPc", (req, res) => {
    let userId = req.body.userId
    let pokemon = req.body.pokemon
    let index = req.body.index
    database.updatePokemonInUserPc(userId, pokemon, index)
})

app.post("/updatePcByUserId", (req, res) => {
    let userId = req.body.userId
    let newPc = req.body.newPc
    database.updatePcByUserId(userId, newPc)
})

app.post("/getUserByUserId", (req, res) => {
    let userId = req.body.userId
    res.send(database.getUserByUserId(userId))
})

app.post("/getUsers", (req, res) => {
    res.send(database.users)
})
//#endregion
// 404
app.get("*", (req, res) => {
    res.redirect("/?errorMessage=404: Page not found. You may have been logged out. Please create an account or log in.")
})