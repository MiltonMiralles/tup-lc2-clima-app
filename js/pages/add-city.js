async function validateCity(nuevaCiudad) {
    let cities = getCitiesFromLocalStorage();
  
    for (let i = 0; i < cities.length; i++) { //Bucle For para agregar nuevas ciudades
        if (nuevaCiudad == cities[i]) { //Retorna Warning si la ciudad se encuentra almacenada
            return "warning";
        };
    };

    if (await consultAPI(nuevaCiudad, "add-city") == "error") { //Retorna error si la ciudad no se encuentra en la API
        return "error";
    }
    else {
        return "success"; // Retorna Succes si la Ciudad está en la API y no se encuentra almacenada
    };
}

function removeMessage() { //Funcion para remover la alerta despues de cierto período de tiempo
    setTimeout(function() {
        document.getElementsByClassName("alert")[0].remove();
    }, 3000);
}

async function addCityToLocalStorage() { //Funcion para agregar ciudades al LocalStorage
    let cities = getCitiesFromLocalStorage();
    let nuevaCiudad = document.getElementById("ingresarCiudad").value; //Toma el elemento del HTML
    nuevaCiudad = nuevaCiudad.toUpperCase() //Devuelve las ciudades en mayúscula

    switch(await validateCity(nuevaCiudad)) {
        case "success": //Agrega la ciudad en el listado de ciudades ya buscadas
            cities.push(nuevaCiudad); //Se almacena dentro de nuevaCiudad
            localStorage.setItem("CITIES", JSON.stringify(cities)); //Metodo que devuelve el valor de la clave pasada por parámetro
            document.getElementById("messajeBox").innerHTML += successMessage; //Mensaje de éxito
            removeMessage(); //Se llama a la funcion para que el mensaje desaparezca desde de 3 segundos
            break;
        case "warning":
            document.getElementById("messajeBox").innerHTML += warningMessage; // La ciudad se encuentra almacenada
            removeMessage();
            break;
        case "error":
            document.getElementById("messajeBox").innerHTML += errorMessage; //La ciudad no se encuentra en la API
            removeMessage();
            break;
    };
};

let successMessage = '<p class="alert success">Ciudad agregada con éxito</p>'; //Códigos HTML ya definidos los colores en el CSS
let errorMessage = '<p class="alert error">Error: La ciudad ingresada no se encuentra en la API o se produjo un error al consultar</p>';
let warningMessage = '<p class="alert warning">La ciudad ingresada ya se encuentra almacenada</p>';

let buttonAddCity = document.getElementById("buttonAdd"); //Tomamos el ID del botón
buttonAddCity.addEventListener("click", addCityToLocalStorage); //Al hacer click que ejecute la funcion de agregar ciudad