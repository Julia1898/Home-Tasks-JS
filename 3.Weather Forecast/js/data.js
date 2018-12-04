var getWeatherMinsk = (function() {

  var endpointMinsk = 'https://api.openweathermap.org/data/2.5/forecast?id=625144&APPID=9117bf1c0fa1bf432322023751327cc8';

  function getData(showWeather, allDayForecast) {
      fetch(endpointMinsk)
      .then(blob => blob.json())
      .then(data => { 
          showWeather(data);
      })
  }

  return {
    getData: getData
  }
})();