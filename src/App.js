import { useState } from "react";
import "./styles.css";
import { TbSearch } from "react-icons/tb";
import vetor from "../src/assets/vetor.png";
import home from "../src/assets/home.png"

function App() {
  //variável de guardar valor = city
  // setCity guarda o primeiro parâmetro = city

  const [city, setCity] = useState("");
  const [weatherForecast, setweatherForecast] = useState(null);

  //toda vez que o usuario digitar alguma coisa, será redenrizado essa função
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  //
  const handleSearch = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=22c54fd0267f8ac797057389aee685ed&lang=pt&units=metric`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setweatherForecast(data);
      });

      //toFixed()
  };

  return (
    <div className="container">
      <nav className="navbar">
        <a className="navbar-brand" href="#top">
          Previsão meteorológica
        </a>
      </nav>

      <img className="vetor" src={vetor} alt="" />

      <main className="container-box">
        <div className="title">
          <div className="row mb-4">
            <div className="col-md-6">
              <input
                onChange={handleChange}
                className="form-control"
                value={city}
              />
            </div>
          </div>

          <button onClick={handleSearch} className="btn btn-primary btn-lg">
            <TbSearch className="search"  />
          </button>
       
          {weatherForecast ? (
            <div className="mt-5">
              <img className="imgcloud" src={home} alt=""/>
              <div className="content-box">
                <p>Clima esta : {weatherForecast.weather[0].description }</p>
                <p>País: {weatherForecast.sys.country}</p>
                <p>Temperatura: {weatherForecast.main.temp.toFixed() + "º" } </p>
                <p>Umidade: {weatherForecast.main.humidity + "%"}</p>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
