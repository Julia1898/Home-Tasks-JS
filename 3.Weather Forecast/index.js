  import {getElement} from './settings.js';

  var endpointMinsk ='https://api.openweathermap.org/data/2.5/forecast?id=625144&APPID=9117bf1c0fa1bf432322023751327cc8';

  fetch(endpointMinsk)
      .then(blob => blob.json())
      .then(data => { 
            var weatherMinsk = {};	  
            weatherMinsk = makeCopy(data);
            
            var tempMinsk = getCelsius(weatherMinsk.list[0].main.temp);
            var iconMinsk = weatherMinsk.list[0].weather[0].icon;
            var minTempMinsk = getCelsius(weatherMinsk.list[0].main.temp_min);
            var maxTempMinsk = getCelsius(weatherMinsk.list[0].main.temp_max);
            var temperature = tempMinsk + `<span>&deg;C</span>`;
            var icon = "<img src = https://openweathermap.org/img/w/" + iconMinsk + ".png>";
            var clauds = weatherMinsk.list[0].weather[0].description;
            var humidity = weatherMinsk.list[0].main.humidity + " %";
            var wind = weatherMinsk.list[0].wind.speed + " m/s"; 
            var minTemp = "Min t " + minTempMinsk + " &deg;";
            var maxTemp = "Max t " + maxTempMinsk + " &deg;"; 

            new getElement('.tempMinsk').inner(temperature);
            new getElement('.iconMinsk').inner(icon);
            new getElement('.claudsMinsk').inner(clauds);
            new getElement('.humidityMinsk').inner(humidity);
            new getElement('.windMinsk').inner(wind);          
            new getElement('.temp_minMinsk').inner(minTemp);
            new getElement('.temp_maxMinsk').inner(maxTemp);
          
            getAllDayForecast(weatherMinsk);
      });   


  function makeCopy(obj) {
      var clone = {};
      for (var i in obj) {
           if (obj[i] != null && typeof(obj[i]) == "object") {
               clone[i] = makeCopy(obj[i]);
           } else {
               clone[i] = obj[i];
             }
      }
      return clone;
  };

  function getCelsius(val) {
      var result = Math.floor(val - 273);
      return result;
  }


  function getAllDayForecast(data) {
      var hourInterval = 24 / 3;
      var result = '';

      for (var i = 0; i < hourInterval; i++) {
           var time = (data.list[i].dt_txt).slice(11,16);
           var icon = data.list[i].weather[0].icon;
           var temp = getCelsius(data.list[i].main.temp);
           result += `
               <div class="block">
                  <div class="time_out">${time}</div>
                  <img src = https://openweathermap.org/img/w/${icon}.png>
                  <div>${temp}<span>&deg;C</span></div>
               </div>`;
      }
      new getElement('.all_dayForecast').inner(result);     
  }