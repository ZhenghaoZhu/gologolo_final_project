import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { TextField } from '@material-ui/core'


// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class LogoTextBox extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            rndStyle : {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "solid 1px #ddd",
            },
            style : {
                name : this.props.style.name,
                text: this.props.style.text,
                color: this.props.style.color,
                fontSize: this.props.style.fontSize,
                background : "transparent",
                border : "none",
                x: this.props.style.x,
                y: this.props.style.y
            }
        }
    }

    handleLogoTextBoxTextChange = (event) =>{
        console.log(this.state.style.name)
        console.log(event.target.value)
        this.props.handleLogoTextBoxTextChangeCallback(this.state.style.name, event.target.value)
    }

    closeTextBoxButtonClick = () => {
        console.log(this.props.style)
        if(this.props.disableDraggingBoolean === undefined){
            this.props.handleCloseTextBoxCallback(this.props.style.name)
        }
        
    }

    // handleResizeAndDrag = (offsetWidth, offsetHeight, newX, newY) => {
        
    //     this.props.handleResizeAndDragCallback(this.state)
    // }

    render() {
        var disableDraggingViewScreen = true
        if(this.props.disableDraggingBoolean === undefined){
            disableDraggingViewScreen = false
        }
        return (
            <Rnd
            bounds=".logoTextBoxAndImageBounds"
                style = {this.state.rndStyle}
                default = {{
                    x : this.props.style.x,
                    y : this.props.style.y,
                    width : this.state.style.width,
                    height : this.state.style.height
                }}
                onResize={(e, direction, ref, delta, position) => {
                    this.setState({
                        width: ref.offsetWidth,
                        height: ref.offsetHeight,
                        x: position.x,
                        y: position.y
                    })
                }}
                resizeGrid={[20, 20]}
                dragGrid={[20, 20]}
                disableDragging = {disableDraggingViewScreen}
            >
                <div className="displayedLogo" id = "logoTextDiv" style = { this.state.style } contentEditable = {true} onChange = {this.handleLogoTextBoxTextChange}>{this.state.style.text}</div>
                <HighlightOffIcon onClick = {this.closeTextBoxButtonClick}style = {{position : "absolute", top : "0px", right : "0px", color : "#616161"}}/>
            </Rnd>
        )
    } 
}

export default LogoTextBox

