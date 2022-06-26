function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("CITIES");

    if (cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    }
    return cities;
}

function consultAPI(cityName) {
    let apiKey = "d94da614d25f78141fa3b5ae951733d6" //La key obtenida en la página
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=es`)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error("error")
        })
        .then(data => {
            verClima(data);
        })
        .catch(error => {
            return "error"
        });
}

function verClima(data) {
    let ciudad = data.name;
    let icono = data.weather[0].icon;
    let temperatura = data.main.temp;
    let sensacionTermica = data.main.feels_like;
    let humedad = data.main.humidity;
    let viento = data.wind.speed;
    let presionAtm = data.main.pressure;

    //Armado de la card con codigo HTML
    let card = `<div class="card"> 
                    <h3>${ciudad}</h3>
                    <img src="http://openweathermap.org/img/wn/${icono}.png" alt="Imagen">
                    <p>Temperatura: ${temperatura}°</p>
                    <p>Sensación Térmica: ${sensacionTermica}°</p>
                    <p>Humedad: ${humedad}%</p>
                    <p>Velocidad del Viento: ${viento}km/h</p>
                    <p>Presión: ${presionAtm} P</p>
                </div>`

    let section = document.getElementById("mostrarCard");
    if (section) {
        section.innerHTML = "";
        section.innerHTML += card;
    }
}