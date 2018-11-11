import {data} from './data.js';

var out = document.querySelector('.wrapper');
var result = createUl(createTree(data));
out.appendChild(result);

//Print tree
function createTree(data) {
    for (var key in data) {
        if (key === 'name') {
            var li = createLi(data.name);       
         } else if (key === 'children') {
            var childArr = data[key];
            var ul = document.createElement('ul'); 
            childArr.reduce((prev, curr) => {                    
                var  children = createTree(curr);                      
                prev.appendChild(children);                                             
                return ul;                        
            }, ul);             
            if(ul.innerHTML !== '') li.appendChild(ul);                                 
        }
    }
    return li; 
}


 function createLi(name) { 
    var li = document.createElement('li'); 
    var span = document.createElement('span');      
    span.innerHTML = name;
    li.appendChild(span);
    return li;      
}

function createUl(li) { 
    var ul = document.createElement('ul'); 
    ul.appendChild(li);
    return ul;      
}