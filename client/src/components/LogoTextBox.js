import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ContentEditable from 'react-contenteditable'


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
        const newStyle = {
            name : this.state.style.name,
            text : event.target.value,
            color : this.state.style.color,
            fontSize : this.state.style.fontSize,
            background : this.state.style.background,
            x : this.state.style.x,
            y : this.state.style.y
        }
        this.props.handleLogoTextBoxTextChangeCallback(this.state.style.name, newStyle);
    }

    closeTextBoxButtonClick = () => {
        if(this.props.disableDraggingBoolean === undefined){
            this.props.handleCloseTextBoxCallback(this.props.style.name)
        }   
    }

    handleTextBoxDrag = (textToUpdate, newCoordinates) => {
        this.props.handleTextBoxDragCallback(textToUpdate, newCoordinates)
    }

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
                onDragStop={(e, d) => { 
                    this.handleTextBoxDrag(this.props.style.name,{ 
                        name : this.props.style.name,
                        text: this.props.style.text,
                        color: this.props.style.color,
                        fontSize: this.props.style.fontSize,
                        background : "transparent",
                        border : "none",
                        x: d.x, 
                        y: d.y 
                    }) 
                }}
                dragGrid={[20, 20]}
                disableDragging = {disableDraggingViewScreen}
            >
                <ContentEditable
                    style = {this.state.style}
                    html={this.props.style.text} // innerHTML of the editable div
                    disabled={disableDraggingViewScreen}       // use true to disable editing
                    onChange={this.handleLogoTextBoxTextChange} // handle innerHTML change
                />
                <HighlightOffIcon onClick = {this.closeTextBoxButtonClick}style = {{position : "absolute", top : "0px", right : "0px", color : "#616161"}}/>
            </Rnd>
        )
    } 
}

export default LogoTextBox

