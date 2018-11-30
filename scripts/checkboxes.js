// checkboxes to allow user to filter based on the term each person worked in the lab
class TermsInLabCheckboxes extends React.Component {
    constructor(props) {
        super(props);
        this.termsArray = []; // all possible terms that we found in the data

        // loop through all objects we receive and ensure we put all possible terms in termsArray
        for (var dataObj in this.props.totalData) {
            for (var termInObj in this.props.totalData[dataObj].terms_on) {
                if (!this.termsArray.includes(this.props.totalData[dataObj].terms_on[termInObj])) {
                    this.termsArray.push(this.props.totalData[dataObj].terms_on[termInObj]);
                }
            }
        }

        // sort the array of terms alphabetically
        this.termsArray.sort(function(a,b) {
            if(a < b) { return -1; }
            if(a > b) { return 1; }
            return 0;
        });
    }

    // construct Checkbox objects for each possible term
    render() {
        var allObjects = [];
        let newObj;

        for (var i in this.termsArray) {
            newObj = (<Checkbox name={this.termsArray[i]} key={i} />);
            allObjects.push(newObj);
        }

        return allObjects;
    }
}

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

// ReactJS class for an individual checkbox
class Checkbox extends React.Component {
    render() {
        return (
            <span className="checkbox-span">
                <input type="checkbox" className="checkbox" id={"checkbox-" + this.props.name} name={this.props.name} onClick={this.clicked} ref={this.checkboxRef} />{this.props.name}
                <br />
            </span>
        );
    }
}
