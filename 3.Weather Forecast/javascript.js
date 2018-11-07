  var endpointMinsk ='https://api.openweathermap.org/data/2.5/forecast?id=625144&APPID=9117bf1c0fa1bf432322023751327cc8';

  fetch(endpointMinsk)
      .then(blob => blob.json())
      .then(data => { 
            var weatherMinsk ={};	  
            weatherMinsk = makeCopy(data);
            
            var tempMinsk = getCelsius(weatherMinsk.list[0].main.temp);
            document.querySelector('.tempMinsk').innerHTML = tempMinsk + `<span>&deg;C</span>`;

            var iconMinsk = weatherMinsk.list[0].weather[0].icon;
            document.querySelector('.iconMinsk').innerHTML = "<img src = https://openweathermap.org/img/w/" + iconMinsk + ".png>";

            document.querySelector('.claudsMinsk').innerHTML = weatherMinsk.list[0].weather[0].description;

            document.querySelector('.humidityMinsk').innerHTML = weatherMinsk.list[0].main.humidity + " %";

            document.querySelector('.windMinsk').innerHTML =' '+ weatherMinsk.list[0].wind.speed + " m/s";
                      
            var minMinsk = getCelsius(weatherMinsk.list[0].main.temp_min);
            document.querySelector('.temp_minMinsk').innerHTML = "Min t " +minMinsk + " &deg;";
            
            var maxMinsk = getCelsius(weatherMinsk.list[0].main.temp_max);
            document.querySelector('.temp_maxMinsk').innerHTML = "Max t " +maxMinsk + " &deg;"; 

            getDateMinsk();           
            getForecast(weatherMinsk);
      });   


  function makeCopy(obj) {
      var clone = {};
      for( var i in obj ){
           if( obj[i] != null && typeof( obj[i] ) == "object" ){
               clone[i] = makeCopy( obj[i] );
           }
           else{
               clone[i] = obj[i];
           }
      }
      return clone;
  };

  function getCelsius(val){
      var result = Math.floor(val -273);
      return result;
  }

  function getDateMinsk(){
      var out = document.querySelector('.dateMinsk');
      var now = new Date;
      var day = now.getDay();
      var month = now.getMonth();
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var months = ['Jan ','Feb ','Mur ','Apr ','May ','June','July ','Aug','Sept ','Oct ','Nov ','Dec '];
      
      out.innerHTML = `${days[day]}, ${months[month]} ${now.getDate()}, ${now.getFullYear()}`;
  }

  function getForecast(data){
      var out = document.querySelector('.all_dayForecast');
      for( var i = 0; i < 8; i++ ){
           var time = (data.list[i].dt_txt).slice(11,16);
           var icon = data.list[i].weather[0].icon;
           var temp = getCelsius(data.list[i].main.temp);
           out.innerHTML += `
               <div class="block">
                  <div class="time_out">${time}</div>
                  <img src = https://openweathermap.org/img/w/${icon}.png>
                  <div>${temp}<span>&deg;C</span></div>
               </div>`;
      }     
  }