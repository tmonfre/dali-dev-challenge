class AllPeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = {order: 'default'};
      }
    render() {
        var allObjects = [];
        let newObj;

        for (var i in this.props.dataArray) {
            newObj = (<PersonPreview personObj={this.props.dataArray[i]} key={i} />);
            allObjects.push(newObj);
        }

        return allObjects;
    }
}
