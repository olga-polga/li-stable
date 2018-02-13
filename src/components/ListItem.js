import React, {Component} from 'react';
import {connect} from "react-redux";
import {selectListingAction} from "../actions";

class ListItem extends Component {
    render() {
        return (
            <li className={this.props.id === this.props.selected ? 'selected':'list-item'}  onClick={() => this.props.handleClick(this.props.id)}>
                <span>{this.props.value}</span>
            </li>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    selected: state.selection,
});



const mapDispatchToProps = {
    selectListingAction,
};


export default connect(mapStateToProps, mapDispatchToProps)(ListItem);