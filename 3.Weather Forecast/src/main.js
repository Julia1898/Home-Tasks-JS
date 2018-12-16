import {insertInDOM} from './view';
import {getWeatherMinsk} from './data';

var showWeather = insertInDOM.showWeather;
var dataWeatherMinsk = getWeatherMinsk.endpointMinsk;
var addDropdown = insertInDOM.addDropdownMenu;
var removeDropdownMenu = insertInDOM.removeDropdownMenu;
var showNewWeather =insertInDOM.showNewWeather;

getWeatherMinsk.getData(dataWeatherMinsk, showWeather);
getWeatherMinsk.chooseCity(showWeather, addDropdown, removeDropdownMenu, showNewWeather);
