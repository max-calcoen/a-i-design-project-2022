let pokemon = 0;
let pokeName = ""

function confirmk(num) {
    document.getElementById("button1").classList.add("hidden")
    document.getElementById("button2").classList.add("hidden")
    document.getElementById("button3").classList.add("hidden")
    document.getElementById("button4").classList.remove("hidden")
    pokemon = num
}

function caller() {
    if (pokemon == 1) {
        pokeName = "Bulbasaur"
    }
    if (pokemon == 2) {
        pokeName = "Squirtle"
    }
    if (pokemon == 3) {
        pokeName = "Charmander"
    }
    sendData("/openworld", [pokeName, userId], ["pokemon", "userId"], "POST")

}
/**
 * makes a form and submits it dynamically 
 * @param {string} path path to send get or post request to
 * @param {string} values Value of form
 * @param {string} names Name of forms
 * @param {string} method POST or GET
 */
function sendData(path, values, names, method = "POST") {
    const form = document.createElement("form")
    form.method = method
    form.action = path
    document.body.appendChild(form)
    for (let i = 0; i < values.length; i++) {
        let formField = document.createElement("input")
        formField.type = "hidden"
        formField.name = names[i]
        formField.value = values[i]
        form.appendChild(formField)
    }
    form.submit()
}