let selector = document.getElementById("seleccionarCiudad");

function addCitiesToSelector() { //Funcion que agrega la ciudad en el index
    ciudades = getCitiesFromLocalStorage();
    for (const ciudad in ciudades){
        const agregaOpcion = document.createElement("option")
        agregaOpcion.value = `${ciudades[ciudad]}`
        agregaOpcion.textContent = `${ciudades[ciudad]}`
        selector.appendChild(agregaOpcion)
        }
}

function verClima(data){

    let ciudad1 = data.name;
    //let icono = data.weather[0].icon;
    let temperatura = data.main.temp;
    let sensacionTermica = data.main.feels_like;
    let humedad = data.main.humidity;
    let viento = data.wind.speed;
    let presionAtm = data.main.pressure;

    //Armado de la card con codigo JS
    const node = document.createElement("h3");
    node.textContent = ciudad1;
    document.getElementById("card").appendChild(node);
    const img = document.createElement("img");
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    document.getElementById("card").appendChild(img);
    const node1 = document.createElement("p");
    node1.textContent = `Temperatura: ${temperatura}°`;
    document.getElementById("card").appendChild(node1);
    const node3 = document.createElement("p");
    node3.textContent = `Sensación térmica: ${sensacionTermica}°`;
    document.getElementById("card").appendChild(node3);
    const node4 = document.createElement("p");
    node4.textContent = `Humedad: ${humedad}%`;
    document.getElementById("card").appendChild(node4);
    const node5 = document.createElement("p");
    node5.textContent = `Velocidad del viento: ${viento}km/h`;
    document.getElementById("card").appendChild(node5);
    const node6 = document.createElement("p");
    node6.textContent = `Presión: ${presionAtm}P`;
    document.getElementById("card").appendChild(node6);
} 

function createCard() {
    consultAPI(selector.value, "index");
}

let consultButton = document.getElementById("consultarClima");
consultButton.addEventListener("click", createCard)

addCitiesToSelector();