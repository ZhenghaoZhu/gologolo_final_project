import React, { Component } from 'react';
import { Rnd } from 'react-rnd';

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class LogoTextBox extends Component {
    constructor(props) {
        super(props);

        const rndStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 1px #ddd",
            background: "#f0f0f0"
          };
    }
    render() {
        return (
            <Rnd
                style = {{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "solid 1px #ddd",
                    background: "#f0f0f0"
                  }}
                default = {{
                    x : this.props.style.xCoord,
                    y : this.props.style.yCoord,
                    width : 200,
                    height : 200
                }}
            >
                <div className="displayedLogo" id = "logoTextDiv"
                    style={ this.props.style }
                    contentEditable='true'
                    >
                    {this.props.style.text}
                </div>
            </Rnd>
        )
    }
}

export default LogoTextBox