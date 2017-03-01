import React, { PropTypes, Component } from 'react';

export default class SearchBar extends React.Component {
    handleChange() {
        this.props.onUserInput(this.refs.filterTextInput.value);
    }

    render() {
        return (
          <div>
            <h1>Manage Inventory Database</h1>
            <label>Search Part #: </label> <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
        </div>
        );
  }

}
