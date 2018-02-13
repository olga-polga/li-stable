import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItem from './ListItem';
import {selectListingAction} from '../actions';


class Listings extends Component {
    loadImages() {
        console.log("loading images...")
    }

    renderItems() {
        if (this.props.listings !== undefined) {
            return this.props.listings.houses.map((item) =>
                <ListItem key={item.id} id={item.id} value={item.address}
                          handleClick={()=> this.props.selectListingAction(item)}/>);
        }
    }

    render() {
        return (
            <ul>
                {this.renderItems()}
            </ul>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    listings: state.listings,
});



const mapDispatchToProps = {
    selectListingAction,
};


export default connect(mapStateToProps, mapDispatchToProps)(Listings);



