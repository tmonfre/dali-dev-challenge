var React = require('react');
var NavBar = require('../components/NavBar');
var AllPeople = require('../components/AllPeople');
var TermsInLabCheckboxes = require('../components/TermsInLabCheckboxes');
var ProjectsCheckboxes = require('../components/ProjectsCheckboxes');

class App extends React.Component {
    constructor(props) {
        super(props);

        // create references to divs on screen
        this.termsCheckboxesRef = React.createRef();
        this.projectsCheckboxesRef = React.createRef();
        this.allPeopleRef = React.createRef();

        // bind this to below functions
        this.resetButton = this.resetButton.bind(this);
        this.selectAllTermCheckboxes = this.selectAllTermCheckboxes.bind(this);
        this.selectAllProjectCheckboxes = this.selectAllProjectCheckboxes.bind(this);
        this.alphabetizeByName = this.alphabetizeByName.bind(this);
        this.randomizeByName = this.randomizeByName.bind(this);
        this.sortByTermsInLab = this.sortByTermsInLab.bind(this);
        this.sortByProject = this.sortByProject.bind(this);
        this.filterNameContains = this.filterNameContains.bind(this);
        this.filterTermsInLab = this.filterTermsInLab.bind(this);
        this.filterProjects = this.filterProjects.bind(this);
    }

    render() {
        return (
            <div className="app">
                <NavBar appRef={this} />
                <div id="sort">
                    <span className="selection-area" id="sort-name">
                        <h3 className="selection-criteria">Name</h3>
                        <ul>
                            <li className="selection-type" id="name-alphabetical" onClick={this.alphabetizeByName}>Alphabetical</li>
                            <li className="selection-type" id="name-random" onClick={this.randomizeByName}>Random</li>
                        </ul>
                    </span>

                    <span className="selection-area" id="sort-terms">
                        <h3 className="selection-criteria" onClick={this.sortByTermsInLab}>Terms In Lab</h3>
                    </span>

                    <span className="selection-area" id="sort-projects">
                        <h3 className="selection-criteria" onClick={this.sortByProject}>By Project</h3>
                    </span>
                </div>

                <div id="filter">
                    <span className="selection-area" id="filter-name">
                        <h3 className="selection-criteria" id="name-contains">Name Contains</h3>
                        <input className="input-text" id="name-contains-input" type="text" name="fname" onClick="this.select()" value="Enter Name Here"></input>
                        <button id="name-contains-submit" class="submit" onClick={this.filterNameContains}>Submit</button>
                    </span>

                    <span className="selection-area" id="filter-terms">
                        <h3 className="selection-criteria">Terms In Lab</h3>
                        <TermsInLabCheckboxes totalData={this.totalData} ref={this.termsCheckboxesRef} />
                        <input className="submit checkbox-submit" type="submit" value="Submit" onClick={this.filterTermsInLab}></input>
                    </span>

                    <span className="selection-area" id="filter-projects">
                        <h3 className="selection-criteria">Projects</h3>
                        <ProjectsCheckboxes totalData={this.totalData} ref={this.projectsCheckboxesRef} />
                        <input className="submit checkbox-submit" type="submit" value="Submit" onClick={this.filterProjects}></input>
                    </span>
                </div>

                <AllPeople dataArray={this.props.dataArray} ref={this.allPeopleRef} />
            </div>
        );
    }

    // select all term filter checkboxes
    selectAllTermCheckboxes() {
        for (var nodeObj in this.termsCheckboxesRef.childNodes) {
            if (this.termsCheckboxesRef.childNodes[nodeObj].tagName == "SPAN") {
                this.termsCheckboxesRef.childNodes[nodeObj].getElementsByTagName('input')[0].checked = true;
            }
        }
    }

    // select all project filter checkboxes
    selectAllProjectCheckboxes() {
        for (var nodeObj in this.projectsCheckboxesRef.childNodes) {
            if (this.projectsCheckboxesRef.childNodes[nodeObj].tagName == "SPAN") {
                this.projectsCheckboxesRef.childNodes[nodeObj].getElementsByTagName('input')[0].checked = true;
            }
        }
    }

    // SORT FUNCTION: order the people shown on screen alphabetically by name and rerender
    alphabetizeByName() {
        var newArray = this.props.dataArray;
        newArray.sort(function(a,b) {
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        });
        this.allPeopleRef.setState({
            reactDataArray: newArray,
            order: "alphabetical"
        });
        $("#sort").slideUp();
        $("#filter").slideUp();
    }

