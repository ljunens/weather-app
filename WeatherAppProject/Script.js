const apiKey = "28fa90aa85662692fe1022e745d70c09";

const input = document.getElementById("searchInp");
const cityName = document.querySelector(".cityName");
const temp = document.querySelector(".temp span");
const status = document.querySelector(".status span");
const sunrise = document.querySelector(".extraInfo li:nth-child(1) span");
const sunset = document.querySelector(".extraInfo li:nth-child(2) span");
const timeInfo = document.querySelector(".timeInfo");

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    cityName.textContent = data.name;
    temp.textContent = Math.round(data.main.temp);
    status.textContent = data.weather[0].main;
    setBackground(data.weather[0].main);

    const timezoneOffset = data.timezone; 

    const utcNow = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const cityNow = new Date(utcNow + timezoneOffset * 1000);

    const day = cityNow.toLocaleDateString(undefined, { weekday: "long" });
    const date = cityNow.toLocaleDateString(undefined, { day: "2-digit", month: "long", year: "numeric" });
    const time = cityNow.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

    timeInfo.innerHTML = `<span>${day}</span>, <span>${date}</span>, <span>${time}</span>`;

    sunrise.textContent = formatCityTime(data.sys.sunrise, timezoneOffset);
    sunset.textContent = formatCityTime(data.sys.sunset, timezoneOffset);

  } catch (err) {
    alert(err.message);
  }
}

function formatCityTime(unixTime, offset) {
  const utc = new Date(unixTime * 1000);
  const local = new Date(utc.getTime() + offset * 1000);
  return local.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit"
  });
}

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && input.value.trim() !== "") {
    getWeather(input.value.trim());
    input.value = "";
  }
});

function setBackground(condition) {
    const body = document.body;
  
    const backgrounds = {
      Clear: "linear-gradient(to right, #e1d0fb,rgb(250, 211, 148))",
      Clouds: "linear-gradient(to right, #e1d0fb,rgb(71, 92, 113))",
      Rain: "linear-gradient(to right, #e1d0fb,rgb(38, 67, 93))",
      Snow: "linear-gradient(to right, #e1d0fb, #274046)",
      Thunderstorm: "linear-gradient(to right, #e1d0fb, #243B55)",
      Drizzle: "linear-gradient(to right, #e1d0fb, #66a6ff)",
      Mist: "linear-gradient(to right, #e1d0fb, #DECBA4)",
      Haze: "linear-gradient(to right, #e1d0fb, #cfdef3)",
      Fog: "linear-gradient(to right, #e1d0fb, #D7DDE8)"
    };
  
    body.style.background = backgrounds[condition] || "linear-gradient(to right, #bdc3c7, #2c3e50)";
  }
  

window.addEventListener("load", () => getWeather("Berlin"));