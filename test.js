async function f() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("lol")
        }, 5)
    })
    let result = await promise

    return result
}

let lol = "sadge"

await f().then((res) => {
    lol = res
})

console.log(lol)