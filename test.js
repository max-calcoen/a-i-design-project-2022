import bcrypt from "bcrypt"
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