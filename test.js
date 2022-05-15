/* import bcrypt from "bcrypt"
let pwd = "https://prod.liveshare.vsengsaas.visualstudio.com/join?07DA0E27080B2206677C9B6E7C983BED9752"
let hash1
bcrypt.genSalt(5, (err, salt) => {
    bcrypt.hash(pwd, salt, (err, hash) => {
        let hash1 = hash
        console.log(hash)
        console.log(hash.length)
    })
})

bcrypt.hash(pwd, 5, function (err, hash) { // Salt + Hash
    bcrypt.compare("3", hash, function (err, result) {  // Compare
        // if passwords match
        if (result) {
            console.log("It matches!")
        }
        // if passwords do not match
        else {
            console.log("Invalid password!");
        }
    });
});

import initSqlJs from "sql.js"
import fs from "fs"
const SQL = await initSqlJs()
const data = fs.readFileSync("./db.sqlite")
const db = new SQL.Database(data)

let sqlstr = "SELECT * FROM users"
let result = db.exec(sqlstr)
console.dir(result, { depth: null })

sqlstr = "CREATE TABLE IF NOT EXISTS users(`id` int, `username` varchar(15), `password` char(60), `inventoryid` int, `pcid` int);\
CREATE TABLE IF NOT EXISTS inventory(`id` int, `pokeballCount` int, `greatballCount` int, `ultraballCount` int, `potionsCount` int, `superpotionsCount` int, `hyperpotionsCount` int, `maxpotionsCount` int);\
CREATE TABLE IF NOT EXISTS pc(`id` int, `pokemon1` nvarchar(4000), `pokemon2` nvarchar(4000), `pokemon3` nvarchar(4000), `pokemon4` nvarchar(4000), `pokemon5` nvarchar(4000));\
INSERT INTO users(`id`, `username`, `password`, `inventoryid`, `pcid`) VALUES(0, 'username', 'password', 0, 0);"
db.run(sqlstr)

sqlstr = "SELECT * FROM users"
result = db.exec(sqlstr)
console.dir(result, { depth: null })

*/