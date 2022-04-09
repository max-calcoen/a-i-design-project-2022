// Import neccesary modules
import { createServer, Server } from "http"
import express from "express"
import { join } from "path"

// Tunables for server setup
const SERVER_PORT = 3000
const PUBLIC_FILES_DIR = 'public'

const app = express()
const server = createServer(app)
const io = new Server(server)
app.use(express.static(PUBLIC_FILES_DIR))

// Setup Pug rendering engine
app.set('views', 'views')
app.set('view engine', 'pug')

let users = []

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"))
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
