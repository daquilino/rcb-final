import React, { Component } from 'react';
import Velocity from 'velocity-animate';

const chatBox = {
	height: '70%',
	width: '95%',
	backgroundColor: 'black',
	margin: '0 auto',
	fontSize: '17px',
	color: 'white',
	overflow: 'auto',
}

const ChatMessagesPadding = {
	padding: '0 3px 0 3px',
	wordWrap: 'break-word'
}
class ChatView extends Component {
	constructor(props){
		super(props);
		this.state ={
			storedMessages: []
		};

		this.storeRelayedMessage = this.storeRelayedMessage.bind(this);
		this.displayMessages = this.displayMessages.bind(this);
		this.scrollToBottom = this.scrollToBottom.bind(this);

		let socket = this.props.socket;

		socket.on("relayMessage", this.storeRelayedMessage);
	}

	storeRelayedMessage(data){
		let messageArray = this.state.storedMessages;
		messageArray.push(data);
		this.setState({storedMessages: messageArray});
		console.log("Added a new message.", messageArray);		
	}

	displayMessages(){
		console.log("displayMessages called");
		let storedMessages = this.state.storedMessages;
		
		return storedMessages.map((data, index)=> <div ref={data.name + index} key={index} style={ChatMessagesPadding}>{data.name + ": " + data.message}</div>)
	}

	scrollToBottom(){
		console.log("scrollToBottom called");
		this.refs.chatBox.scrollTop = this.refs.chatBox.scrollHeight;
	}

	componentDidUpdate(){
		this.scrollToBottom();
	}

	componentDidMount(){
		console.log("ChatView componentDidMount");
	}

	render() {

		let messagesToDisplay = this.displayMessages();
		let storedMessages = this.state.storedMessages;

		return (

			<div ref='chatBox' style={chatBox}>
				{messagesToDisplay}
			</div>

		)
	}
}

export default ChatView;


// {todos.map((message) => <Item key={message} message={message} />)}