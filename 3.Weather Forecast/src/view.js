var insertInDOM = (function() {
    var titleMinsk = document.querySelector('.titleMinsk');

    function showWeather(weatherMinsk) {          
      var tempMinsk = getCelsius(weatherMinsk.list[0].main.temp);
      var iconMinsk = weatherMinsk.list[0].weather[0].icon;
      var minTempMinsk = getCelsius(weatherMinsk.list[0].main.temp_min);
      var maxTempMinsk = getCelsius(weatherMinsk.list[0].main.temp_max);
      var temperature = tempMinsk + `<span>&deg;C</span>`;
      var icon = "<img src = https://openweathermap.org/img/w/" + iconMinsk + ".png>";
      var clouds = weatherMinsk.list[0].weather[0].description;
      var humidity = weatherMinsk.list[0].main.humidity + " %";
      var wind = weatherMinsk.list[0].wind.speed + " m/s"; 
      var minTemp = "Min t " + minTempMinsk + " &deg;";
      var maxTemp = "Max t " + maxTempMinsk + " &deg;"; 

      new GetElement('.tempMinsk').insert(temperature);
      new GetElement('.iconMinsk').insert(icon);
      new GetElement('.claudsMinsk').insert(clouds);
      new GetElement('.humidityMinsk').insert(humidity);
      new GetElement('.windMinsk').insert(wind);          
      new GetElement('.temp_minMinsk').insert(minTemp);
      new GetElement('.temp_maxMinsk').insert(maxTemp);
     
      new GetElement('.all_dayForecast').create(weatherMinsk);
    }  


   
    
    class CreateObjAllDayForecast {
      objectCreate(data) {
         var hourInterval = 8;
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
         return result;
      }
    }


   class GetElement extends CreateObjAllDayForecast {
      constructor(element) {
        super();
        this.elem = document.querySelector(element);
      }
      insert(val){
        this.elem.innerHTML = val;
      }
      create(data){
         var obj = super.objectCreate(data);
         this.insert(obj);
      }     
    }  


    function getCelsius(val) {
      var result = Math.floor(val - 273);
      return result;
    }


    //////Input ///////////
     

    function showNewWeather(event, dropdown, input) {
      var target  = event.target;
      var newEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${target.innerHTML}&APPID=9117bf1c0fa1bf432322023751327cc8`;             
      input.value = target.innerHTML;
      titleMinsk.innerHTML = target.innerHTML;
      removeDropdownMenu(dropdown);

      return newEndpoint;
    }



    function removeDropdownMenu(dropdown) {
      dropdown.innerHTML = '';
      dropdown.style.paddingTop = 0 + 'px';
      dropdown.style.height = 0 + 'px';
    }



    function addDropdownMenu(value, dropdown) {
      dropdown.innerHTML = value;
      dropdown.style.height = 200 + 'px';
      dropdown.style.paddingTop = 10 + 'px';
    }

     
    return {
       showWeather: showWeather,
       addDropdownMenu: addDropdownMenu,
       removeDropdownMenu: removeDropdownMenu,
       showNewWeather: showNewWeather
    }
})();

export {insertInDOM};
