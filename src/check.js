// src/check.js
import React, { PropTypes, Component } from 'react';
import styles from './check.css';


//controlled component
export default class Check extends React.Component {

    render() {

        return (
                <form className={styles.check} onSubmit={this.props.handleSubmit} >
                    <h1>{this.props.title}</h1>
                    <div className="column">
                     <ul>
                     <li>
                        <label>Scan Barcode:</label>
                        <input  type="text"
                                name="barcode"
                                value={this.props.barcode}
                                onChange={this.props.handleChange}
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
                               name="checkqty"
                               value={this.props.qty} 
                               min="1"
                                onChange={this.props.handleChange}
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
