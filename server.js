// import neccesary modules
import express from "express"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import initSqlJs from "sql.js"
import fs from "fs"
import { User } from "./public/models/user.js"
import { pokedex } from "./public/dex/pokedex.js"
import { createServer, Server } from "http"
import { Database } from "./public/models/database.js"

// tunables for server setup
const SERVER_PORT = 8080
const PUBLIC_FILES_DIR = "public"

const app = express()
const server = createServer(app)
const io = new Server(server)

const SQL = await initSqlJs()
let db
let data
export let database

fs.access("./db.sqlite", fs.F_OK, (err) => {
    if (err) {
        db = new SQL.Database()
        database = new Database(db, fs, bcrypt)
        return
    }
    data = fs.readFileSync("./db.sqlite")
    db = new SQL.Database(data)
    database = new Database(db, fs, bcrypt)
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(PUBLIC_FILES_DIR))

// set up pug rendering engine
app.set("views", "views")
app.set("view engine", "pug")

export let users = new Map()
users.set("", new User("", "e")) // THIS IS TEST USER


/*

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



*/
app.get("/battle", (req, res) => {
    res.send("Error: send post request from index")
})

app.post("/openworld", (req, res) => {
    let userId = req.body.userId
    let pokemon = req.body.pokemon
    if (req.body.pokemon != undefined || req.body.pokemon != null) {
        database.insertPokemonIntoUserPC(userId, pokedex.getNewPokemon(pokemon))
        console.log(database.getPcByUserId(userId))
    }
    res.render("openworld", {
        userId: userId
    })
})


app.post("/login", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let userId
    console.log("DATABASE USERS: " + database.users)
    for (let user of database.users) {
        console.log(user)
        if (user[1] == username) {
            userId = user[0]
        }
    }
    if (!userId) {
        res.redirect(307, "/login?errorMessage=There are no registered users with this username") // Not working correctly
        return
    }
    console.log(userId)
    let hash = database.getUserByUserId(userId)[2]
    bcrypt.compare(password, hash, (err, result) => {
        if (result) {
            res.render("openworld", {
                userId: userId
            })
        } else {
            res.redirect("/?errorMessage=Incorrect username or password!")
        }
    })
})

app.post("/createaccount", (req, res) => {

    let createAccountUsername = req.body.createAccountUsername
    let createAccountPassword = req.body.createAccountPassword
    if (createAccountUsername.length <= 4) {
        res.redirect("/?errorMessage=Username must be greater than or equal to 4 characters!")
        return
    }
    if (createAccountUsername.length >= 10) {
        res.redirect("/?errorMessage=Username must be less than or equal to 10 characters!")
        return
    }
    if (createAccountPassword.length <= 5) {
        res.redirect("/?errorMessage=Password must be greater than or equal to 5 characters!")
        return
    }
    if (createAccountPassword.length >= 15) {
        res.redirect("/?errorMessage=Password must be less than or equal to 15 characters!")
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
    let enemyPokemon
    let userId = req.body.userId
    console.log(userId)
    let userPokemon = JSON.parse(database.getPcByUserId(userId)[1]).name
    console.log(userPokemon)

    if (req.body.enemyName != undefined) {
        enemyPokemon = req.body.enemyName
    } else {
        enemyPokemon = "Charmander"
    }
    if (!pokedex.has(userPokemon)) {
        res.send("Pokemon Not Found!")
        return
    }

    for (let user of users.values()) {
        if (true || user.username == username && user.password == password) {
            users.get(user.username).pc[0] = pokedex.getNewPokemon(userPokemon)
            res.render("battle-interface", {
                user: user,
                userId: userId,
                enemyPokemon: pokedex.getNewPokemon(enemyPokemon),
                userPokemon: pokedex.getNewPokemon(userPokemon)
            })
            return
        }
    }
    res.send("Wrong username or password! D:")
})

app.post("/", (req, res) => {
    let errorMessage = req.query.errorMessage
    res.render("index", {
        pokedex: pokedex,
        errorMessage: errorMessage ? "Error: " + errorMessage : ""
    })
})
server.listen(SERVER_PORT, function () {
    console.log(`Server listening on port ${SERVER_PORT}`)
})

io.on("connection", (socket) => {
    socket.on("connect", (arg) => {
        console.log("user connected :)")
    })
    socket.on("disconnect", (arg) => {
        console.log("user disconnected :(")
    })
})