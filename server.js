// import neccesary modules
import express from "express"
import bodyParser from "body-parser"
import { User } from "./public/models/user.js"
import { pokedex } from "./public/dex/pokedex.js"
import { createServer, Server } from "http"
import bcrypt from "bcrypt"

// tunables for server setup
const SERVER_PORT = 8080
const PUBLIC_FILES_DIR = "public"

const app = express()
const server = createServer(app)
const io = new Server(server)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(PUBLIC_FILES_DIR))

// set up pug rendering engine
app.set("views", "views")
app.set("view engine", "pug")

// tunables for encryption
const SALT_ROUNDS = 5


export let users = new Map()
users.set("", new User("", "e")) // THIS IS TEST USER

app.get("/battle", (req, res) => {
    res.send("Error: send post request from index")
})

app.post("/openworld", (req, res) => {
    res.render("openworld")
})

app.post("/login", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    if (!users.has(loginUsername)) {
        res.redirect(307, "/?errorMessage=There are no registered users with this username")
        return
    }
    let hash = users.get(loginUsername).password
    bcrypt.compare(loginPassword, hash, (err, result) => {
        if (result) {
            // if correct login: send to openworld, with login information stored in the post request
        } else {
            res.redirect("/?errorMessage=Incorrect username or password!")
        }
    })
})

app.post("/createAccount", (req, res) => {
    let createAccountUsername = req.body.createAccountUsername
    let createAccountPassword = req.body.createAccountPassword
    if (!createAccountUsername.length >= 4) {
        res.redirect("/?errorMessage=Username must be greater than or equal to 4 characters!")
        return
    }
    if (!createAccountUsername.length <= 10) {
        res.redirect("/?errorMessage=Username must be less than or equal to 15 characters!")
        return
    }
    if (!createAccountPassword.length >= 5) {
        res.redirect("/?errorMessage=Password must be greater than or equal to 5 characters!")
        return
    }
    if (!createAccountPassword.length <= 15) {
        res.redirect("/?errorMessage=Password must be less than or equal to 15 characters!")
        return
    }
    if (users.has(loginUsername)) {
        res.redirect("/?errorMessage=There is already an account associated with this username")
    }
    // start to add the User to the DB
    // add user to db: set username to given username, set password to hashed password
    // reroute to starterPokemon.pug

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

app.get("/", (req, res) => {
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