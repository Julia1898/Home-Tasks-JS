var tree = (function() {

    var out = document.querySelector('.wrapper');
    var skip = document.querySelector('.skip');
    var newData = data; 
    
    function showTree(insertTree) {
      if (localStorage.getItem('tree') != undefined) {
          newData = JSON.parse(localStorage.getItem('tree'));
      } 

      insertTree(newData, out);
    }
	
     //add Values
    out.onclick = function(event) {
      var target = event.target;

      if (target.tagName != 'BUTTON') return;
        
      var input = target.previousSibling;
      var inputValue = input.value;
      var span = input.previousSibling;
      var spanValue = span.innerHTML;

      pushValuesToTree(newData, spanValue, new Object(inputValue));
      localStorage.setItem('tree', JSON.stringify(newData));
      window.location.reload();
    }


    class Object {
      constructor(name) {
        this.name = name,
        this.children = []
      }
    }


    function pushValuesToTree(obj, match, newVal) {
      for (var key in obj) {
        if (key === 'name') {        
          if (obj[key] === match) {
             var outPut = obj.children;
             outPut.push(newVal);
             return;
          }       
        } else if (key === 'children') {
             obj[key].forEach( x =>  pushValuesToTree(x, match, newVal));
        }
      }
    }


    skip.onclick = function() {
      localStorage.clear();
      window.location.reload();
    }

    return {
      showTree: showTree
    }
})();