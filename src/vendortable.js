// src/components/Forms/displaytable.js
import React, { PropTypes, Component } from 'react';
import VendorRow from './vendorrow.js';
import styles from './vendor.css';

//controlled component
export default class VendorTable extends React.Component {
    render() {
        var onTableUpdate = this.props.onTableUpdate;
        var rowDel = this.props.onRowDel;
        var vendor = this.props.vendorList.map(function(vendor) {
            if (vendor.id == 0) {
                return;
            } else {
                return (
                <VendorRow 
                    vendor={vendor} 
                    key={vendor.id} 
                    onTableUpdate={onTableUpdate} 
                    onDelEvent={rowDel.bind(this)}
                    />
                    )}      
                    })
            
            
        return (
            <div className={styles.vendor}>
            <h1>Manage Vendors</h1>
            <button className='addrow' type="button" onClick={this.props.onRowAdd}>Add Row</button>
                <table className ="table">
                    <thead>
                            <th>Vendor</th>
                    </thead>
                    <tbody>
                        {vendor}
                    </tbody>
                </table>
            </div>
    )
    }
}