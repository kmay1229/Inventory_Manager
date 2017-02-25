import React, { PropTypes, Component } from 'react';
import EditableCell from './editablecell.js';

export default class ItemRow extends Component {
    render() {
        return (
          <tr className="item">
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData = {{
                type: "name",
                value: this.props.product.name,
                id: this.props.product.id
            }} />
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                type: "price",
                value: this.props.product.price,
                id: this.props.product.id
            }}/>
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                type: "qty",
                value: this.props.product.qty,
                id: this.props.product.id
            }}/>
            <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                type: "category",
                value: this.props.product.category,
                id: this.props.product.id
            }}/>
                <td className="del-cell">
                <input type="button" 
                //onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"
                />
                </td>
            </tr>
        );
    }
}