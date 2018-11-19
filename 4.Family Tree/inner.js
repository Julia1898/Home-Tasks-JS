var outPut = (function () {

    var out = document.querySelector('.wrapper');

    function createTree(data) {
      for (var key in data) {			
        if (key === 'name') {
           var li = createLi(data.name);       
        } 
        else if (key === 'children') {
           var childArr = data[key];
           var ul = document.createElement('ul');

           childArr.reduce((prev, curr) => {                    
             var  children = createTree(curr);                      
             prev.appendChild(children);                                             
             return ul;                        
           }, ul); 

           if (ul.innerHTML !== '') {
             li.appendChild(ul);
           }                                 
        }
      }
      return li; 
    }


    function createLi(name) { 
        var li = document.createElement('li'); 
        var span = document.createElement('span'); 
        var button = document.createElement('button');
        var input = document.createElement('input');
        
        button.innerHTML = 'add';    
        span.innerHTML = name;
        li.appendChild(span);
        li.appendChild(input);
        li.appendChild(button);
        
        return li;      
    }

    function createUl(li) { 
        var ul = document.createElement('ul');

        ul.appendChild(li);
        return ul;      
    }

    function insertTree(data) {
        var result = createUl(createTree(data));
        out.appendChild(result);
    }

    return {
        out: out,
        insertTree: insertTree
    }
})();