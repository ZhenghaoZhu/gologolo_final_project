import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class LogoImage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            width : this.props.style.width,
            height : this.props.style.height,
            x : this.props.style.xCoord,
            y : this.props.style.yCoord
        }
    }

    closeImageButtonClick = () => {
        this.props.handleCloseImageCallback(this.props.style.name)
    }

    render() {
        return (
            <Rnd
                style = {{
                    background: "#f0f0f0",
                }}
                bounds=".logoTextBoxAndImageBounds"
                default = {this.state}
                onResize={(e, direction, ref, delta, position) => {
                    this.setState({
                      width: ref.offsetWidth,
                      height: ref.offsetHeight,
                      ...position,
                    });
                  }}
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                resizeGrid={[20, 20]}
                dragGrid={[20, 20]}
            >
                <img  src = {this.props.style.source} alt = "" width = {this.state.width} height = {this.state.height}/>
                <HighlightOffIcon onClick = {this.closeImageButtonClick}style = {{position : "absolute", top : "0px", right : "0px", color : "#616161"}}/>
            </Rnd>
        )
    }
    
}

export default LogoImage

// TODO: Save x-coord and y-coord in state
