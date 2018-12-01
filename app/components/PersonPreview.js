var React = require('react');

// shows a preview area for an individual person
class PersonPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true // is the person currently on screen
        }

        // create references to divs on screen
        this.dropDownArea = React.createRef();
        this.topDiv = React.createRef();

        // bind this to below functions
        this.showDropDownArea = this.showDropDownArea.bind(this);
        this.mouseEnterStyling = this.mouseEnterStyling.bind(this);
        this.mouseLeaveStyling = this.mouseLeaveStyling.bind(this);
    }

    render() {
        return (
            <div className="person grid-item" ref={this.topDiv} onMouseEnter={this.mouseEnterStyling} onMouseLeave={this.mouseLeaveStyling} onClick={this.showDropDownArea}>
                <img src={"http://mappy.dali.dartmouth.edu/" + this.props.personObj.iconUrl}/>
                <h3 className="name">{this.props.personObj.name}</h3>
                <p className="message">{this.props.personObj.message}</p>
                <div className="drop-down-area" ref={this.dropDownArea}>
                    <p className="curr-project">{this.props.personObj.project}</p>
                    <p className="terms-on">{this.props.personObj.terms_on}</p>
                    <p className="website"><a href={this.props.personObj.url} target="_blank">Website</a></p>
                    <p className="lat-long">{this.props.personObj.lat_long[0] + ", " + this.props.personObj.lat_long[1]}</p>
                </div>
            </div>
        );
    }

    // add mouse-hover class for when user puts mouse over this component
    mouseEnterStyling() {
        this.topDiv.current.classList.add('mouse-hover');
    }

    // remove class on mouse leave
    mouseLeaveStyling() {
        this.topDiv.current.classList.remove('mouse-hover');
    }

    // slide the drop down area down on mouse click
    showDropDownArea() {
        jQuery(this.dropDownArea.current).slideToggle();
    }
}

module.exports = PersonPreview;
