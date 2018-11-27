class NavBar extends React.Component {
    render() {
        return (
			<div id="navbar-container">
                <div id="title-area">
                    <a href="index.html"><h1>Faces of the DALI Lab</h1></a>
                </div>
                <div id="button-area">
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
}

ReactDOM.render(<NavBar />, document.getElementById('navbar'));
