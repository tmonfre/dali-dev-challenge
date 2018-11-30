// shows individual divs for each person received in the data
class AllPeople extends React.Component {
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

        for (var i in this.state.reactDataArray) {
            allObjects.push(this.state.reactDataArray.reactPersonPreviewObj);
        }

        return allObjects;
    }
}
