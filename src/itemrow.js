import React, { PropTypes, Component } from 'react';
import EditableCell from './editablecell.js';
import SelectCell from './selectcell.js';

export default class ItemRow extends Component {

    confClick() {
        let c = confirm("Are you sure you want to delete this item?");
        if (c) {
            this.props.onDelEvent(this.props.product);
        }
    }
    
    render() {
        let prodVendor = this.props.product.vendor;
        let options = this.props.vendors.map(function(vendor) {
            if(vendor.vendor == prodVendor) {
                return (<option value={vendor.vendor} key={vendor.id} > {vendor.vendor} </option>
                );
            } else {
                return (<option key={vendor.id} > {vendor.vendor} </option>)
            }    
    })
        return (
          <tr className="item">
            <EditableCell type='text'
                onTableUpdate={this.props.onTableUpdate} cellData = {{
                    cell: "partnum",
                    value: this.props.product.partnum,
                    id: this.props.product.id,
            }} />
            <EditableCell 
                type='text'
                onTableUpdate={this.props.onTableUpdate} cellData={{
                    cell: "desc",
                    value: this.props.product.desc,
                    id: this.props.product.id,
                }}/>
            <SelectCell options={options} onTableUpdate={this.props.onTableUpdate} cellData={{
                cell: "vendor",
                value: this.props.product.vendor,
                id: this.props.product.id,
            }}/>
            <EditableCell 
                type='number'
                onTableUpdate={this.props.onTableUpdate} cellData={{
                    cell: "price",
                    value: this.props.product.price,
                    id: this.props.product.id,
                }}/>
                <EditableCell 
                type='text'
                onTableUpdate={this.props.onTableUpdate} cellData={{
                    cell: "orderunit",
                    value: this.props.product.orderunit,
                    id: this.props.product.id,

                }}/>
                <EditableCell 
                type='text'
                onTableUpdate={this.props.onTableUpdate} cellData={{
                    cell: "checkoutunit",
                    value: this.props.product.checkoutunit,
                    id: this.props.product.id,
                }}/>
            <EditableCell 
                type='number'
                onTableUpdate={this.props.onTableUpdate} cellData={{
                    cell: "checkoutconv",
                    value: this.props.product.checkoutconv,
                    id: this.props.product.id,
            }}/>
            <EditableCell 
                type='text'
                onTableUpdate={this.props.onTableUpdate} cellData={{
                    cell: "barcode",
                    value: this.props.product.barcode,
                    id: this.props.product.id,
            }}/>
            <EditableCell 
                type='number'
                onTableUpdate={this.props.onTableUpdate} cellData={{
                    cell: "minqty",
                    value: this.props.product.minqty,
                    id: this.props.product.id,
            }}/>
            <EditableCell 
                type='number'
                onTableUpdate={this.props.onTableUpdate} cellData={{
                    cell: "qty",
                    value: this.props.product.qty,
                    id: this.props.product.id,
                }}/>
                
                <input type="button"
                onClick={this.confClick.bind(this)} value="X" className="del-btn"
                />
            </tr>
        );
    }
}
