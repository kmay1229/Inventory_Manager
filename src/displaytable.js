// src/components/Forms/displaytable.js
import React, { PropTypes, Component } from 'react';
import ItemRow from './itemrow.js';
import styles from './check.css';

//controlled component
export default class DisplayTable extends React.Component {
    render() {
        var onProductTableUpdate = this.props.onProductTableUpdate;
        var product = this.props.products.map(function(product) {
            return <ItemRow product={product} key={product.id} onProductTableUpdate={onProductTableUpdate} />
            })
        return (
            <div className={styles.check}>
            <h1>Manage Inventory Database</h1>
            <button type="button" onClick={this.props.onRowAdd}>Add Row</button>
                <table className ="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product}
                    </tbody>
                </table>
            </div>
    )
    }
}
