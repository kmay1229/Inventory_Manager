import React, { PropTypes, Component } from 'react';

export default class SelectCell extends React.Component {
    
    render() {


        return (
          <td>
            <select name={this.props.cellData.cell} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onTableUpdate}>
                {this.props.options}
            </select>
          </td>
        );

    }
}