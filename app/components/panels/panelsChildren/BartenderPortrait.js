import React, { Component } from 'react';
import SpeechBubble from './SpeechBubble';

const BartenderPortraitStyling = {
    height: '100%',
    backgroundImage: 'url(/images/avatars/bar-bg-2.png)',
    backgroundSize: '180%',
    border: '2px solid black',

}

const BartenderAvatarStyling = {
	position: 'absolute',
	bottom: '20%',
	left: '-4%',

}

const CounterStyling = {
	height: '20%',
	position: 'absolute',
	bottom: '0',

}

class BartenderPortrait extends Component {
    render() {
        return (
            <div className="col-xs-7" style={BartenderPortraitStyling}>
            	<SpeechBubble />
                <img src='/images/avatars/complete/Candace-1.png' style={BartenderAvatarStyling} />
                <img src='/images/avatars/complete/Wood-Bar-3.png' style={CounterStyling} />
            </div>		
        )  
    }
}

export default BartenderPortrait;