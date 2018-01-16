import React, {Component} from 'react';

export default class ListItem extends Component {
    render() {
        return (
            <li   className={this.props.id === this.props.selected ? 'selected':'list-item'}  onClick={() => this.props.handleClick(this.props.id)}>
                <span>{this.props.value}</span>
            </li>
        )
    }
}
