import React, { Component } from 'react';
import './row.css';
import Brick from "../brick/brick.jsx";

class Row extends Component {

    state = { row: this.props.row }

    render() { 

        let bricks = [];

        for(let i = 0; i < (14 + this.props.oddOrEven); i++){
            bricks.push(<Brick layout={this.props.layout} row={this.state.row} cell={i} key={i} updateLayout={this.props.updateLayout}/>)
        }

    return ( <div className="row">{bricks}</div> );
    }
}
 
export default Row;