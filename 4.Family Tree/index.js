import {data} from './data.js';

var out = document.querySelector('.wrapper');
var newData = data;


if (localStorage.getItem('tree') != undefined) {
   newData = JSON.parse(localStorage.getItem('tree'));
} 


showTree(newData);
  

function showTree(data) {
  var result = createUl(createTree(data));
  out.appendChild(result);
}


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

 //add Values
out.onclick = function addValue(event) {
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