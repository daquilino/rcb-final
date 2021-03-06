import React, { Component } from 'react';

//import IO from 'socket.io-client';  
//const socket = IO() ;

const chatInput = {
	width: '95%',
	margin: '0 auto'
}

const ButtonStyling = {
	fontWeight: 'bold'
}

const UserInput = {
	fontWeight: 'bold',
	color: 'black'
}

class ChatInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''
		};

		this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
		this.handleMessageInputChange = this.handleMessageInputChange.bind(this);

	}

	handleMessageInputChange(event) {
		this.setState({message: event.target.value});
	}

	handleMessageSubmit(event) {
		event.preventDefault();
		let socket = this.props.socket;
		if (this.state.message === '') {
			alert("Please type a message first.");
		}
		else{
		console.log("Message Submitted." + this.state.message);
		socket.emit("sendMessage", this.state.message);
		this.setState({message: ""});
		}
	}

	readyForGame() {
		console.log("sending ready for game", this.props);
		let socket = this.props.socket
		socket.emit("joinGame");
	}

	render() {
		return (
			
			<form onSubmit={this.handleMessageSubmit}>
				<div className="input-group" style={chatInput}>
			  	<input 
			  		type="text" 
			  		className="form-control" 
			  		placeholder="Message" 
			  		id="message"
			  		style={UserInput}
			  		value={this.state.message} 
			  		onChange={this.handleMessageInputChange} 
			  		/>
						<span className="input-group-btn">
							<button type="submit" value="Submit" className="btn btn-default" style={ButtonStyling}>Send</button>
						</span>
					</div>
			</form>
			
		)
	}
}

export default ChatInput;