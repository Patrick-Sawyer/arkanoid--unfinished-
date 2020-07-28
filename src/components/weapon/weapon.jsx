import React, { Component } from 'react';

let weaponsArray = [
    "GUN",
    "WIDE",
    "NARROW",
    "FAST",
    "SLOW",
    "BALLS"
]

class Weapon extends Component {
    state = { 
        type: this.props.type 
    }
    render() { 
        return ( <div>
            {weaponsArray[this.state.type]}
        </div> );
    }
}
 
export default Weapon;
