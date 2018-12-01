var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');

// this file performs an HTTP GET request and passes the loaded data to the App component using ReactJS
const url = "https://raw.githubusercontent.com/dali-lab/mappy/gh-pages/members.json";

let app;
fetchData(url);

// make an HTTP GET request using Ajax
function fetchData(url) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onload = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            ReactDOM.render(<App dataArray={xmlHttp.response} ref={(reactReference) => {app = reactReference}} />, document.getElementById('app'));

            app.selectAllTermCheckboxes;
            app.selectAllProjectCheckboxes;

            // send notification that user can click on person object for more information
            setTimeout(function() {
                $.notify("Click on person for more information", "info", {
                  clickToHide: true,
                  autoHide: true,
                  autoHideDelay: 5000,
                  position: 'top right',
                  style: 'bootstrap',
                  showAnimation: 'slideDown',
                  showDuration: 400,
                  hideAnimation: 'slideUp',
                  hideDuration: 200,
                  gap: 2
                });
            }, 2500);
        }
    }

    xmlHttp.open("GET", url, true);
    xmlHttp.responseType = 'json';
    xmlHttp.send(null);
}

// trigger function for when user presses enter in name contains text field - basically just click the submit button for them
document.getElementById('name-contains-input').onkeypress=function(e) {
    if(e.keyCode==13){
        document.getElementById('name-contains-submit').click();
    }
}
