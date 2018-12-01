var React = require('react');
var Checkbox = require('../components/Checkbox');

// checkboxes to allow user to filter based on the project each person worked in the lab
class ProjectsCheckboxes extends React.Component {
    constructor(props) {
        super(props);
        this.projectsArray = []; // all possible terms that we found in the data

        // loop through all objects we receive and ensure we put all possible projects in projectsArray
        for (var dataObj in this.props.totalData) {
            for (var projInObj in this.props.totalData[dataObj].project) {
                if (!this.projectsArray.includes(this.props.totalData[dataObj].project[projInObj]) && this.props.totalData[dataObj].project[projInObj] != "") {
                    this.projectsArray.push(this.props.totalData[dataObj].project[projInObj]);
                }
            }
        }

        // sort the array of projects alphabetically
        this.projectsArray.sort(function(a,b) {
            if(a < b) { return -1; }
            if(a > b) { return 1; }
            return 0;
        });
    }

    // construct Checkbox objects for each possible project
    render() {
        var allObjects = [];
        let newObj;

        for (var i in this.projectsArray) {
            newObj = (<Checkbox name={this.projectsArray[i]} key={i} />);
            allObjects.push(newObj);
        }

        return allObjects;
    }
}
