import React, { Component } from 'react';
import PersonPreview from './PersonPreview.js';

// shows individual divs for each person received in the data
class AllPeople extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reactDataArray: this.props.dataArray,
            order: 'default'
        };
    }
    render() {
        // construct an array of PersonPreview components
        var allObjects = [];
        let newObj;

        for (var i in this.state.reactDataArray) {
            newObj = <PersonPreview personObj={this.state.reactDataArray[i]} key={i} />;
            allObjects.push(newObj);
        }

        return allObjects;
    }
}

export default AllPeople;
