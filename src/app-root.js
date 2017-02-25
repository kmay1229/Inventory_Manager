import React, { PropTypes, Component } from 'react';
import ViewChange from "./viewchange.js";
import AddItem from './additem.js';
import Check from './check.js';
import DisplayTable from './displaytable.js';

//Statefull component with functions to change state. Passes props to button for onclick func and title
const style = {
    textAlign:'center',
    fontSize: 20,
    color:'#595858'
}

export default class App extends Component {
    // static propTypes = {}
    // static defaultProps = {}

    constructor(props) {
        super(props);
        this.state = {
            view : {
                checkOut: false,
                checkIn: false,
                vendorTable: false,
                productTable: false, 
            },
            products : [ 
            {
                id: 1,
                category: 'Sporting Goods',
                price: '49.99',
                qty: 12,
                name: 'Football'
            }, {
                id: 2,
                category: 'Sporting Goods',
                price: '9.99',
                qty: 15,
                name: 'Baseball'
            }, {
                id: 3,
                category: 'Sporting Goods',
                price: '29.99',
                qty: 14,
                name: 'Basketball'
            }, {
                id: 4,
                category: 'Electronics',
                price: '99.99',
                qty: 34,
                name: 'iPod Touch'
            }, {
                id: 5,
                category: 'Electronics',
                price: '399.99',
                qty: 12,
                name: 'iPhone 5'
            }, {
                id: 6,
                category: 'Electronics',
                price: '199.99',
                qty: 23,
                name: 'Nexu 7'
            }
            ]
        }
    }


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
 
    //a function passed as props to handle add row event
    handleAddEvent(evnt) {
        let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        let product = {
            id: id,
            name: "",
            price: "",
            category: "",
            qty: 0
        }
        this.state.products.push(product);
        this.setState(this.state.products);

    }
    
    handleProductTable(evt) {
        var item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        var products = this.state.products;

        var newProducts = products.map(function(product) {
            for (var key in product) {
                if (key == item.name && product.id == item.id) {
                    product[key] = item.value;
                }
            }
            return product;
        });
        this.setState(newProducts);
        console.log(this.state.products);
    };

    render() {
        //view based on state allows multiple view elements rendered
        let show = "null"

        if(this.state.view.checkOut) {
            show = <Check title='Check-Out Item' add={false} />
            } else if (this.state.view.checkIn) {
            show = <Check title='Check-In Item' add={true} />
            } else if (this.state.view.productTable) {
                show = <DisplayTable 
                          onRowAdd={this.handleAddEvent.bind(this)}
                          products={this.state.products}
                          onProductTableUpdate={this.handleProductTable.bind(this)}
                        />
            } else if (this.state.view.vendorTable) {
                show = 'vendor table'
            } else {
                show = 'default'
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
