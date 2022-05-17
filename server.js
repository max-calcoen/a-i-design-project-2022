// import neccesary modules
import express from "express"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import initSqlJs from "sql.js"
import fs from "fs"
import { pokedex } from "./public/dex/pokedex.js"
import { createServer } from "http"
import { Database } from "./public/models/database.js"

// tunables for server setup
const SERVER_PORT = 8080
const PUBLIC_FILES_DIR = "public"

const SQL = await initSqlJs()
const app = express()
const server = createServer(app)
let database = new Database(fs, bcrypt, SQL)

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(express.static(PUBLIC_FILES_DIR))

// set up pug rendering engine
app.set("views", "views")
app.set("view engine", "pug")

server.listen(SERVER_PORT, function () {
    console.log(`Server listening on port ${SERVER_PORT}`)
})

app.get("/", (req, res) => {
    let errorMessage = req.query.errorMessage
    res.render("index", {
        errorMessage: errorMessage
    })
})


app.post("/openworld", (req, res) => {
    let userId = req.body.userId
    let pokemon = req.body.pokemon
    if (req.body.pokemon != undefined || req.body.pokemon != null) {
        database.insertNewPokemonIntoUserPC(userId, pokedex.getNewPokemon(pokemon))
    }
    res.render("openworld", {
        userId: userId
    })
})


app.post("/login", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let userId = -1
    for (let user of database.users) {
        if (user[1] == username) {
            userId = user[0]
        }
    }
    if (!(userId + 1)) {
        res.redirect("/?errorMessage=There are no registered users with this username")
        return
    }
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
    let userPokemon = database.getPcByUserId(userId)[1]

    if (req.body.enemyName != undefined) {
        enemyPokemon = req.body.enemyName
    } else {
        enemyPokemon = "Charmander"
    }
    if (!pokedex.has(userPokemon.name)) {
        res.redirect("/?errorMessage=Pokemon not found!")
        return
    }
    if (!database.users) {
        res.redirect("/?errorMessage=Please create an account or log in!")
        return
    }
    res.render("battle-interface", {
        userId: userId,
        enemyPokemon: pokedex.getNewPokemon(enemyPokemon),
        userPokemon: userPokemon
    })
})

app.post("/", (req, res) => {
    let errorMessage = req.query.errorMessage
    res.render("index", {
        pokedex: pokedex,
        errorMessage: errorMessage ? "Error: " + errorMessage : ""
    })
})

app.post("/getPcByUserId", (req, res) => {
    console.log(req.body)
    let userId = req.body.userId
    console.log("post  " + userId)
    let pc = database.getPcByUserId(userId)
    res.send(pc)
})

app.post("/updateInventoryByUserId", (req, res) => {
    let userId = req.body.userId
    let name = req.body.name
    let quantity = req.body.quantity
    if (database.updateInventoryByUserId(userId, name, quantity)) res.send(true)
    else res.send(false)

})

app.post("/getInvetoryByUserId", (req, res) => {
    let userId = req.body.userId
    let inv = database.getInventoryByUserId(userId)
    res.send(inv)
})

app.post("/insertNewPokemonIntoUserPc", (req, res) => {
    let userId = req.body.userId
    let pokemon = req.body.pokemon
    if (database.insertNewPokemonIntoUserPC(userId, pokemon)) res.send(true)
    else res.send(false)
})

app.post("/updatePokemonInUserPc", (req, res) => {
    let userId = req.body.userId
    let pokemon = req.body.pokemon
    let index = req.body.index
    database.updatePokemonInUserPc(userId, pokemon, index)
})

app.post("/getUserByUserId", (req, res) => {
    let userId = req.body.userId
    res.send(database.getUserByUserId(userId))
})

app.post("/writeToDisk", (req, res) => {
    database.writeToDisk()
    res.send(true)
})

app.post("/getUsers", (req, res) => {
    res.send(database.users)
})

app.post("/printUsers", (req, res) => {
    database.printUsers()
    res.send(true)
})

app.post("/printPcs", (req, res) => {
    database.printPcs()
    res.send(true)
})

app.post("/printInventories", (req, res) => {
    database.printInventories()
    res.send(true)
})

app.post("/printAll", (req, res) => {
    database.printAll()
    res.send(true)
})

app.post("/executeSelectSql", (req, res) => {
    let sqlstr = req.body.sqlstr
    database.executeSelectSql(sqlstr)
    res.send(true)
})

app.post("/executeSql", (req, res) => {
    let sqlstr = req.body.sqlstr
    database.executeSql(sqlstr)
    res.send(true)
})

app.get("/*", (req, res) => {
    res.redirect("/?errorMessage=Please create an account or log in!")
})