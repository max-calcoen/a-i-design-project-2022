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
    sendData("/battle", pokeName, "pokemon", "POST") // May have to change routes and stuff later yk
}

function sendData(path, value, name, method = "post") {
    const form = document.createElement("form");
    form.method = method
    form.action = path
    document.body.appendChild(form)
    const formField = document.createElement("input")
    formField.type = "hidden"
    formField.name = name
    formField.value = value
    form.appendChild(formField)
    form.submit();
}