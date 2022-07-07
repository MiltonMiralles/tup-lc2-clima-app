function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("CITIES");

    if (cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    }
    return cities;
}

function consultAPI(cityName, ventana) {
    let apiKey = "d94da614d25f78141fa3b5ae951733d6" //La key obtenida en la página
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=es`)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error("error")
        })
        .then(data => {
           if (ventana != "add-city")
           {
            return verClima(data);
           }else{
            return data;
           }
        })
        .catch(error => {
            return "error"
        });
}