const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
document.querySelector(".error").style.display = "none";

async function checkWeather(city) {
    document.querySelector(".error").style.display = "none";
    const response = await fetch(`/fetch-weather?city=${city}`);
    if(response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        let data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${data.main.temp} °C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed} km/hr`;

        const weatherMain = data.weather[0].main;
        const iconMap = {
            "Clear": "img/clear.png",
            "Clouds": "img/clouds.png",
            "Rain": "img/rain.png",
            "Drizzle": "img/drizzle.png",
            "Mist": "img/mist.png",
            "Snow": "img/snow.png",
            "Default": "img/clouds.png",
        };
        weatherIcon.src = iconMap[weatherMain] || iconMap["Default"];
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});