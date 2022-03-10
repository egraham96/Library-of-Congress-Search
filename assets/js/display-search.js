const queryString = window.location.search;
const resultsbox = document.getElementById("resultsbox")

function getUrl() {
    const urlParams = new URLSearchParams(queryString);
    var query = urlParams.get('q')
    var format = urlParams.get('format')
    var url = 'https://www.loc.gov/search/?q=' + query + '&fo=json&c=10'
    if (format) {
        var url = 'https://www.loc.gov/'+ format + '/?q='+ query+ '&fo=json&c=10'
    }
    renderResults(url, format)
}

function renderResults(url, format) {
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            displayResults(data, format)
        })
}


function displayResults(data, format){
const results= data.results
console.log(results)
results.forEach(value =>{
const div=document.createElement('div')
div.setAttribute('class', 'eachresult')
const title= document.createElement('h1')
title.setAttribute('class', 'eachtitle')
const data1=document.createElement('p')
const link=document.createElement('a')
link.setAttribute('class', 'hyperlink')
const image=document.createElement('img')
if (format){
var newformat=format.charAt(0).toUpperCase() + format.slice(1);
title.textContent= newformat + "–" + value.title
}else {
title.textContent= value.title
}
data1.textContent= value.description[0]
link.textContent=value.url
image.setAttribute('src', value.image_url[0]);
image.setAttribute('class', 'eachresultimg')
data1.appendChild(link)
div.append(title, data1, image)
resultsbox.appendChild(div)

    })
}



getUrl()