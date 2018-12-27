import React, { Component } from 'react';
import './NavBar.css';
var $ = require("jquery");

// ReactJS class to construct the navbar -- using react so one source of truth on nav bar even when in different files
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.resetData = this.resetData.bind(this);
    }
    render() {
        return (
			<div id="navbar-container">
                <div id="title-area">
                    <a href="index.html"><h1>Faces of the DALI Lab</h1></a>
                </div>
                <div id="button-area">
                    <h3 id="reset-button" onClick={this.resetData}>RESET</h3>
                    <h3 id="sort-button" onClick={this.showSortArea}>SORT</h3>
                    <h3 id="filter-button" onClick={this.showFilterArea}>FILTER</h3>
                </div>
			</div>
        );
    }

    showSortArea() {
        $("#sort").slideToggle();
    }

    showFilterArea() {
        $("#filter").slideToggle();
    }

    // reset filter area user inputs and data
    resetData() {
        this.props.appRef.resetButton();
    }
}

export default NavBar;
