navigator.geolocation.getCurrentPosition(function(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    console.log(lat, lon);

    let apiKey = '8e2c2cb9a713b439fe8be16b610e8b19';
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const container = document.querySelector('.container');

    fetch(url)
    .then(response => {
        if(!response.ok) throw new Error(`Something's wrong ${response.status}!`);
        return response.json();
    })
    .then(data => {
        // console.log(data);

        const html = `
            <div class="img__container">
                <img src="" alt="weather app" id="image">
            </div>

            <div class="info__container">
                <div class="info__container--top">
                    <h1>${data.name}</h1>
                    <h2>${(data.main.temp.toFixed(0))} &#8451;</h2>
                </div>

                <div class="feels__like">
                    <h2>Feels like ${(data.main.feels_like).toFixed(0)} &#8451;</h2>
                </div>

                <div class="weather">
                    <h2>${data.weather[0].main}</h2>
                    <h2 class="description">${(data.weather[0].description)}</h2>
                </div>

                <div class="wind">
                    <h2>Wind: ${data.wind.speed} km/h</h2>
                </div>

                <div class="credits">
                    <p>made by <a href="https://adnanmusinovic-portfolio.000webhostapp.com/">Adnan Musinovic</a></p>
                    <p>made with <a href="https://openweathermap.org/">Open weather map</a></p>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', html);

        let img = document.getElementById('image');
        if(data.weather[0].main === 'Clouds') img.src = 'images/clouds.jpg';
        if(data.weather[0].main === 'Rain') img.src = 'images/rain.jpg';
        if(data.weather[0].main === 'Drizzle') img.src = 'images/drizzle.jpg';
        if(data.weather[0].main === 'Snow') img.src = 'images/snow.jpg';
        if(data.weather[0].main === 'Clear') img.src = 'images/clear.jpg';


    })
    .catch(err => console.error(`${err.message}`));
}, function(){
    alert("Couldn't get your location!");
});