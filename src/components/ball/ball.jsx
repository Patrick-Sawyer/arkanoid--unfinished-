import React, { Component } from 'react';
import './ball.css';

class Ball extends Component {
    state = { 
        stuck: this.props.stuck,
        center: false,
        ballPosition: this.props.ballPosition,
        updateBallPosition: this.props.updateBallPosition
    }

    image = () => {
        return (
            <img
            className="ball-image"
            src={require('../../images/ball.png')} 
            alt="" 
            width="25px" 
            height="25px" />
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ballPosition !== this.props.ballPosition) {
            this.setState({
                ballPosition: nextProps.ballPosition
            });
        }
        if (nextProps.stuck !== this.props.stuck) {
            this.setState({
                stuck: nextProps.stuck
            });
        }
    }

    positionCss = () => {
        return {left: this.state.ballPosition[0], bottom: this.state.ballPosition[1]}
    }

    componentDidMount(){
        document.addEventListener("keydown", this._handleKeyDown);
    }

    _handleKeyDown = (event) => {
        if(event.keyCode === 32){
            event.preventDefault();
            this._handleSpace()
        }
    }

    _handleSpace = () => {
        if(this.state.stuck === true){
            this.props.startGame();
        }
    }

    render() { 

        return ( 
        
        <div className="ball" style={this.positionCss()}>
            {this.image()}
        </div> );
    }
}
 
export default Ball;