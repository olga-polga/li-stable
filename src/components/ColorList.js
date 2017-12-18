

import React, {Component} from 'react';

export default class ColorList extends Component {
    render() {

        return (
            <ul>
                {this.props.colors.map(function (color) {
                    return <li key={color}>{color}</li>;
                })}
            </ul>
        )
    }
}