import React, { PropTypes, Component } from 'react';
import EditableCell from './editablecell.js';
import SelectCell from './selectcell.js';
import styles from './table.css';

export default class VendorRow extends Component {
    confClick() {
        let c = confirm("Are you sure you want to delete this vendor?");
        if (c) {
            this.props.onDelEvent(this.props.vendor);
        }
    }

    render() {
        return (
          <tr className={styles.vendor}>
                 <EditableCell type='text'
                    onTableUpdate={this.props.onTableUpdate} cellData = {{
                        cell: "vendor",
                        value: this.props.vendor.vendor,
                        id: this.props.vendor.id,
                    }} />            
                <input type="button"
                onClick={this.confClick.bind(this)} value="X" className="del-btn"
                />
            </tr>
        );
    }
}