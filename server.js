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

app.get("/battle", (req, res) => {
    res.send("Error: send post request from index")
})

app.post("/openworld", (req, res) => {
    res.render("openworld")
})



let loginPassword
app.post("/login", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let userid
    for (let user of database.users) {
        if (user[1] == username) {
            userid = user[0]
            break
        }
        res.redirect(307, "/login?errorMessage=There are no registered users with this username")
        return
    }
    let hash = database.getUserById(userid)[2]

    // let hash = database.users.get(username).password
    bcrypt.compare(password, hash, (err, result) => {
        if (result) {
            res.redirect(307, "/openworld")
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
    for (let user of database.users) {
        if (user[1] == createAccountUsername) {
            res.redirect("/?errorMessage=There is already an account associated with this username")
            return
        }
    }
    database.createNewUser(createAccountUsername, createAccountPassword)
    res.render("starterpokemon")
    return
})

app.post("/battle", (req, res) => {
    let userPokemon = req.body.pokemon ? req.body.pokemon : "Zapdos"

    let enemyPokemon = "Zapdos"
    if (req.body.enemyName != undefined) {
        enemyPokemon = req.body.enemyName
    }
    if (!pokedex.has(userPokemon)) {
        res.send("Pokemon not found!")
        return
    }
    for (let user of users.values()) {
        if (true || user.username == username && user.password == password) {
            users.get(user.username).pc[0] = pokedex.getNewPokemon(userPokemon)
            res.render("battle-interface", {
                user: user,
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