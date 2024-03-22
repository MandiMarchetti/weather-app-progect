import React, { useState } from "react";

const Main = () => {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=664109e99631f71353c34842fd89ab24&lang=en`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setWeatherForecast(data);
        console.log(data);
      });
  };

  return (
    <div>
      <main className="container">
        <div className="jumbotron">
          <h1>Is it a sunny day?😎 </h1>
          <p className="lead">Check right now the weather in your city...</p>

          <div className="row mb-4 justify-content-center">
            <div className="col-md-6 ">
              <input
                onChange={handleChange}
                className="form-control"
                placeholder="Type her the name of your city..."
                value={city}
              />
            </div>
          </div>

          <button onClick={handleSearch} className="btn btn-warning btn-lg">
            Search 🕶️
          </button>
        </div>

        {weatherForecast ? (
          <div>
            <div className="mt-4">
              <div>
                <h2>{(weatherForecast.main.temp - 273.15).toFixed(2)}°C</h2>
                <h3>Today is : {weatherForecast.weather[0].description}</h3>
                <p>You probably are feeling like: {(weatherForecast.main.feels_like - 273.15).toFixed(2)}°C</p>
                <p>The humidity is: {weatherForecast.main.humidity}%</p>
                <p>So, the Max temperature will be: {(weatherForecast.main.temp_max - 273.15).toFixed(2)}°C...</p>
                <p>...and the Min temperature will be: {(weatherForecast.main.temp_min - 273.15).toFixed(2)}°C</p>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default Main;
