var dataArray = [];
const url = "http://mappy.dali.dartmouth.edu/members.json";

fetchData(url);

// make an HTTP GET request using Ajax
function fetchData(url) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onload = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            dataArray = xmlHttp.response;
            displayNames();
        }
    }

    xmlHttp.open("GET", url, true);
    xmlHttp.responseType = 'json';
    xmlHttp.send(null);
}

function displayNames() {
    ReactDOM.render(<AllPeople dataArray={dataArray} />, document.getElementById('fill-content'));
}

function manuallyReRender() {
    ReactDOM.unmountComponentAtNode(document.getElementById('fill-content'));
    displayNames();
}

function alphabetizeByName() {
    dataArray.sort(function(a,b) {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    });
    manuallyReRender();
}

function randomizeByName() {
    dataArray.sort(function() { return 0.5 - Math.random() });
    manuallyReRender();
}
