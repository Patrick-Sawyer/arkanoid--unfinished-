import React, { Component } from 'react';
import "./brick.css";

class Brick extends Component {
    state = { 
        broken: true,
        exists: false,
        color: null,
        weapon: false,
        hard: false,
        row: this.props.row,
        cell: this.props.cell,
        layout: this.props.layout,
    }

    componentDidMount = () => {

        for(let i in this.state.layout){
            if(this.state.layout[i].row === this.state.row && this.state.layout[i].cell === this.state.cell){

                let bottom = 754 - (this.state.row + 1) * 30;
                let top = 754 - this.state.row * 30;
                let right = (this.state.cell + 1) * 70;
                let left = this.state.cell * 70;

                if(this.state.row % 2 === 0){
                    right += 35;
                    left += 35;
                }

                this.setState({
                    exists: true,
                    color: this.state.layout[i].color,
                    layoutIndex: i,
                })

                this.props.updateLayout(i, "left", left);
                this.props.updateLayout(i, "right", right);
                this.props.updateLayout(i, "top", top);
                this.props.updateLayout(i, "bottom", bottom);

                console.log(left, right, top, bottom);
            }
        }

    }

    broken = () => {
        if(this.state.broken === true){
            return (<div className="broken"></div>)
        }
    }

    render() { 

        if(this.state.exists === true){
            return ( 
                <div className={"brick " + this.state.color} id={"row" + this.state.row + "cell" + this.state.cell}>
                    {this.broken()}
                </div> 
            );
        }else{
            return (
                <div className="empty"></div>
            )
        }
        
    }
}
 
export default Brick;