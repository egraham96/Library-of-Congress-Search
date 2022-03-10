var submit = document.getElementById("submitbutton");
var results= document.getElementById("results");

submit.addEventListener("click", Search)

function Search (event){
event.preventDefault()
    var dropdownVal=document.getElementById("dropdown").value
    var queryVal=document.getElementById("query").value
    
    if (!queryVal) {
        results.textContent='Try again! You need a search input value!'
        return;
      }
    
  var queryString = './search-results.html?q=' + queryVal + '&format=' + dropdownVal;

      location.assign(queryString);
    }
    