// import neccesary modules
import { createServer, Server } from "http"
import express from "express"

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
        enemyPokemon: {
            name: "Raichu"
        },
        userPokemon: {
            name: "Turtwig",
            nick: "Turtwig"
        }
    })
})

app.get("/bag", (req, res) => {
    res.render("bag-GUI", {
        bagAlert: {
            pokeballs: 0,
            greatballs: 0,
            ultraballs: 0,
            masterballs: 0,
            regRevive: 0,
            maxRevive: 0,
            potion: 0,
            superPotion: 0,
            hyperPotion: 0,
            maxPotion: 0
        }
    })
})

app.get("/hello", (req, res) => {
    let name = req.query.name
    if (!users.includes(name)) {
        users.push(name)
        res.render("hello", {
            greeting: "Hello, ",
            name
        })
    } else {
        res.render("hello", {
            greeting: "Welcome back, ",
            name
        })
    }
})

io.on("connection", (socket) => {
    socket.on("connect", (arg) => {
        console.log("user connected :)")
    })
    socket.on("disconnect", (arg) => {
        console.log("user disconnected :(")
    })
})

server.listen(SERVER_PORT, function () {
    console.log(`Server listening on port ${SERVER_PORT}`)
})
