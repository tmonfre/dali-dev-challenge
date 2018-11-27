class PersonPreview extends React.Component {
    render() {
        return (
            <div className="person grid-item">
                <img src={"http://mappy.dali.dartmouth.edu/" + this.props.personObj.iconUrl}/>
                <h3 className="name"><a href={this.props.personObj.url} target="_blank">{this.props.personObj.name}</a></h3>
                <p className="message">{this.props.personObj.message}</p>
                <p className="curr-project">{this.props.personObj.project}</p>
                <p className="terms-on">{this.props.personObj.terms_on}</p>
            </div>
        );
    }
}
