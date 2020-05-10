import React, { Component } from 'react';

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class LogoTextBox extends Component {

    render() {
        return (
            <div className="displayedLogo" id = "logoTextDiv"
                style={ this.props.style }
                contentEditable='true'
                h = { parseInt(this.props.h) }
                w = { parseInt(this.props.w) }>
                {this.props.text}
            </div>
        )
    }
}

export default LogoTextBox