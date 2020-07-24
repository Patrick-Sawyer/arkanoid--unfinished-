import React, { Component } from 'react';
import "./grid.css";
import Row from "../row/row.jsx";

class Grid extends Component {

    state = { layout: this.props.layout }

    render() { 

        let rows = [];
        for(let i = 0; i < 10; i++){
            rows.push(<Row oddOrEven={i % 2} layout={this.state.layout} row={i} key={i} updateLayout={this.props.updateLayout}/>)
        }

        return ( 
            <div className="grid">{rows}</div>
         );
    }
}
 
export default Grid;

