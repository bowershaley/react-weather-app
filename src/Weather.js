import "./App.css";
import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [descripton, setDescription] = useState(null);
  const [icon, setIcon] = useState(null);

  function showData(response) {
    setCity(`The weather in ${city} is:`);
    setTemperature(`Temperature: ${Math.round(response.data.main.temp)}°C`);
    setHumidity(`Humidity: ${Math.round(response.data.main.humidity)}%`);
    setWind(`Wind: ${Math.round(response.data.wind.speed)}km/h`);
    setDescription(response.data.weather[0].description);
    setIcon(
      <img
        src={`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
    );
  }

  function handleSearch(event) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f09d3949047ab6c9e3bcaf79cf61f619&units=metric`;
    axios.get(url).then(showData);
    event.preventDefault();
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Type a city"
          onChange={updateCity}
          className="searchBar"
        />
        <input type="submit" value="Search" className="searchButton" />
        <div className="cityInfo"></div>
      </form>
      {temperature !== null && (
        <ul>
          <li>{temperature}</li>
          <li>{descripton}</li>
          <li>{humidity}</li>
          <li>{wind}</li>
          <li>{icon}</li>
        </ul>
      )}
    </div>
  );
}
