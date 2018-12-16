
var getWeatherMinsk = (function() {

    var input = document.querySelector('input');
    var dropdown = document.querySelector('.dropdown');
    var dataBaseCities = '../countries.json';
    var endpointMinsk = `https://api.openweathermap.org/data/2.5/forecast?q=Minsk&APPID=9117bf1c0fa1bf432322023751327cc8`;

    function getData(endpoint, callback) {
      fetch(endpoint)
        .then(blob => blob.json())
        .then(data => callback(data))
    }

   

    function chooseCity(insertInDom, addDropdownMenu, removeDropdownMenu, showNewWeather) {

        input.addEventListener('keyup', function() {
           var debounceFunc = debounce(getWeatherWhithNewCity, 1000);

           setTimeout( function() { 
             debounceFunc() ;
           }, 1000);
        });



        dropdown.addEventListener('click', function(event) {
           var endpoint = showNewWeather.call(null, event, dropdown,input); 
           getData(endpoint,insertInDom);
        })
        

        window.addEventListener('click', function() {
          if (dropdown.innerHTML) removeDropdownMenu(dropdown);
        });

        
        function getWeatherWhithNewCity() {
           getData(dataBaseCities, search);
        };
        


        function debounce(func, ms) {
           var timer = null;

           return function (...args) {
             var onComplete = () => {
               func.apply(this, args);
               timer = null;
             }

             if (timer) {
               clearTimeout(timer);
             }
             timer = setTimeout(onComplete, ms);
           }
        }



        function search(data) {
          if (!input.value) {
             removeDropdownMenu(dropdown);
             return;
          } 

           var result = findMatches(input.value, data);
           var out = result.map( x => `<ul><li>${x}</li></ul>`).join('');
            
           if (out) addDropdownMenu.call(null, out, dropdown);
        };
         
        

        function findMatches(word, data) {
           var newData = [];

           for (var key in data) {
                var regex = new RegExp('^\\'+ word, 'gi');
                data[key].filter( x => x.match(regex) && newData.push(x));           
           }
             return newData;
        };

}



   
  return {
    getData: getData,
    endpointMinsk: endpointMinsk,
    chooseCity: chooseCity
  }
})();

export {getWeatherMinsk};