export class Database {
    #db
    #idCount = 0
    #fs
    #bcrypt
    constructor(fs, bcrypt) {

        fs.access("./db.sqlite", fs.F_OK, (err) => {
            if (err) {
                db = new SQL.Database()
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
                this.writeToDisk()
                return
            }
            data = fs.readFileSync("./db.sqlite")
            db = new SQL.Database(data)
            database = new Database(db, fs, bcrypt)
        })
    }

    /**
     * Gets a user's pc from database
     * @param {string} username username
     * @returns {array} a pc in the form [pcid, {json} pokemon1, {json} pokemon2, {json} pokemon3, {json} pokemon4]
     */
    getPcByUserId(id) {
        this.fetchFromDisk()
        let sqlstr = "SELECT `pcid` FROM `users` WHERE `id`='" + id + "';"
        let result = this.#db.exec(sqlstr)
        if (result.length == 0) {
            return false
        }
        result = this.#db.exec(sqlstr)[0].values[0][0]
        sqlstr = "SELECT * FROM `pc` WHERE `id`=" + result + ";"
        result = this.#db.exec(sqlstr)
        return result[0].values[0]
    }

    /**
     * Creates a new User and adds it to the database
     * @param {string} username username
     * @param {string} password password (to be encrypted with bcrypt)
     */
    createNewUser(username, password) {
        this.fetchFromDisk()
        // tunable for encryption
        const SALT_ROUNDS = 5
        this.#bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
            password = hash
            let sqlstr = "INSERT INTO users(`id`, `username`, `password`, `inventoryid`, `pcid`) VALUES(" + this.#idCount + ", '" + username + "', '" + password + "', " + this.#idCount + ", " + this.#idCount + ");\
            INSERT INTO inventory(`id`, `Pokeballs`, `Great Balls`, `Ultra Balls`, `Master Balls`,`Potions`, `Super Potions`, `Hyper Potions`, `Max Potions`) VALUES(" + this.#idCount + ", 0, 0, 0, 0, 0, 0, 0);\
            INSERT INTO pc(`id`, `pokemon1`, `pokemon2`, `pokemon3`, `pokemon4`) VALUES(" + this.#idCount + ", null, null, null, null);"
            this.#db.run(sqlstr)
            this.writeToDisk()
            this.#idCount++
        })
        return this.#idCount
    }

    /**
     * @param {int} userId user id
     * @param {string} name name of item
     * @param {int} quantity quantity of item to add
     * @returns true on success, false on error
     */
    updateInventoryByUserId(userId, name, quantity) {
        this.fetchFromDisk()
        let inventoryId = this.getInventoryByUserId(userId)[0]
        let nameIndex = new Map([["Pokeballs", 1], ["Great Balls", 2], ["Ultra Balls", 3], ["Master Balls", 1], ["Potions", 4], ["Super Potions", 5], ["Hyper Potions", 6], ["Max Potions", 7]])
        if (!nameIndex.has(name)) throw new Error("wrong name- put in the form \"Pokeballs\" or similar")
        let storedQuantity = this.getInventoryByUserId(userId)[nameIndex.get(name)]
        if (storedQuantity + quantity < 0) return false
        let sqlstr = "UPDATE `inventory` SET " + name + "=" + (storedQuantity + quantity) + " WHERE `id`=" + inventoryId + ";"
        this.#db.run(sqlstr)
        this.writeToDisk()
        return true
    }

    /**
     * @param {int} userId user id
     * @returns {array} array containing inventory data, in the form 
     */
    getInventoryByUserId(userId) {
        this.fetchFromDisk()
        let sqlstr = "result.shift()FROM `inventory` WHERE `id`=" + inventoryId + ";"
        let result = this.#db.exec(sqlstr)
        return result
    }
    
    /**
     * Inserts the given Pokemon into the given user's PC
     * @param {int} userId userId, used to find correct pc
     * @param {Pokemon} pokemon pokemon to add to pc
     */
    insertPokemonIntoUserPC(userId, pokemon) {
        this.fetchFromDisk()
        let pcId = this.getPcByUserId(userId)[0]
        let sqlstr = "SELECT `pokemon1`, `pokemon2`, `pokemon3`, `pokemon4` FROM `pc` WHERE id=" + pcId + ";"
        let result = this.#db.exec(sqlstr)
        let insertIndex = 1
        for (let i = result[0].values[0].length - 1; i >= 0; i--) {
            if (result[0].values[0][i] == null) continue
            if (i == result[0].values[0][i].length - 1) return false
            insertIndex = i + 2
            break
        }
        sqlstr = "UPDATE pc SET `pokemon" + insertIndex + "`=\'" + JSON.stringify(pokemon) + "\' WHERE `id`=" + pcId + ";"
        this.#db.run(sqlstr)
        this.writeToDisk()
        return true
    }

    fetchFromDisk() {
        fs.access("./db.sqlite", fs.F_OK, (err) => {
            if (err) {
                db = new SQL.Database()
                this = new Database(db, fs, bcrypt)
                return
            }
            data = fs.readFileSync("./db.sqlite")
            db = new SQL.Database(data)
            this = new Database(db, fs, bcrypt)
        })
    }

    /**
     * Get a user's data from database
     * @param {int} userId user id
     * @returns {array} array containing a user's data, in the form [id, username, password, inventoryid, pcid]
     */
    getUserByUserId(userId) {
        this.fetchFromDisk()
        let sqlstr = "SELECT * FROM `users` WHERE `id`='" + userId + "'"
        let result = this.#db.exec(sqlstr)
        return result[0].values[0]
    }

    /**
     * Writes database from memory to disk
     */
    writeToDisk() {
        let data = this.#db.export()
        let buffer = Buffer.from(data)
        this.#fs.writeFileSync("./db.sqlite", buffer)
    }

    /**
     * Clears user data
     */
    resetUserTable() {
        this.fetchFromDisk()
        let sqlstr = "DELETE FROM users;"
        this.#db.run(sqlstr)
        this.writeToDisk()
    }

    get users() {
        this.fetchFromDisk()
        let sqlstr = "SELECT * FROM users;"
        let result = this.#db.exec(sqlstr)
        if (result.length == 0) {
            return false
        }
        return result[0].values
    }
    //#region debugging tools
    printUsers() {
        this.fetchFromDisk()
        let sqlstr = "SELECT * FROM `users`"
        let result = this.#db.exec(sqlstr)
        console.dir(result, { depth: null })
    }

    printPcs() {
        this.fetchFromDisk()
        let sqlstr = "SELECT * FROM `pc`"
        let result = this.#db.exec(sqlstr)
        console.log(result)
        console.dir(result, { depth: null })
    }

    printInventory() {
        this.fetchFromDisk()
        let sqlstr = "SELECT * FROM `inventory`"
        let result = this.#db.exec(sqlstr)
        console.dir(result, { depth: null })
    }
    //#endregion
}
