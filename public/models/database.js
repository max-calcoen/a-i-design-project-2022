export class Database {
    #db
    #idCount = 0
    #fs
    #bcrypt
    #SQL
    constructor(fs, bcrypt, SQL) {
        this.#fs = fs
        this.#bcrypt = bcrypt
        this.#SQL = SQL
        this.#fs.access("./db.sqlite", fs.F_OK, (err) => {
            if (err) {
                let db = new this.#SQL.Database()
                this.#db = db
                this.#init()
                this.#idCount = 0
                this.writeToDisk()
                return
            }
            let data = this.#fs.readFileSync("./db.sqlite")
            let db = new this.#SQL.Database(data)
            this.#db = db
            this.#init()
            let sqlstr = "SELECT MAX(id) FROM users"
            let result = this.#db.exec(sqlstr)
            if (result[0].values[0][0] == null) {
                this.#idCount = 0
            } else {
                this.#idCount = result[0].values[0][0] + 1
            }
        })
    }

    #init() {
        let sqlstr = "\
            CREATE TABLE IF NOT EXISTS users(`id` int, `username` varchar(15), `password` char(60), `inventoryid` int, `pcid` int);\
            CREATE TABLE IF NOT EXISTS inventory(`id` int, `pokeballCount` int, `greatballCount` int, `ultraballCount` int, `masterballCount` int, `potionsCount` int, `superpotionsCount` int, `hyperpotionsCount` int, `maxpotionsCount` int, `reviveCount` int, `maxreviveCount` int);\
            CREATE TABLE IF NOT EXISTS pc(`id` int, `pokemon1` nvarchar(4000), `pokemon2` nvarchar(4000), `pokemon3` nvarchar(4000), `pokemon4` nvarchar(4000));"
        this.#db.run(sqlstr)
    }

    /**
     * Gets a user's pc from database
     * @param {string} username username
     * @returns {array} a pc in the form [pcid, {json} pokemon1, {json} pokemon2, {json} pokemon3, {json} pokemon4]
     */
    getPcByUserId(userId) {
        this.fetchFromDisk()
        let sqlstr = "SELECT `pcid` FROM `users` WHERE `id`='" + userId + "';"
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
        this.#bcrypt.hash(password, 5, (err, hash) => {
            if (err) {
                throw new Error(`Error: ${err}`)
            }
            password = hash
            let sqlstr = "\
                INSERT INTO `users`(`id`, `username`, `password`, `inventoryid`, `pcid`) VALUES(" + this.#idCount + ", '" + username + "', '" + password + "', " + this.#idCount + ", " + this.#idCount + ");\
                INSERT INTO `inventory`(`id`, `pokeballCount`, `greatballCount`, `ultraballCount`, `masterballCount`, `potionCount`, `superpotionCount`, `hyperpotionCount`, `maxpotionCount`, `reviveCount`, `maxreviveCount`) VALUES(" + this.#idCount + ", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);\
                INSERT INTO `pc`(`id`, `pokemon1`, `pokemon2`, `pokemon3`, `pokemon4`) VALUES(" + this.#idCount + ", null, null, null, null);"
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
        let nameIndex = new Map([["pokeballCount", 1], ["greatballCount", 2], ["ultraballCount", 3], ["masterballCount", 4]["potionCount", 5], ["superpotionCount", 6], ["hyperpotionCount", 7], ["maxpotionCount", 8], ["reviveCount", 9], ["maxreviveCount", 10]])
        if (!nameIndex.has(name)) throw new Error("wrong name- put in the form \"pokeballCount\" or similar")
        let storedQuantity = this.getInventoryByUserId(userId)[nameIndex.get(name)]
        if (storedQuantity + quantity < 0) return false
        let sqlstr = "UPDATE `inventory` SET `" + name + "`=" + (storedQuantity + quantity) + " WHERE `id`=" + inventoryId + ";"
        this.#db.run(sqlstr)
        this.writeToDisk()
        return true
    }

    /**
     * @param {int} userId user id
     * @returns {array} array containing inventory data, in the form [id, pokeballCount, greatballCount, ultraballCount, masterballCount, potionCount, superpotionCount, hyperpotionCount, maxpotionCount, reviveCount, maxreviveCount]
     */
    getInventoryByUserId(userId) {
        this.fetchFromDisk()
        let sqlstr = "SELECT * FROM `inventory` WHERE `id`=" + userId + ";"
        let result = this.#db.exec(sqlstr)
        return result
    }

    /**
     * Inserts the Pokemon into the PC on empty slot
     * @param {int} userId userId, used to find correct pc
     * @param {Pokemon} pokemon pokemon to add to pc
     * @returns true on success, false if pc full
     */
    insertNewPokemonIntoUserPC(userId, pokemon) {
        this.fetchFromDisk()
        let pcId = this.getPcByUserId(userId)[0]
        let sqlstr = "SELECT `pokemon1`, `pokemon2`, `pokemon3`, `pokemon4` FROM `pc` WHERE `id`=" + pcId + ";"
        let result = this.#db.exec(sqlstr)
        let insertIndex = 1
        for (let i = result[0].values[0].length - 1; i >= 0; i--) {
            if (result[0].values[0][i] == null) continue
            if (i == result[0].values[0][i].length - 1) return false
            insertIndex = i + 2
            break
        }
        sqlstr = "UPDATE `pc` SET `pokemon" + insertIndex + "`=\'" + JSON.stringify(pokemon) + "\' WHERE `id`=" + pcId + ";"
        this.#db.run(sqlstr)
        this.writeToDisk()
        return true
    }

    /**
     * Updates the Pokemon in the PC
     * @param {int} userId user id
     * @param {Pokemon} pokemon new updated pokemon
     * @param {int} index index of pokemon to update
     */
    updatePokemonInUserPc(userId, pokemon, index) {
        this.fetchFromDisk()
        let pcId = this.getPcByUserId(userId)[0]
        sqlstr = "UPDATE `pc` SET `pokemon" + index + "`=\'" + JSON.stringify(pokemon) + "\' WHERE `id`=" + pcId + ";"
        this.#db.run(sqlstr)
        this.writeToDisk()
        return true
    }

    fetchFromDisk() {
        let db
        this.#fs.access("./db.sqlite", this.#fs.F_OK, (err) => {
            if (err) {
                db = new this.#SQL.Database()
                this.#db = db
                return
            }
            let data = this.#fs.readFileSync("./db.sqlite")
            db = new this.#SQL.Database(data)
            this.#db = db
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
        console.dir(result, { depth: null })
    }

    printInventories() {
        let sqlstr = "SELECT * FROM `inventory`"
        let result = this.#db.exec(sqlstr)
        console.dir(result, { depth: null })
    }

    printAll() {
        this.printUsers()
        this.printPcs()
        this.printInventories()
    }

    executeSelectSql(sqlstr) {
        return this.#db.exec(sqlstr)
    }


    executeSql(sqlstr) {
        this.fetchFromDisk()
        this.#db.run(sqlstr)
        this.writeToDisk()
    }
    //#endregion
}