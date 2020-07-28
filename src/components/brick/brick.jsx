import React, { Component } from 'react';
import Weapon from "../weapon/weapon.jsx";
import "./brick.css";

class Brick extends Component {
    state = { 
        broken: false,
        exists: false,
        color: null,
        weapon: false,
        row: this.props.row,
        cell: this.props.cell,
        layout: this.props.layout,
        position: 0,
        dropped: false,
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

                let weapon = Math.random() < 0.05 ? true : true;

                this.setState({
                    exists: true,
                    color: this.state.layout[i].color,
                    layoutIndex: i,
                    weapon: weapon,
                })

                this.props.updateLayout(i, "left", left);
                this.props.updateLayout(i, "right", right);
                this.props.updateLayout(i, "top", top);
                this.props.updateLayout(i, "bottom", bottom);
                this.props.updateLayout(i, "broken", false);
                this.props.updateLayout(i, "exists", true);
            }
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.layout !== this.props.layout && this.state.exists === true) {
            this.setState({
                layout: nextProps.layout,
                broken: nextProps.layout[this.state.layoutIndex].broken,
                exists: nextProps.layout[this.state.layoutIndex].exists,
            });
        }
        if(this.state.exists === false && this.state.weapon === true && this.state.dropped === false){
            this.releaseWeapon(this.state.layoutIndex)
            this.setState({
                dropped: true,
            })
        }
    }

    releaseWeapon = (index) => {
        console.log('test');
        let random = parseInt(Math.random() * 6);
        let weaponName;
        
        switch(random){
            case 0:
                weaponName = "GUN";
                break;
            case 1:
                weaponName = "FAST";
                break;
            case 2:
                weaponName = "SLOW";
                break;
            case 3:
                weaponName = "WIDE";
                break;
            case 4:
                weaponName = "NARROW";
                break;
            case 5:
                weaponName = "STICKY";
                break;
            default:
                weaponName = "GUN";
                break;
        }

        this.setState({
            weaponName: weaponName
        })

        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position + 3
                });
                if(this.state.position > this.state.layout[this.state.layoutIndex].bottom){
                    clearInterval(this.state.interval);
                    this.setState({
                        weaponName: "",
                    })
                }
            }, 10)
        })
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
                <div className="empty" style={{top: this.state.position}}>{this.state.weaponName}</div>
            )
        }
        
    }
}
 
export default Brick;