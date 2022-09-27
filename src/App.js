import { useState } from "react";

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
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=22c54fd0267f8ac797057389aee685ed&lang=pt`
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
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white" href="#top">
          Previsão do tempo
        </a>
      </nav>

      <main className="container">
        <div className="jumbotron">
          <h1> Verifique a previsão do tempo da sua cidade em tempo real</h1>

          <p className="lead">Digite o nome da sua cidade abaixo:</p>

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
            Pesquisar
          </button>

          {weatherForecast ? (
            <div className="mt-5">
              <div>
                <p>País: {weatherForecast.sys.country}</p>
                <p>Temperatura: {weatherForecast.main.temp}</p>
                <p>Umidade: {weatherForecast.main.humidity}</p>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
