import React, {Component} from 'react';
import InactivityTimer from './InactivityTimer';
export default class EditArea extends Component {
    //parent = null;
    constructor(props) {
        super(props);
      //  this.hello = this.hello.bind(this);
      //  const callback = this.props.saveComments;
      //  this.state = {myTimer: new InactivityTimer(5550, this.hello)};
        this.state = {myTimer: new InactivityTimer(5550, this.props.callback)};
        this.handleChange = this.handleChange.bind(this);


        setInterval(function () {
            this.state.myTimer.increment(1000)
        }.bind(this), 1000);
    }

    handleChange(event) {

        this.state.myTimer.reset();
        console.log(event.target.value);
    }

    render() {

        return (
            <textarea rows="5"
                      className="edit-area"
                      name="comment"
                      placeholder="Add new comment here..."
                      ref="valuable_comment"
                      onKeyPress={this.handleChange}
            />
        )
    }

}


