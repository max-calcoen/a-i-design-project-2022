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

export let users = new Map()
users.set("", new User("", "e")) // THIS IS TEST USER

app.get("/battle", (req, res) => {
    res.send("Error: send post request from index")
})

app.post("/openworld", (req, res) => {
    res.render("openworld")
})

app.post("/battle", (req, res) => {
    let userPokemon
    if(req.body.pokemon == undefined){
        userPokemon = "Zapdos"
    } else {
        userPokemon = req.body.pokemon
    }

    let enemyPokemon
    if (req.body.enemyName == undefined){
        enemyPokemon = "Zapdos"
    } else {
        enemyPokemon = req.body.enemyName
    }
    
    let loginUsername = req.body.loginUsername
    let loginPassword = req.body.loginPassword
    if (loginUsername != undefined || loginPassword != undefined) { // user is trying to log in
        // check login, using bcrypt.compare
        // if correct login: send to openworld, with login information stored in the post request
        // if not correct login: post back to "/" route with error message "Incorrect login information!"
    } else { // user is trying to create account
        // validate input: check if username less than or equal to 10 and more than 4 characters and if password is more than 5 and less than 15 characters
        // if invalid: post to "/" with error message "Please enter a valid username!" or "Please enter a valid password! Passwords must be longer than or equal to 5 characters and less than or equal to 15 characters."
        // check if username already exists
        // if so, post to "/" with error message "You already have an account associated with this username!"
        // if everything is fine so far, then start to add the User to the DB
        // add user to db: set username to given username, set password to hashed password
        // reroute to starterPokemon.pug

        // TODO: INSTEAD OF USERS MAP, USERS IS A CLASS THAT HAS ACCESSORS THAT FETCH FROM DB
        
    }

    let username = req.body.username
    let password = req.body.password
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
    res.render("index", {
        pokedex: pokedex
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

function hashPassword(password) {
    const SALT_ROUNDS = 5
    let returnHash = false
    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            returnHash = hash
        })
    })
    return returnHash
}

function comparePasswords(p1, p2) {
    return bcrypt.compare(p1, p2)
}