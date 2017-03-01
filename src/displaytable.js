// src/components/Forms/displaytable.js
import React, { PropTypes, Component } from 'react';
import ItemRow from './itemrow.js';
import styles from './table.css';

//controlled component
export default class DisplayTable extends React.Component {
    render() {
        let onTableUpdate = this.props.onTableUpdate;
        let rowDel = this.props.onRowDel;
        let filterText = this.props.filterText;
        let vendors = this.props.vendors;
        let product = this.props.products.map(function(product) {
            if (product.partnum.indexOf(filterText) === -1) {
                return
            } else {
                return (
                    <ItemRow 
                        product={product} 
                        key={product.id} 
                        onTableUpdate={onTableUpdate} 
                        onDelEvent={rowDel.bind(this)}
                        vendors={vendors}
                    />
                    )
                    }
                })
        return (
            <div className={styles.table}>
            <button className='addrow' type="button" onClick={this.props.onRowAdd}>Add Row</button>
                <table className ="table">
                    <thead>
                            <th>Part Numbers</th>
                            <th>Item Desc</th>
                            <th>Vendor</th>
                            <th>Price</th>
                            <th>Order Unit</th>
                            <th>Check-Out Unit</th>
                            <th>Conversion Factor</th>
                            <th>Barcode</th>
                            <th>Min. Quantity</th>
                            <th>Actual Quantity</th>
                    </thead>
                    <tbody>
                        {product}
                    </tbody>
                </table>
            </div>
    )
    }
}
