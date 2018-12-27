import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './notify.js'
var $ = require("jquery");

// this file performs an HTTP GET request and passes the loaded data to the App component using ReactJS
const url = "https://raw.githubusercontent.com/dali-lab/mappy/gh-pages/members.json";

let app;
fetchData(url);

// make an HTTP GET request using Ajax
function fetchData(url) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onload = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            ReactDOM.render(<App dataArray={xmlHttp.response} ref={(reactReference) => {app = reactReference}} />, document.getElementById('app'));

            app.selectAllTermCheckboxes();
            app.selectAllProjectCheckboxes();

            // if the person does not have the notified-click cookie or it is set to false
            if (getCookie("notified-click") === null || getCookie("notified-click") === "false") {
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
                setCookie("notified-click", "true", 10); // cookie will persist for 10 days
            }
        }
    }

    xmlHttp.open("GET", url, true);
    xmlHttp.responseType = 'json';
    xmlHttp.send(null);
}

// source: https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// source: https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
