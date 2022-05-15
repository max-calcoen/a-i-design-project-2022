export class Database {
    #db
    #idCount
    #fs
    #bcrypt
    constructor (db, fs, bcrypt) {
        this.#db = db
        this.#fs = fs
        this.#bcrypt = bcrypt
        let sqlstr = "CREATE TABLE IF NOT EXISTS users(`id` int, `username` varchar(15), `password` char(60), `inventoryid` int, `pcid` int);\
CREATE TABLE IF NOT EXISTS inventory(`id` int, `pokeballCount` int, `greatballCount` int, `ultraballCount` int, `potionsCount` int, `superpotionsCount` int, `hyperpotionsCount` int, `maxpotionsCount` int);\
CREATE TABLE IF NOT EXISTS pc(`id` int, `pokemon1` nvarchar(4000), `pokemon2` nvarchar(4000), `pokemon3` nvarchar(4000), `pokemon4` nvarchar(4000), `pokemon5` nvarchar(4000));"
        this.#db.run(sqlstr)
//         this.printUsers()
//         this.writeToDisk()
        // sqlstr = "SELECT * FROM users"
        // let result = db.exec(sqlstr)
        // console.dir(result, {depth: null})
        // this.#idCount = result[0].values[result[0].values.length - 1][0] ? result[0].values[result[0].values.length - 1][0] : 0
    }
    
    createNewUser(username, password) {
        let sqlstr = "INSERT INTO users(`id`, `username`, `password`, `inventoryid`, `pcid`) VALUES(" + this.#idCount + ", '" + username + "', '" + password + "', " + this.#idCount + ", " + this.#idCount + ");\
        INSERT INTO inventory(`id`, `pokeballCount`, `greatballCount`, `ultraballCount`, `potionsCount`, `superpotionsCount`, `hyperpotionsCount`, `maxpotionsCount`) VALUES(" + this.#idCount + ", 0, 0, 0, 0, 0, 0, 0);\
        INSERT INTO pc(`id`, `pokemon1`, `pokemon2`, `pokemon3`, `pokemon4`, `pokemon5`) VALUES(" + this.#idCount + ", null, null, null, null, null);"
        this.#idCount++
        this.#db.run(sqlstr)
        this.writeToDisk()
    }

    insertIntoUserPC(userId, pokemon) {

    }

    idCount() {
        console.log(this.#idCount)
    }

    get users() {
        let users = new Map()
        let sqlstr = "SELECT `username` FROM users;\
        SELECT * FROM users"
        let result = this.#db.exec(sqlstr)
        let usernames = result[0].values
        let dbUsers = result[1].values
        console.dir(usernames, { depth: null })
        console.dir(dbUsers, { depth: null })
        return users
    }

    getUserByUsername(username) {
        let sqlstr = "SELECT * FROM users WHERE `username`='MAX'"
        let result = this.#db.exec(sqlstr)
    }

    printUsers() {
        let sqlstr = "SELECT * FROM users"
        let result = this.#db.exec(sqlstr)
        console.dir(result, { depth: null })
    }

    writeToDisk() {
        let data = this.#db.export()
        let buffer = Buffer.from(data)
        this.#fs.writeFileSync("./db.sqlite", buffer)
    }
}