// this file performs an HTTP GET request to grab all data and defines functions for how objects should interact on screen

var dataArray = []; // array of JSON objects currently shown on screen
var totalData = []; // array of all JSON objects originally received in the HTTP GET request

const url = "https://raw.githubusercontent.com/dali-lab/mappy/gh-pages/members.json";

// set aside global variables for react components
let allPeopleReact;
let termsInLabCheckboxesReact;
let projectsCheckboxesReact;

fetchData(url);

// make an HTTP GET request using Ajax
function fetchData(url) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onload = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            totalData = xmlHttp.response;

            for (var person in totalData) {
                totalData[person].reactPersonPreviewObj = <PersonPreview personObj={totalData[person]} key={person} />;
            }

            dataArray = totalData;

            displayPeople(); // add react components for each JSON object received
            initializeNavBarMenu(); // create the navbar

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

// add react components for all people we received data on -- this includes the filters and sorting perfomed
function displayPeople() {
    ReactDOM.render(<AllPeople dataArray={dataArray} ref={(reactReference) => {allPeopleReact = reactReference}} />, document.getElementById('fill-content'));
}

// instantiate react components for the checkboxes in the filter menu and select them all
function initializeNavBarMenu() {
    ReactDOM.render(<TermsInLabCheckboxes totalData={totalData} ref={(reactReference) => {termsInLabCheckboxesReact = reactReference}} />, document.getElementById('terms-in-lab-checkboxes'));
    ReactDOM.render(<ProjectsCheckboxes totalData={totalData} ref={(reactReference) => {projectsCheckboxesReact = reactReference}} />, document.getElementById('projects-checkboxes'));

    selectAllTermCheckboxes();
    selectAllProjectCheckboxes();
}

// force the react components to rerender -- only use if absolutely necessary. should instead change the state of individual objects to cause a rerender
function manuallyReRender() {
    ReactDOM.unmountComponentAtNode(document.getElementById('fill-content'));
    displayPeople();
}

// reset all filters and sorting - show all originally received data
function resetData() {
    dataArray = totalData;
    allPeopleReact.setState({
        reactDataArray: dataArray
    });
    manuallyReRender(); // TODO: figure out how to avoid this

    // reset filter area user inputs
    document.getElementById('name-contains-input').value = "Enter Name Here";
    selectAllTermCheckboxes();
    selectAllProjectCheckboxes();
}

// select all term filter checkboxes
function selectAllTermCheckboxes() {
    var termsSpan = document.getElementById('terms-in-lab-checkboxes');
    for (var nodeObj in termsSpan.childNodes) {
        if (termsSpan.childNodes[nodeObj].tagName == "SPAN") {
            termsSpan.childNodes[nodeObj].getElementsByTagName('input')[0].checked = true;
        }
    }
}

// select all project filter checkboxes
function selectAllProjectCheckboxes() {
    var termsSpan = document.getElementById('projects-checkboxes');
    for (var nodeObj in termsSpan.childNodes) {
        if (termsSpan.childNodes[nodeObj].tagName == "SPAN") {
            termsSpan.childNodes[nodeObj].getElementsByTagName('input')[0].checked = true;
        }
    }
}

// SORT FUNCTION: order the people shown on screen alphabetically by name and rerender
function alphabetizeByName() {
    dataArray = totalData;
    dataArray.sort(function(a,b) {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    });
    allPeopleReact.setState({
        reactDataArray: dataArray,
        order: "alphabetical"
    });
}

// SORT FUNCTION: order the people shown on screen randomly and rerender
function randomizeByName() {
    dataArray = totalData;
    dataArray.sort(function() { return 0.5 - Math.random() });

    var str = "random" + Math.random(); // construct a random name so the state changes -- to lookup the state and see what order we are on, call startsWith("random")
    allPeopleReact.setState({
        reactDataArray: dataArray,
        order: "str"
    });
}

// SORT FUNCTION: order the people shown on screen by terms they worked in the lab and rerender
function sortByTermsInLab() {
    dataArray = totalData;
    dataArray.sort(function(a,b) {
        if(a.terms_on < b.terms_on) { return -1; }
        if(a.terms_on > b.terms_on) { return 1; }
        return 0;
    });
    allPeopleReact.setState({
        reactDataArray: dataArray,
        order: "terms-in-lab"
    });
}

// SORT FUNCTION: order the people shown on screen by projects they worked on in the lab and rerender
function sortByProject() {
    dataArray = totalData;
    dataArray.sort(function(a,b) {
        if(a.project[0] < b.project[0]) { return -1; }
        if(a.project[0] > b.project[0]) { return 1; }
        return 0;
    });
    allPeopleReact.setState({
        reactDataArray: dataArray,
        order: "project"
    });
}

// FILTER FUNCTION: only show people if their name matches the name the user typed into the input box
function filterNameContains() {
    var nameToCheck = document.getElementById('name-contains-input').value;

    if (nameToCheck != "" && nameToCheck != "Enter Name Here") {
        var newArray = [];

        for (var i in totalData) {
            if (totalData[i].name == nameToCheck) {
                newArray.push(totalData[i]);
            }
        }

        dataArray = newArray;
        allPeopleReact.setState({
            reactDataArray: dataArray
        });
    }
}

// trigger function for when user presses enter in name contains text field - basically just click the submit button for them
document.getElementById('name-contains-input').onkeypress=function(e) {
    if(e.keyCode==13){
        document.getElementById('name-contains-submit').click();
    }
}

// FILTER FUNCTION: only show people if they worked in the lab during a term the user selects
function filterTermsInLab() {
    var desiredTerms = [];
    var termsSpan = document.getElementById('terms-in-lab-checkboxes');

    // find all terms the user wants to see
    for (var nodeObj in termsSpan.childNodes) {
        if (termsSpan.childNodes[nodeObj].tagName == "SPAN" && termsSpan.childNodes[nodeObj].getElementsByTagName('input')[0].checked) {
            desiredTerms.push(termsSpan.childNodes[nodeObj].getElementsByTagName('input')[0].name);
        }
    }

    var newDataArray = [];

    // update the objects we grab based on user selection
    for (var dataObj in totalData) {
        for (var term in totalData[dataObj].terms_on) {
            if (desiredTerms.includes(totalData[dataObj].terms_on[term]) && !newDataArray.includes(totalData[dataObj])) {
                newDataArray.push(totalData[dataObj]);
            }
        }
    }

    // reset dataArray based on these filters then rerender
    dataArray = newDataArray;
    allPeopleReact.setState({
        reactDataArray: dataArray
    });
}

// FILTER FUNCTION: only show people if they worked on the project the user selects
function filterProjects() {
    var desiredProjects = [];
    var termsSpan = document.getElementById('projects-checkboxes');

    // find all projects the user wants to see
    for (var nodeObj in termsSpan.childNodes) {
        if (termsSpan.childNodes[nodeObj].tagName == "SPAN" && termsSpan.childNodes[nodeObj].getElementsByTagName('input')[0].checked) {
            desiredProjects.push(termsSpan.childNodes[nodeObj].getElementsByTagName('input')[0].name);
        }
    }

    var newDataArray = [];

    // update the objects we grab based on user selection
    for (var dataObj in totalData) {
        for (var proj in totalData[dataObj].project) {
            if (desiredProjects.includes(totalData[dataObj].project[proj]) && !newDataArray.includes(totalData[dataObj])) {
                newDataArray.push(totalData[dataObj])
            }
        }
    }

    // reset dataArray based on these filters then rerender
    dataArray = newDataArray;
    allPeopleReact.setState({
        reactDataArray: dataArray
    });
}
