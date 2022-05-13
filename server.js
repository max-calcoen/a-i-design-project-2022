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

export let users = new Map()


app.get("/battle", (req, res) => {
    res.send("Error: send post request from index")
})


app.post("/battle", (req, res) => {
    

    let userPokemon
    if(req.body.pokemon == undefined){
        userPokemon = "Zapdos"
    } else {
        userPokemon = req.body.pokemon
    }


    let enemyPokemon
    if(req.body.enemyName == undefined){
        enemyPokemon = "Zapdos"
    } else {
        enemyPokemon = req.body.enemyName
    }


    let username = req.body.username
    let password = req.body.password
    if (!pokedex.has(userPokemon)) {
        console.log(userPokemon + enemyPokemon)
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