    // SORT FUNCTION: order the people shown on screen randomly and rerender
    randomizeByName() {
        var newArray = this.props.dataArray;
        newArray.sort(function() { return 0.5 - Math.random() });

        var str = "random" + Math.random(); // construct a random name so the state changes -- to lookup the state and see what order we are on, call startsWith("random")
        this.allPeopleRef.setState({
            reactDataArray: newArray,
            order: "str"
        });
        $("#sort").slideUp();
        $("#filter").slideUp();
    }

    // SORT FUNCTION: order the people shown on screen by terms they worked in the lab and rerender
    sortByTermsInLab() {
        var newArray = this.props.dataArray;
        newArray.sort(function(a,b) {
            if(a.terms_on < b.terms_on) { return -1; }
            if(a.terms_on > b.terms_on) { return 1; }
            return 0;
        });
        this.allPeopleRef.setState({
            reactDataArray: newArray,
            order: "terms-in-lab"
        });
        $("#sort").slideUp();
        $("#filter").slideUp();
    }

    // SORT FUNCTION: order the people shown on screen by projects they worked on in the lab and rerender
    sortByProject() {
        var newArray = this.props.dataArray;
        newArray.sort(function(a,b) {
            if(a.project[0] < b.project[0]) { return -1; }
            if(a.project[0] > b.project[0]) { return 1; }
            return 0;
        });
        this.allPeopleRef.setState({
            reactDataArray: newArray,
            order: "project"
        });
        $("#sort").slideUp();
        $("#filter").slideUp();
    }

    // FILTER FUNCTION: only show people if their name matches the name the user typed into the input box
    filterNameContains() {
        var nameToCheck = document.getElementById('name-contains-input').value;

        if (nameToCheck != "" && nameToCheck != "Enter Name Here") {
            var newArray = [];

            for (var i in this.props.dataArray) {
                if (this.props.dataArray[i].name == nameToCheck) {
                    newArray.push(this.props.dataArray[i]);
                }
            }

            this.allPeopleRef.setState({
                reactDataArray: newArray
            });
            $("#sort").slideUp();
            $("#filter").slideUp();
        }
    }

    // FILTER FUNCTION: only show people if they worked in the lab during a term the user selects
    filterTermsInLab() {
        var desiredTerms = [];

        // find all terms the user wants to see
        for (var nodeObj in this.termsCheckboxesRef.childNodes) {
            if (this.termsCheckboxesRef.childNodes[nodeObj].tagName == "SPAN" && this.termsCheckboxesRef.childNodes[nodeObj].getElementsByTagName('input')[0].checked) {
                desiredTerms.push(this.termsCheckboxesRef.childNodes[nodeObj].getElementsByTagName('input')[0].name);
            }
        }

        var newArray = [];

        // update the objects we grab based on user selection
        for (var dataObj in this.props.dataArray) {
            for (var term in this.props.dataArray[dataObj].terms_on) {
                if (desiredTerms.includes(totalData[dataObj].terms_on[term]) && !newDataArray.includes(this.props.dataArray[dataObj])) {
                    newArray.push(this.props.dataArray[dataObj]);
                }
            }
        }
        this.allPeopleRef.setState({
            reactDataArray: newArray
        });
        $("#sort").slideUp();
        $("#filter").slideUp();
    }

    // FILTER FUNCTION: only show people if they worked on the project the user selects
    filterProjects() {
        var desiredProjects = [];

        // find all projects the user wants to see
        for (var nodeObj in this.projectsCheckboxesRef.childNodes) {
            if (this.projectsCheckboxesRef.childNodes[nodeObj].tagName == "SPAN" && this.projectsCheckboxesRef.childNodes[nodeObj].getElementsByTagName('input')[0].checked) {
                desiredProjects.push(this.projectsCheckboxesRef.childNodes[nodeObj].getElementsByTagName('input')[0].name);
            }
        }

        var newArray = [];

        // update the objects we grab based on user selection
        for (var dataObj in this.props.dataArray) {
            for (var proj in this.props.dataArray[dataObj].project) {
                if (desiredProjects.includes(this.props.dataArray[dataObj].project[proj]) && !newDataArray.includes(this.props.dataArray[dataObj])) {
                    newDataArray.push(this.props.dataArray[dataObj])
                }
            }
        }

        this.allPeopleRef.setState({
            reactDataArray: newArray
        });
        $("#sort").slideUp();
        $("#filter").slideUp();
    }
}

module.exports = App;

// // trigger function for when user presses enter in name contains text field - basically just click the submit button for them
// document.getElementById('name-contains-input').onkeypress=function(e) {
//     if(e.keyCode==13){
//         document.getElementById('name-contains-submit').click();
//     }
// }
