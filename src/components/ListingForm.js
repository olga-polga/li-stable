import React, {Component} from 'react';
import {Icon} from 'react-fa'
export default class ListingForm extends Component {

    constructor(props) {
        super(props);
        this.state = { newListing: undefined };

        this._onChange = this._onChange.bind(this);
        this._onClick = this._onClick.bind(this);
    }

    _onClick(e) {

        this.props.addListing(this.state.newListing);

        // the input component is a child component of this form component
        // so this component maintains state for its own form, and also passes
        // along new data to it’s parent so the parent can maintain state for
        // the whole component
        //
        // because the form is self-contained in this component, the state for
        // form is maintained here, not the parent component
        this.setState({ newListing: undefined });
    }

    _onChange(e) {
        this.setState({ newListing: e.target.value });
    }

    render() {
        return (
            <form>
                <label>
                    <textarea rows="2"
                              className="edit-area"
                              name="newListing"
                              placeholder="New listing ..."
                              value={this.state.newListing} onChange={this._onChange}/>
                </label>
                    <Icon name="upload" size="lg" onClick={this._onClick} className="right-corner"/>

            </form>
        )
    }
}