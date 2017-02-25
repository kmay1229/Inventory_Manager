// src/components/Forms/additem.js
import React, { PropTypes, Component } from 'react';
//controlled component
class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vendor: '',
            itemnum:'',
            desc:'',
            cost:'',
            orderunit:'',
            checkoutunit:'',
            convert:'',
            barcode:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit(e) {
        alert('Data Submitted to Table');
        e.preventDefault();
    }

    render() {
        return (
            <form className="additem" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <h1>Add New Item Type</h1>
                <div className="column">
                    <ul>
                    <li>
                    <label>Vendor:</label>
                    <input  type="text"
                            name="vendor"
                            value={this.state.value}
                            required
                            />
                    <span>Enter vendor name</span>
                    </li>
                    <li>
                    <label>Item #:</label>
                    <input  type="text"
                            name="itemnum"
                            value={this.state.value} 
                            required
                            />
                    <span>Enter item number</span>
                   </li>
                   <li>
                   <label>Item Description:</label>
                   <input  type="text"
                           name="desc"
                           value={this.state.value}
                           required
                           />
                           <span>Enter brief description</span>
                   </li>
                   <li>
                   <label class="currencyinput"> Cost: $</label>
                   <input  name="cost"  
                           value={this.state.value}
                           type="number" 
                           name="currency"
                           step="0.01"
                           required
                           />
                           <span>Enter cost on item list</span>
                    </li>
                    </ul>
                </div>
                <div className="column">
                    <ul>
                    <li>
                    <label>Order/Check-In Unit:</label>
                    <input  type="text"
                            name="orderunit"
                            value={this.state.value}
                            required
                            />
                            <span>E.g. case, box, pack</span>
                    </li>
                    <li>
                    <label>Check-Out unit:</label>
                    <input  type="text"
                            name="checkoutunit"
                            value={this.state.value}
                            required
                            />
                            <span>E.g. case, box, pack</span>
                    </li>
                    <li>
                    <label>Check-Out to Check-In Conversion: </label>
                    <input  type="number"
                            name="convert"
                            value={this.state.value}
                            required
                            />
                            <span>E.g. # of boxes in case</span>
                    </li>
                    <li>
                    <label>Barcode:</label>
                    <input  type="text"
                            name="barcode"
                            value={this.state.value}
                            required
                            />
                    <span>E.g. # of boxes in case</span>
                    </li>
                  </ul>
                </div>
                <input className="button" type="submit" value="Submit" />
            </form>
    );
        }
}

export default AddItem;