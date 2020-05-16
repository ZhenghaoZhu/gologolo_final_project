import React, { Component } from 'react';
import { Rnd } from 'react-rnd';

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class LogoImage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            width : "200px",
            height : "200px"
        }
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
                    width : this.state.width,
                    height : this.state.height
                }}
            >
                <img src = {this.props.style.source} alt = ""/>
                {/* Do some state stuff with the width and height of Rnd and the width and height of img (same state, maybe?) */}
            </Rnd>
        )
    } // TODO: Add x-coord, y-coord to LogoTextBox and LogoImage
    
}

export default LogoImage