import {data} from './data.js';

var tree = (function() {

    var newData = data; 
    
    function showTree() {
      if (localStorage.getItem('tree') != undefined) {
          newData = JSON.parse(localStorage.getItem('tree'));
      } 

      outPut.insertTree.call(this, newData);
    }
	
     //add Values
    outPut.out.onclick = function addValue(event) {
      var target = event.target;

      if (target.tagName != 'BUTTON') return;
        
      var input = target.previousSibling;
      var inputValue = input.value;
      var span = input.previousSibling;
      var spanValue = span.innerHTML;

      pushValues(newData, spanValue, new Object(inputValue));
      localStorage.setItem('tree', JSON.stringify(newData));
      window.location.reload();
    }


    class Object {
      constructor(name) {
        this.name = name,
        this.children = []
      }
    }


    function pushValues(obj, match, newVal) {
      for (var key in obj) {

        if (key === 'name') {
        	
          if (obj[key] === match) {
             var outPut = obj.children;
             outPut.push(newVal);
             return;
          }       
        } else if (key === 'children') {
             obj[key].forEach( x =>  pushValues(x, match, newVal));
        }
      }
    }


    document.querySelector('.skip').onclick = function() {
      localStorage.clear();
      window.location.reload();
    }

    return {
      showTree: showTree
    }
})();

tree.showTree();