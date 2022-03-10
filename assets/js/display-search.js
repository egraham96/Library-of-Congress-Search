const queryString = window.location.search;
const submit = document.getElementById("submitbutton")
const messagebox = document.getElementById("messagebox")
const resultsbox = document.getElementById("resultsbox")
const back=document.getElementById("back")

function getParams() {
    const urlParams = new URLSearchParams(queryString);
    var query = urlParams.get('q')
    var format = urlParams.get('format')
    getUrl(query, format)
}

function getUrl(query, format) {
    if (!format==='All') {
        var url = 'https://www.loc.gov/' + format + '/?q=' + query + '&fo=json&c=10'
    }else {
        var url = 'https://www.loc.gov/search/?q=' + query + '&fo=json&c=10'}
    
    renderResults(url, format)
}

function renderResults(url, format) {
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            displayResults(data, format)
        })
}


function displayResults(data, format) {
    results = data.results
    console.log(results)
    if (results.length === 0) {
        resultsbox.textContent = "No results found in the Library of Congress for that query. Please Try Searching for Something Else"
    }
    results.forEach(value => {
        const div = document.createElement('div')
        div.setAttribute('class', 'eachresult')
        const title = document.createElement('h1')
        title.setAttribute('class', 'eachtitle')
        const data1 = document.createElement('p')
        const link = document.createElement('a')
        link.setAttribute('class', 'hyperlink')
        const image = document.createElement('img')
        image.setAttribute('class', 'eachresultimg')
        if (value.image_url[0]) {
            image.setAttribute('src', value.image_url[0]);
        } else {
            image.setAttribute('hidden', true)
        }
        if (format) {
            var newformat = format.charAt(0).toUpperCase() + format.slice(1);
            title.textContent = newformat + "–" + value.title
        } else {
            title.textContent = value.title
        }
        data1.textContent = value.description[0]
        link.textContent = value.url
        data1.appendChild(link)
        div.append(title, data1, image)
        resultsbox.appendChild(div)
    }

    )
}

submit.addEventListener("click", Search)

function Search(event) {
    event.preventDefault()
    resultsbox.textContent=""
    var dropdownVal = document.getElementById("dropdown").value
    var queryVal = document.getElementById("query").value

    if (!queryVal) {
        messagebox.textContent = 'Try again! You need a search input value!'
        return;}
console.log(queryVal, dropdownVal)
    getUrl(queryVal, dropdownVal)
}

back.addEventListener("click", goBack)

function goBack(){
    location.assign('./index.html');
}

getParams()