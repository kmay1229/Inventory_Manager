// src/components/App/viewchange.js

import React, { PropTypes, Component } from 'react';

const normalStyle = {
    backgroundColor : '#ff3300',
    fontSize: 16,
    color : 'white',
    padding: '10px 25px',
    borderRadius: '10px',
    boxShadow: '0 3px #999',
}

const hoverStyle = {
    backgroundColor : '#ef2f00',
    fontSize: 16,
    color : 'white',
    padding: '10px 25px',
    borderRadius: '10px',
    boxShadow: '0 3px #999',
}

const activeStyle = {
    backgroundColor : '#ce2900',
    fontSize: 16,
    color : 'white',
    padding: '10px 25px',
    borderRadius: '10px',
    boxShadow: '0 0 #666',
}

export default class ViewChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            active: false
        }
    }
        toggleHover () {
            this.setState({hover: !this.state.hover})
        }

        toggleActive () {
            this.setState({active: !this.state.active})
        }
        render() {
            
            let style = normalStyle;

            if(this.state.active){
                style = activeStyle;
            } else if(this.state.hover) {
                style = hoverStyle;
            } else {
                style = normalStyle;
            }

            return (
               <button 
                    onMouseEnter={this.toggleHover.bind(this)}
                    onMouseLeave={this.toggleHover.bind(this)} 
                    onMouseDown={this.toggleActive.bind(this)} 
                    onMouseUp={this.toggleActive.bind(this)}
                    style={style} 
                    className='button-link' 
                    onClick={this.props.onClick}
                    >
                    {this.props.title} 

                        </button>
          );
               }
};
