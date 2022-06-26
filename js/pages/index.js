let selector = document.getElementById("seleccionarCiudad");

function addCitiesToSelector() { //Funcion que agrega la ciudad en el index
    let cities = getCitiesFromLocalStorage();

    if (cities.length == 0) { //Si el localStorage está en 0, el mensaje será el siguiente
        selector.innerHTML += `<option value="noCities" disabled selected>No hay ciudades agregadas</option>`
    }
    else {
        selector.innerHTML += `<option value="" disabled selected>Seleccionar Ciudad</option>`
        for (let i = 0; i < cities.length; i++) { //Bucle FOR que agrega ciudades en el selector del index
            selector.innerHTML += `<option value="${cities[i]}">${cities[i]}</option>`
        }
    }
}

function createCard() {
    consultAPI(selector.value);
}

let consultButton = document.getElementById("consultarClima");
consultButton.addEventListener("click", createCard)

addCitiesToSelector();