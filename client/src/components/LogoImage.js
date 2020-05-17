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

    onImageResize() {
        console.log(this)
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
                    height : this.state.height,
                }}
                onResize={(e, direction, ref, delta, position) => {
                    this.setState({
                      width: ref.offsetWidth,
                      height: ref.offsetHeight,
                      ...position,
                    });
                  }}
            >
                <img  src = {this.props.style.source} alt = "" width = {this.state.width} height = {this.state.height}/>
                {/* Do some state stuff with the width and height of Rnd and the width and height of img (same state, maybe?) */}
            </Rnd>
        )
    }
    
}

export default LogoImage

// TODO: Add grid-like dragging
// TODO: Limit draggint to parent (LogoCanvas)