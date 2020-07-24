import React, { Component } from 'react';
import "./slider.css";

class Slider extends Component {
    state = { 
        width: 200, 
        position: 425,
        speed: 12,
        intervalRight: null,
        intervalLeft: null,
        rightKeyDown: false,
        leftKeyDown: false,
        stuck: this.props.stuck,
        rightSmooth: 0.03,
        leftSmooth: 0.03
    }

    _handleKeyDown = (event) => {
        switch( event.keyCode ) {
            case 39:
                event.preventDefault();
                if(this.state.rightKeyDown === false){
                    this.setState({
                        rightKeyDown: true
                    })
                    this.moveRight(true);
                }
                break;
            case 37:
                event.preventDefault();
                if(this.state.leftKeyDown === false){
                    this.setState({
                        leftKeyDown: true
                    })
                    this.moveLeft(true);
                }
                break;
            default: 
                break;
        }
    }

    _handleKeyUp = (event) => {

        switch( event.keyCode ) {
            case 39:
                this.setState({
                    rightKeyDown: false
                })
                this.moveRight(false);
                break;
            case 37:
                this.setState({
                    leftKeyDown: false
                })
                this.moveLeft(false);
                break;
            default: 
                break;
        }
    }

    moveRight = (bool) => {
        if(this.state.position < 1100 - this.state.width && bool === true){
            this.setState({
                intervalRight: setInterval(() => {
                    let update = parseInt(this.state.speed * this.state.rightSmooth);
                    if(this.state.rightSmooth < 1){
                        this.setState({
                            rightSmooth: this.state.rightSmooth + 0.03
                        })
                    }
                    let position = this.state.position + update;
                    if(position > 1100 - update){position = 1100 - update}
                    if(this.state.position < 1100 - this.state.width){
                        this.setState({
                            position: position
                        })
                        if(this.state.stuck === true){
                            this.props.updateBallPosition('X', position + (this.state.width - 75)/2)
                        }
                    }
                    this.props.updatePlatformRange(this.state.position, this.state.position + this.state.width);
                }, 5)
            })
        }else{
            clearInterval(this.state.intervalRight);
            this.setState({
                intervalRight: null,
                rightSmooth: 0.03
            })
        }
    }

    moveLeft = (bool) => {
        if(this.state.position > 0 && bool === true){
            this.setState({
                intervalLeft: setInterval(() => {
                    if(this.state.position > 0){
                        let update = this.state.speed * this.state.leftSmooth;
                        if(this.state.leftSmooth < 1){
                            this.setState({
                                leftSmooth: this.state.leftSmooth + 0.03
                            })
                        }
                        let position = this.state.position - update;
                        if(position < 0){position = 0};
                        this.setState({
                            position: position
                        })
                        if(this.state.stuck === true){
                            this.props.updateBallPosition('X', position + (this.state.width - 75)/2)
                        }
                    }
                    this.props.updatePlatformRange(this.state.position, this.state.position + this.state.width);
                }, 5)
            })
        }else{
            clearInterval(this.state.intervalLeft);
            this.setState({
                intervalLeft: null,
                leftSmooth: 0.03
            })
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this._handleKeyDown);
        document.addEventListener("keyup", this._handleKeyUp);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.stuck !== this.props.stuck) {
            this.setState({
                stuck: nextProps.stuck
            });
        }
    }

    render() { 
        return ( 
        <div 
            className="slider" 
            style={{left: this.state.position + "px", width: this.state.width}}>
                <img className="platform" 
                    src={require('../../images/platform.png')} 
                    alt="" 
                    width={this.state.width - 50} 
                    height="15px" />
        </div> );
    }
}
 
export default Slider;