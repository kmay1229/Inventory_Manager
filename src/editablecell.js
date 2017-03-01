import React, { PropTypes, Component } from 'react';

export default class EditableCell extends React.Component {

    render() {
        return (
          <td>
            <input type={this.props.type} name={this.props.cellData.cell} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onTableUpdate}/>
          </td>
        );
        }
}