import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=b45c0173281e454c8ad85630dc506735`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          setErrorMessage(''); // Reset error message on successful response
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 404) {
            setErrorMessage('Wrong Location Entered!');
            setData({}); // Reset data on error
          }
        });

      setLocation('');
    }
  }

  return (
    <div className="app">
      <div className="container">
        <div className="search">
          <input 
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location"
            type="text"
          />
        </div>
        <div className="top">
          <div className="location">
            <h3>{data.name}</h3>
          </div>
          <div className="temp">
            {data.main ? <h1>{(((data.main.temp) - 32) * 5 / 9).toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <h3>{data.weather[0].main}</h3> : null}
          </div>
        </div>

        {data.name !== undefined && 
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{(((data.main.feels_like) - 32) * 5 / 9).toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity.toFixed()}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{(data.wind.speed * 1.60934).toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }

        {errorMessage && <h2 className="errorMsg">{errorMessage}</h2>}
      </div>
    </div>
  );
}

export default App;
