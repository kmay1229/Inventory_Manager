// src/check.js
import React, { PropTypes, Component } from 'react';
import styles from './check.css';


//controlled component
export default class Check extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barcode: '',
            quantity:1
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit(e) {
        alert(this.state.quantity + 'of item ' + this.state.barcode + ' was added to the inventory');
        e.preventDefault();
    }

    render() {
        return (
                <form className={styles.check} onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <h1>{this.props.title}</h1>
                    <div className="column">
                     <ul>
                     <li>
                        <label>Scan Barcode:</label>
                        <input  type="text"
                                name="barcode"
                                value={this.state.value}
                                required
                                />
                        <span>Scan barcode here</span>
                    </li>
                    </ul>
                    </div>
                    <div className="column">
                    <ul>
                    <li>
                     <label>Select Quantity:</label>
                     <input    type="number" 
                               name="quantity"
                               value={this.state.value} 
                               min="1"
                               required />
                    <span>Type or press up/down on right side</span>
                    </li>
                    </ul>
                    </div>
                    <input type="submit" value="Submit" />
              </form>
    );
                }
}

Check.propTypes = {
    title: React.PropTypes.string.isRequired,
    add: React.PropTypes.bool.isRequired
}