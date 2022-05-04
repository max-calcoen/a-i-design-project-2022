// import neccesary modules
import express from "express"
import bodyParser from "body-parser"
import { User } from "./public/models/user.js"
import { pokedex } from "./public/dex/pokedex.js"
import { createServer, Server } from "http"

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
    // res.render("battle-interface", {
    //     enemyPokemon: pokedex.get("Raichu"),
    //     userPokemon: pokedex.get("Turtwig"),
    // })
    res.send("post request from index")
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
app.get("/getPokedex", (req, res) => {
    res.send("yo!")
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