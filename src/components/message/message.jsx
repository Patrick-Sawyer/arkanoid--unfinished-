import React, { Component } from 'react';
import "./message.css";

class Message extends Component {
    state = { message: "Hellooooo" }
    render() { 
    return ( <div>{this.state.message}</div> );
    }
}
 
export default Message;