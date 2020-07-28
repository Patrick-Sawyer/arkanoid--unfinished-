import React, { Component } from 'react';
import Grid from "../grid/grid.jsx";
import Message from "../message/message.jsx";
import Slider from "../slider/slider.jsx";
import Ball from "../ball/ball.jsx";
import "./game.css";

let level1 = [
    {
        row: 0,
        cell: 0,
        color: "blue",
        weapon: true,
        broken: false
    },
    {
        row: 1,
        cell: 12,
        color: "purple",
        weapon: true,
        broken: false
    },
    {
        row: 5,
        cell: 9,
        color: "yellow",
        weapon: true,
        broken: false
    },
    {
        row: 2,
        cell: 2,
        color: "blue",
        weapon: true,
        broken: false
    },
    {
        row: 4,
        cell: 4,
        color: "purple",
        weapon: true,
        broken: false
    },
    {
        row: 6,
        cell: 8,
        color: "yellow",
        weapon: true,
        broken: false
    },
];

class Game extends Component {
    state = { 
        ballPosition: [488, 76],
        stuck: true,
        gameInterval: null,
        direction: [0, 1],
        speed: 5,
        platformRange: [425, 625],
        layout: level1
    }

    updateBallPosition = (axis, position) => {

        if(axis === "X"){
            position = this.contactCheckX(position);
            if(position >= 1025){
                position = 1025;
                this.flipX();
            }
            if(position <= 0){
                position = 0;
                this.flipX();
            }
            this.setState({
                ballPosition: [position, this.state.ballPosition[1]]
            })
        }else if(axis === "Y"){
            position = this.contactCheckY(position);
            if(position >= 754){
                position = 754;
                this.flipY();
            }
            if(position <= 76 && this.ballPlatformCheck() === true){
                position = 76;
                this.flipY();
            }
            this.setState({
                ballPosition: [this.state.ballPosition[0], position]
            })
        }

    }

    contactCheckX = (position) => {
        for(let i in this.state.layout){
            if(this.state.ballPosition[1] >= (this.state.layout[i].bottom) && this.state.ballPosition[1] <= (this.state.layout[i].top + 25)){
                if(position >= (this.state.layout[i].left - 25) && position <= (this.state.layout[i].right)){
                    this.flipX();
                    if(this.state.direction[0] > 0){
                        return (this.state.layout[i].right + 1);
                    }else{
                        return (this.state.layout[i].left - 26);
                    }
                }
            }
        }

        return position;
    }

    contactCheckY = (position) => {
        for(let i in this.state.layout){
            if(this.state.ballPosition[0] >= (this.state.layout[i].left - 25) && this.state.ballPosition[0] <= (this.state.layout[i].right)){
                if(position >= (this.state.layout[i].bottom) && position <= (this.state.layout[i].top + 25)){
                    this.flipY();
                    if(this.state.direction[1] > 0){
                        return (this.state.layout[i].top + 26);
                    }else{
                        return (this.state.layout[i].bottom - 1);
                    }
                }
            }
        }

        return position;
    }

    ballPlatformCheck = () => {
        if(this.state.ballPosition[0] > this.state.platformRange[0] - 25 && this.state.ballPosition[0] < this.state.platformRange[1] - 50){
            this.directionAfterPlatformContact();
            return true
        }else{
            return false
        }
    }

    directionAfterPlatformContact = () => {

        let positionRatio = ((this.state.ballPosition[0] - this.state.platformRange[0] + 25)/(this.state.platformRange[1] - this.state.platformRange[0] - 25)).toFixed(3);
        let x = positionRatio * 2 - 1;
        this.setState({
            direction: [parseFloat(x.toFixed(2)), this.state.direction[1]]
        })
    }

    updatePlatformRange = (left, right) => {
        this.setState({
            platformRange: [left, right]
        })
    }

    flipY = () => {
        this.setState({
            direction: [this.state.direction[0], 0 - this.state.direction[1]]
        })
    }

    flipX = () => {
        this.setState({
            direction: [0 - this.state.direction[0], this.state.direction[1]]
        })
    }

    startGame = () => {
        this.setState({
            gameInterval: setInterval(() => {
                this.moveBall()
            }, 10),
            stuck: false
        })
    }

    moveBall = () => {
        let speedMultiplier = 1/Math.sqrt(this.state.direction[0] * this.state.direction[0] + this.state.direction[1] * this.state.direction[1])
        this.updateBallPosition('X', this.state.ballPosition[0] + parseInt(this.state.direction[0] * this.state.speed * speedMultiplier));
        this.updateBallPosition('Y', this.state.ballPosition[1] + parseInt(this.state.direction[1] * this.state.speed * speedMultiplier));
    }

    updateLayout = (index, key, value) => {
        let layoutCopy = [...this.state.layout];
        layoutCopy[index][key] = value;
        this.setState({
            layout: layoutCopy
        })
        console.log(this.state.layout);
    }

    render() { 
        return ( <div className="game">
            <Message />
            <Grid layout={this.state.layout} updateLayout={this.updateLayout}/>
            <Ball ballPosition={this.state.ballPosition} updateBallPosition={this.updateBallPosition} stuck={this.state.stuck}  startGame={this.startGame}/>
            <Slider updateBallPosition={this.updateBallPosition} stuck={this.state.stuck} updatePlatformRange={this.updatePlatformRange}/>      
        </div> );
    }
}
 
export default Game;