// import neccesary modules
import { createServer, Server } from "http"
import express from "express"
import { pokedex } from "./public/dex/pokedex.js"
export let allUsers = []

// tunables for server setup
const SERVER_PORT = 8080
const PUBLIC_FILES_DIR = 'public'

const app = express()
const server = createServer(app)
const io = new Server(server)
app.use(express.static(PUBLIC_FILES_DIR))

// set up pug rendering engine
app.set('views', 'views')
app.set('view engine', 'pug')

let users = []

app.get("/battle", (req, res) => {
    res.render("battle-interface", {
        enemyPokemon: pokedex.get("Raichu"),
        userPokemon: pokedex.get("Turtwig"),

    })
})

app.post("/battle", (req, res) => {
    let chosenPokemon = req.body.pokemon
    res.render("battle-interface", {
        enemyPokemon: pokedex.get("Raichu"),
        userPokemon: chosenPokemon
    })
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