var React = require('react');
var Checkbox = require('../components/Checkbox');

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

module.exports = TermsInLabCheckboxes;
