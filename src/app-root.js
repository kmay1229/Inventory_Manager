import React, { PropTypes, Component } from 'react';
import ViewChange from "./viewchange.js";
import AddItem from './additem.js';
import Check from './check.js';
import DisplayTable from './displaytable.js';
import SearchBar from './searchbar.js';
import VendorTable from './vendortable.js';

const style = {
    textAlign:'center',
    fontSize: 20,
    color:'#595858'
}

//Statefull component with functions to change state. Passes props to children for function callbacks. Contains most of the operation logic of the app


export default class App extends Component {
    // static propTypes = {}
    
    constructor(props) {
        super(props);
        this.state = {
            //states for views
            view : {
                checkOut: false,
                checkIn: false,
                vendorTable: false,
                productTable: false, 
            },
            //state for search bar text
            filterText : "",
            //states for check in/check out barcode/qty
            barcode : '',
            checkqty: 1,
            //states for list of vendor. ID 0 is placeholder so that if a row is deleted, default value will be id 0. Id 0 is not displayed in manage vendor table
            vendorList : [
            {
                id: 0,
                vendor:'######',
            },
            {
                id: 1,
                vendor:'Agilent',
            }, {
                id:2,
                vendor:'Fisher'
            }, {
                id:3,
                vendor:'VWR' 
            }, {
                id:4,
                vendor:'Subway'
            }],
            //product object array
            products : [ 
            {
                id: 1,
                partnum:'1235',
                desc: 'column',
                barcode: '9999999',
                vendor: 'Agilent',
                price: '500',
                orderunit:'column',
                checkoutunit: 'column',
                checkoutconv: 1,
                qty: 12,
                minqty: 20
                
            }, {
                id: 2,
                partnum:'2345',
                desc: 'tube',
                barcode: '8888888',
                vendor: 'Fisher',
                price: '49.99',
                orderunit:'case',
                checkoutunit: 'box',
                checkoutconv: 10,
                qty: 10,
                minqty: 10
            }, {
                id: 3,
                partnum:'9876',
                desc: 'ACN',
                barcode: '77777',
                vendor: 'Fisher',
                price: '167.99',
                orderunit:'case',
                checkoutunit: 'bottle',
                checkoutconv: 4,
                qty: 10,
                minqty: 5
            }, {
                id: 4,
                partnum:'3456',
                desc: 'vial',
                barcode: '445664',
                vendor: 'VWR',
                price: '100.99',
                orderunit:'case',
                checkoutunit: 'box',
                checkoutconv: 100,
                qty: 1,
                minqty: 100
            }, {
                id: 5,
                partnum:'4567',
                desc: 'sandwich',
                barcode: '2132345',
                vendor: 'Subway',
                price: '9.99',
                orderunit:'footlong',
                checkoutunit: '6inch',
                checkoutconv: 2,
                qty: 4,
                minqty: 6
            }
            ]
        }
    }

    //for search bar
    handleUserInput(filterText) {
        this.setState({filterText: filterText});
    };

    //based on <ViewChange /> click, displays associated view. setState placed after loop because state doesn't update immediately, so loop would repull existing state for each iteration
    handleClick (key) {
        let view = this.state.view
        for (let a in view) {
            if(a === key) {   
                view[a] = true;
            } else {
                view[a] = false;
            }
        }
        this.setState(view)
    }

    //onChange for product table, updates values changed and sets new state
    handleProductTable(e) {
        let item = {
            id: e.target.id,
            name: e.target.name,
            value: e.target.value
        };
        let products = this.state.products;
        let newProducts = products.map(function(product) {
            for (let key in product) {
                if (key == item.name && product.id == item.id) {
                    product[key] = item.value;
                }
            }
            return product;
        })
        this.setState(newProducts);
    }

    //onChange for vendor table, updates values changed and sets new state
    handleVendorTable(e) {
        let input = {
            id: e.target.id,
            name: e.target.name,
            value: e.target.value
        };
        let products = this.state.products
        let vendors = this.state.vendorList;
        let newVendors = vendors.map(function(vendor) {
            for (let key in vendor) {  
                if (key == input.name && vendor.id == input.id) {
                    for (let keyb in products){
                        if (products[keyb].vendor == vendor[key]) {
                            products[keyb].vendor = input.value;
                        }
                    }
                    vendor[key] = input.value;
                }
            }
            return vendor;
        })
        this.setState(newVendors)
        this.setState(products)
    }

    //bound to vendor add row button, creates new vendor with new id and default values. Pushes to vendor array and setStates.
    handleAddVendorEvent() {
        let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        let vendor = {
            id: id,
            name:'',
        }
        this.state.vendorList.push(vendor);
        this.setState(this.state.vendorList);
    }

