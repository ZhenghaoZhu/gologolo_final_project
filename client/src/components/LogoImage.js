import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class LogoImage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name : this.props.style.name,
            source : this.props.style.source,
            width : this.props.style.width,
            height : this.props.style.height,
            x : this.props.style.x,
            y : this.props.style.y
        }
    }

    closeImageButtonClick = () => {
        if(this.props.disableDraggingBoolean === undefined){
            this.props.handleCloseImageCallback(this.props.style.name)
        }
        
    }

    handleImageResizeDrag = (imageToUpdate, newCoordinates, cleanCoordinates) => {
        const cleanNewCoordinates = newCoordinates
        if(cleanCoordinates){
            cleanNewCoordinates['width'] = cleanNewCoordinates['width'].replace("px", "")
            cleanNewCoordinates['width'] = parseInt(cleanNewCoordinates['width'])
            cleanNewCoordinates['height'] = cleanNewCoordinates['height'].replace("px", "")
            cleanNewCoordinates['height'] = parseInt(cleanNewCoordinates['height'])
        }
        this.props.handleImageResizeDragCallback(imageToUpdate, newCoordinates)
    }

    render() {
        var disableDraggingViewScreen = true
        if(this.props.disableDraggingBoolean === undefined){
            disableDraggingViewScreen = false
        }
        console.log('State', this.state)
        console.log('Props', this.props)
        return (
            <Rnd
                style = {{
                    background: "#f0f0f0",
                }}
                bounds=".logoTextBoxAndImageBounds"
                default = {this.state}
                onResizeStop={(e, direction, ref, delta, position) => {
                    this.handleImageResizeDrag(this.props.style.name,{
                      name : this.state.name,
                      source : this.state.source,
                      width: ref.style.width,
                      height: ref.style.height,
                      ...position
                    }, true);
                }}
                onDragStop={(e, d) => { 
                    this.handleImageResizeDrag(this.props.style.name,{ 
                        name : this.props.style.name,
                        source : this.props.style.source,
                        width : this.state.width,
                        height : this.state.height,
                        x: d.x, 
                        y: d.y 
                    }, false) 
                }}
                resizeGrid={[20, 20]}
                dragGrid={[20, 20]}
                disableDragging = {disableDraggingViewScreen}
            >
                <img  src = {this.props.style.source} alt = "" width = {this.props.style.width} height = {this.props.style.height}/>
                <HighlightOffIcon onClick = {this.closeImageButtonClick}style = {{position : "absolute", top : "0px", right : "0px", color : "#616161"}}/>
            </Rnd>
        )
    }
    
}

export default LogoImage

