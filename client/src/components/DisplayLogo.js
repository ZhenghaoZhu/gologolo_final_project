import React, { Component } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import { Resizable, ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class DisplayLogo extends Component {

    render() {
        const styles = {
            container: {
                text: this.props.logoText,
                color: this.props.logo.color,
                fontSize: this.props.logo.fontSize + "pt",
                backgroundColor: this.props.logo.backgroundColor,
                borderColor: this.props.logo.borderColor,
                borderRadius: this.props.logo.borderRadius + "pt",
                borderStyle: "solid",
                borderWidth: this.props.logo.borderWidth + "pt",
                padding: this.props.logo.padding + "pt",
                margin: this.props.logo.margin + "pt",
            }
        }
        return (
            <div>
                <Draggable>
                    <div className="displayedLogo" id = "logoTextDiv"
                        style={ styles.container }>
                        {styles.container.text}
                    </div>
                </Draggable>
                <Draggable>
                    <div className="displayedLogo" id = "logoTextDiv" contenteditable="true"
                        style={ styles.container }>
                        {styles.container.text}
                    </div>
                </Draggable>
                <Draggable>
                <div id="edit" contenteditable="true">
                Here is the element's original content
                </div>
                </Draggable>
            
                <Button variant = "outlined" id = "addTextBoxButton">
                    Add Text Box
                </Button>
                <br></br>
                <br></br>

                <Button variant = "outlined" id = "addImageButton">
                    Add Image
                </Button>
            </div>
        )
    }
}

export default DisplayLogo