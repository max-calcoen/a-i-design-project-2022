export class Database {
    #db
    #idCount = 0
    #fs
    #bcrypt
    constructor(db, fs, bcrypt) {
        this.#db = db
        this.#fs = fs
        this.#bcrypt = bcrypt
        let sqlstr = "CREATE TABLE IF NOT EXISTS users(`id` int, `username` varchar(15), `password` char(60), `inventoryid` int, `pcid` int);\
CREATE TABLE IF NOT EXISTS inventory(`id` int, `pokeballCount` int, `greatballCount` int, `ultraballCount` int, `potionsCount` int, `superpotionsCount` int, `hyperpotionsCount` int, `maxpotionsCount` int);\
CREATE TABLE IF NOT EXISTS pc(`id` int, `pokemon1` nvarchar(4000), `pokemon2` nvarchar(4000), `pokemon3` nvarchar(4000), `pokemon4` nvarchar(4000));"
        this.#db.run(sqlstr)
        sqlstr = "SELECT MAX(id) FROM users"
        let result = db.exec(sqlstr)
        if (result[0].values[0][0] == null) {
            this.#idCount = 0
        } else {
            this.#idCount = result[0].values[0][0] + 1
        }
        this.getPcByUsername("Max")
        this.printUsers()
        this.writeToDisk()
    }

    getPcByUsername(username) {
        let sqlstr = "SELECT `pcid` FROM `users` WHERE `username`='" + username + "';"
        let result = this.#db.exec(sqlstr)
        if (result.length == 0) {
            return false
        }
        result = this.#db.exec(sqlstr)[0].values[0][0]
        sqlstr = "SELECT * FROM `pc` WHERE `id`=" + result + ";"
        result = this.#db.exec(sqlstr)[0].values
        result.shift()
        console.log(result)
    }

    createNewUser(username, password) {
        // tunable for encryption
        const SALT_ROUNDS = 5
        this.#bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
            password = hash
            let sqlstr = "INSERT INTO users(`id`, `username`, `password`, `inventoryid`, `pcid`) VALUES(" + this.#idCount + ", '" + username + "', '" + password + "', " + this.#idCount + ", " + this.#idCount + ");\
            INSERT INTO inventory(`id`, `pokeballCount`, `greatballCount`, `ultraballCount`, `potionsCount`, `superpotionsCount`, `hyperpotionsCount`, `maxpotionsCount`) VALUES(" + this.#idCount + ", 0, 0, 0, 0, 0, 0, 0);\
            INSERT INTO pc(`id`, `pokemon1`, `pokemon2`, `pokemon3`, `pokemon4`) VALUES(" + this.#idCount + ", null, null, null, null);"
            this.#db.run(sqlstr)
            this.writeToDisk()
            this.#idCount++
        })
    }

    insertIntoUserPC(userId, pokemon) {
        let sqlstr = "SELECT `pcid` FROM `users` WHERE `id`=" + userId + ";"
        let pcid = this.#db.exec(sqlstr)[0].values[0][0]
        sqlstr = ""
    }

    getUserById(userId) {
        let sqlstr = "SELECT * FROM `users` WHERE `id`='" + userId + "'"
        let result = this.#db.exec(sqlstr)
        return result[0].values[0]
    }

    printUsers() {
        let sqlstr = "SELECT * FROM `users`"
        let result = this.#db.exec(sqlstr)
        console.dir(result, { depth: null })
    }

    printPc() {
        let sqlstr = "SELECT * FROM `pc`"
        let result = this.#db.exec(sqlstr)
        console.dir(result, { depth: null })
    }

    printInventory() {
        let sqlstr = "SELECT * FROM `inventory`"
        let result = this.#db.exec(sqlstr)
        console.dir(result, { depth: null })
    }

    writeToDisk() {
        let data = this.#db.export()
        let buffer = Buffer.from(data)
        this.#fs.writeFileSync("./db.sqlite", buffer)
    }

    resetUserTable() {
        let sqlstr = "DELETE FROM users;"
        this.#db.run(sqlstr)
        this.writeToDisk()
    }

    get users() {
        let sqlstr = "SELECT * FROM users;"
        let result = this.#db.exec(sqlstr)
        if (result.length == 0) {
            return false
        }
        return result[0].values
    }
}
