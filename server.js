// import neccesary modules
import { createServer, Server } from "http"
import { User } from "./public/models/user.js"
import express from "express"
import { pokedex } from "./public/dex/pokedex.js"
import bodyParser from "body-parser"
// ben

// check discord, can u fix smthn rq
// i think it has to do with the {}'s somewhere
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

export let users = new Map([["e", new User("e", "e")]])


app.get("/battle", (req, res) => {
    res.render("battle-interface", {
        enemyPokemon: pokedex.get("Raichu"),
        userPokemon: pokedex.get("Turtwig"),
    })
})

app.post("/battle", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let userPokemon = req.body.pokemon
    if (!pokedex.has(userPokemon)) {
        res.send("Pokemon not found!")
        return
    }
    for (let user of users.values()) {
        if (true || user.username == username && user.password == password) {
            users.get(user.username).pc[0] = pokedex.get(userPokemon)
            console.log(user.pc)
            res.render("battle-interface", {
                user: user,
                enemyPokemon: pokedex.get("Raichu"),
                userPokemon: pokedex.get(userPokemon)
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