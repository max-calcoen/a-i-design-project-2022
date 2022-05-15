// TODO: INSTEAD OF USERS MAP, USERS IS A CLASS THAT HAS ACCESSORS THAT FETCH FROM DB

export class User {
    constructor(username, password) {
        this.username = username
        this.password = password
    }
}