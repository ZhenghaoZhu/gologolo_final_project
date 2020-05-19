import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


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
              }
        }
    }

    handleLogoTextBoxTextChange(event) {
        console.log(event)
    }

    closeTextBoxButtonClick = () => {
        console.log(this.props.style.name)
        this.props.handleCloseTextBoxCallback(this.props.style.name)
    }

    render() {
        return (
            <Rnd
            bounds=".logoTextBoxAndImageBounds"
                style = {this.state.rndStyle}
                default = {{
                    x : this.props.style.xCoord,
                    y : this.props.style.yCoord,
                    width : 200,
                    height : 50
                }}
                resizeGrid={[20, 20]}
                dragGrid={[20, 20]}
            >
                <div className="displayedLogo" id = "logoTextDiv" style = { this.props.style } contentEditable = {true} onChange = {this.handleLogoTextBoxTextChange} suppressContentEditableWarning={true}>{this.props.style.text}</div>
                <HighlightOffIcon onClick = {this.closeTextBoxButtonClick}style = {{position : "absolute", top : "0px", right : "0px", color : "#616161"}}/>
            </Rnd>
        )
    } 
}

export default LogoTextBox

// TODO: Save x-coord and y-coord in state