    //bound to product add row button, creates new product with new id and default values. Pushes to product array and setStates.
    handleAddItemEvent() {
        let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        let product = {
            id: id,
            partnum:'',
            desc: '',
            barcode: '',
            vendor: '',
            price: '',
            orderunit:'',
            checkoutunit: '',
            checkoutconv: 1,
            qty: 0,
            minqty: 0
        }
        this.state.products.push(product);
        this.setState(this.state.products);
    }

    //simple splice function to delete row from item table
    handleRowDel(product) {
        var index = this.state.products.indexOf(product);
        this.state.products.splice(index, 1);
        this.setState(this.state.products);
    }

    //simple splice function to delete row from vendor table
    handleVendorRowDel(vendor) {
        let vendors = this.state.vendorList
        var index = vendors.indexOf(vendor);
        vendors.splice(index, 1);
        let products = this.state.products
        
        for (let key in products) {
            let match = false
            for (let keyb in vendors) {
                if(products[key].vendor == vendors[keyb].vendor) {
                    match = true
                }
            }
            if(!match) {
                products[key].vendor = true
            }
        }
        this.setState(products)
        this.setState(this.state.vendorList);
    }

    //onSubmit function passed to check.js to subtract using checkout conversion values
    handleCheckOut(e) {
        e.preventDefault()
        let barcode = this.state.barcode
        let products = this.state.products
        let qty = this.state.checkqty
                for (let key in products) {
            if(products[key].barcode == barcode) {
                let checkOut = qty / products[key].checkoutconv
                products[key].qty -= checkOut
                alert(checkOut + " of a " + products[key].orderunit + ' or ' + qty + ' ' + products[key].checkoutunit + ' of item ' + barcode + ':' + products[key].desc + ' has been checked out')
            }
        }
        this.setState(products)
        
    }

    //onSubmit function passed to check.js to add using order in value
    handleCheckIn(e) {
        e.preventDefault()
        let barcode = this.state.barcode
        let products = this.state.products
        let qty = this.state.checkqty

        for (let key in products) {
            if(products[key].barcode == barcode) {
                products[key].qty += qty
                alert(qty + ' of a ' + products[key].orderunit + ' of item ' + barcode + ':' + products[key].desc + ' has been checked in' )
            }
        }
        this.setState(products);
    }

    //function passed to check.js that maintains state of check-in and check-out, for use with onSubmit function
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
       
        //view based on state allows multiple view elements rendered
        let show = "null"
        if(this.state.view.checkOut) {
            show = <Check 
                        title='Check-Out Item' 
                        handleSubmit={this.handleCheckOut.bind(this)} 
                        barcode={this.state.barcode} 
                        qty={this.state.checkqty} 
                        handleChange={this.handleChange.bind(this)}
                     />
        } else if (this.state.view.checkIn) {
            show = <Check 
                        title='Check-In Item' 
                        handleSubmit={this.handleCheckIn.bind(this)} 
                        barcode={this.state.barcode} 
                        qty={this.state.checkqty} 
                        handleChange={this.handleChange.bind(this)} 
                     />
        } else if (this.state.view.productTable) {
            show = 
                <div>
                    <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
                    <DisplayTable 
                        onRowAdd={this.handleAddItemEvent.bind(this)}
                        products={this.state.products}
                        onTableUpdate={this.handleProductTable.bind(this)}
                        onRowDel={this.handleRowDel.bind(this)}
                        filterText={this.state.filterText}
                        vendors={this.state.vendorList}
                    />
                </div>
         } else if (this.state.view.vendorTable) {
             show = 
                <VendorTable 
                    onRowAdd={this.handleAddVendorEvent.bind(this)}
                    vendorList={this.state.vendorList}
                    onTableUpdate={this.handleVendorTable.bind(this)}
                    onRowDel={this.handleVendorRowDel.bind(this)}
                />
        } else {
             show = ''
         }


        return (
            <div className='Banner' style={style}>
            <img src={require('./logo.png')}></img>
                <div>
                    <h2>Inventory Management Application</h2>
                    <p className="App-intro">To get started, select a task from the below:</p>
                    <ViewChange onClick={this.handleClick.bind(this, 'productTable')} title="Manage Items" />
                    <ViewChange onClick={this.handleClick.bind(this, 'vendorTable')} title="Manage Vendors"  />
                    <ViewChange onClick={this.handleClick.bind(this, 'checkIn')} title="Check-In Item" />
                    <ViewChange onClick={this.handleClick.bind(this, 'checkOut')} title="Check-Out Item" />
                </div>
                    {show}
        </div>
        );
    }
}
