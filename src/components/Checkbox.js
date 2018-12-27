import React, { Component } from 'react';

// ReactJS class for an individual checkbox
class Checkbox extends Component {
    render() {
        return (
            <span className="checkbox-span">
                <input type="checkbox" className="checkbox" id={"checkbox-" + this.props.name} name={this.props.name} onClick={this.clicked} ref={this.checkboxRef} />{this.props.name}
                <br />
            </span>
        );
    }
}

export default Checkbox;
