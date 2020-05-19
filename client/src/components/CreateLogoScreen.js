import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import LogoCanvas from './LogoCanvas.js';
import GologoloNavBar from './GologoloNavBar.js';
import { TextField, Button, InputAdornment } from '@material-ui/core';
import { TwitterPicker } from 'react-color';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import BorderStyleIcon from '@material-ui/icons/BorderStyle';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import HeightIcon from '@material-ui/icons/Height';
import AllOutIcon from '@material-ui/icons/AllOut';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import LogoTextBox from './LogoTextBox.js';
import LogoImage from './LogoImage.js';
import * as html2Canvas from 'html2canvas';
import download from 'downloadjs';

const ADD_LOGO = gql`
  mutation AddLogo(
    $text: String!
    $color: String!
    $fontSize: Int!
    $backgroundColor: String!
    $borderColor: String!
    $borderRadius: Int!
    $borderWidth: Int!
    $padding: Int!,
    $margin: Int!,
    $ms: String!
  ) {
    addLogo(
      text: $text,
      color: $color,
      fontSize: $fontSize,
      backgroundColor: $backgroundColor,
      borderColor: $borderColor,
      borderRadius: $borderRadius,
      borderWidth: $borderWidth,
      padding: $padding,
      margin: $margin,
      ms : $ms
    ) {
      _id
    }
  }
`;

class CreateLogoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: "#e5e5e5", 
            borderColor: "#4a5257",
            borderRadius: 20,
            borderWidth: 10,
            borderStyle: "solid", // Don't put in query
            margin: 2,
            height: 750,
            width: 800,
            position : "absolute", // Don't put in query
            textBoxFontColor : "#000000",
            textBoxFontSize : 16,

            currentImageLink : "", // Don't put in schema
            textBoxCounter : 3,
            imageCounter : 4,
            bugCounter : 0,
            imageErrorAlert : false, // Don't put in schema

            textBoxList : {
                "textBox1" :{
                    name : "textBox1",
                    text: "textBox1",
                    color: "#FF0000",
                    fontSize: "24pt",
                    background : "transparent",
                    border : "none",
                    xCoord: 10,
                    yCoord: 10
                },
                "textBox2" :{
                    name : "textBox2",
                    text: "textBox2",
                    color: "#FF0000",
                    fontSize: "20pt",
                    background : "transparent",
                    border : "none",
                    xCoord: 50,
                    yCoord: 40
                },
                "textBox3" :{
                    name : "textBox3",
                    text: "textBox3",
                    color: "#FF00FF",
                    fontSize: "40pt",
                    background : "transparent",
                    border : "none",
                    xCoord: 300,
                    yCoord: 300
                },
            },
            imageList : {
                "image1" : {
                    name : "image1",
                    source : "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2002&q=80",
                    width : 200,
                    height : 200,
                    xCoord : 400,
                    yCoord : 400,
                },
                "image2" : {
                    name : "image2",
                    source : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Lillium_Stamens.jpg/800px-Lillium_Stamens.jpg",
                    width : 200,
                    height : 200,
                    xCoord : 200,
                    yCoord : 200,
                },
                "image3" : {
                    name : "image3",
                    source : "https://upload.wikimedia.org/wikipedia/commons/4/4d/Bees_Collecting_Pollen_cropped.jpg",
                    width : 200,
                    height : 200,
                    xCoord : 100,
                    yCoord : 100,
                },
                "image4" : {
                    name : "image4",
                    source : "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg",
                    width : 200,
                    height : 200,
                    xCoord : 150,
                    yCoord : 150,
                }
            },
        };

        this.handleBorderWidthChange = this.handleBorderWidthChange.bind(this)

    }

    handleBackgroundColorChange = (event) => {
        this.setState({ backgroundColor : event.hex });
    };

    handleBorderColorChange = (event) => {
        this.setState({ borderColor : event.hex });
    };

    handleBorderRadiusChange = (event) => {
        event.preventDefault();
        var updateBorderRadius = this.state.borderRadius
        updateBorderRadius = event.target.value
        if(updateBorderRadius > 50){
            updateBorderRadius = 50
        }
        if(updateBorderRadius < 1) {
            updateBorderRadius  = 1
        }
        this.setState({ borderRadius : updateBorderRadius });
    };

    handleBorderWidthChange = (event) =>{
        event.preventDefault();
        var updateBorderWidth = this.state.borderWidth
        updateBorderWidth = event.target.value
        if(updateBorderWidth > 50){
            updateBorderWidth = 50
        }
        if(updateBorderWidth < 1) {
            updateBorderWidth  = 1
        }
        this.setState({ borderWidth : updateBorderWidth });
    };


    handleMarginChange = (event) => {
        event.preventDefault();
        var updateMargin = this.state.margin
        updateMargin = event.target.value
        if(updateMargin > 50){
            updateMargin = 50
        }
        if(updateMargin < 1) {
            updateMargin  = 1
        }
        this.setState({ margin : updateMargin });
    };

    handleTextBoxFontColorChange = (event) => {
        console.log(event.hex)
        this.setState({ textBoxFontColor : event.hex });
    }

    handleTextBoxFontSizeChange = (event) => {
        event.preventDefault();
        var updatedTextBoxFontSize = this.state.textBoxFontSize
        updatedTextBoxFontSize = event.target.value
        if(updatedTextBoxFontSize > 100){
            updatedTextBoxFontSize = 100
        }
        if(updatedTextBoxFontSize < 1) {
            updatedTextBoxFontSize  = 1
        }
        this.setState({ textBoxFontSize : updatedTextBoxFontSize });
    }

    handleCanvasWidthChange = (event) => {
        event.preventDefault();
        var updatedWidth = this.state.width
        updatedWidth = event.target.value
        if(updatedWidth > 1000){
            updatedWidth = 1000
        }
        if(updatedWidth < 100) {
            updatedWidth  = 100
        }
        this.setState({ width : updatedWidth });
    }

    handleCanvasHeightChange = (event) => {
        event.preventDefault();
        var updatedHeight = this.state.height
        updatedHeight = event.target.value
        if(updatedHeight > 1000){
            updatedHeight = 1000
        }
        if(updatedHeight < 100) {
            updatedHeight  = 100
        }
        this.setState({ height : updatedHeight });
    }

    createTextBox = (textBoxListElement) =>{
		return(
			<div key = {textBoxListElement['fontSize'] + textBoxListElement['color']}>
				<LogoTextBox style = {textBoxListElement} handleCloseTextBoxCallback = {this.handleCloseTextBox} />
			</div>
		)
		
	}

	createImage = (imageListElement) =>{
		return(
			<div key = {imageListElement.name.length + 3}>
				<LogoImage style = {imageListElement} handleCloseImageCallback = {this.handleCloseImage}/>
			</div>
		)
		
	}

	downloadImage() {
		html2Canvas(document.getElementById("logoCanvasImageZone"), {useCORS : true}).then(function(canvas)  {  
			download(canvas.toDataURL("image/png"), "gologoloLogo.png");
		  });
	}

	addTextBox = () => {
		const updateTextBoxCounter = this.state.textBoxCounter + 1
		const newTextBoxObjectName = "textBox" + updateTextBoxCounter
		const newtextBoxList = this.state.textBoxList;
		newtextBoxList[newTextBoxObjectName] = {
			name : newTextBoxObjectName,
			text: "Example Text",
			color: this.state.textBoxFontColor,
			fontSize: parseInt(this.state.textBoxFontSize) + "px",
			background : "transparent",
			border : "none",
            width : 250,
            height : 50,
            xCoord: 450,
            yCoord: 650
		  }
		this.setState({
			textBoxList : newtextBoxList,
			textBoxCounter : updateTextBoxCounter
		});
	}

	addImage = () => {
		const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
		if(regexp.test(this.state.currentImageLink)){
			const updateImageCounter = this.state.imageCounter + 1;
			const newImageListElementName = 'image' + updateImageCounter + this.state.currentImageLink;
			const newImageList = this.state.imageList;
			newImageList[newImageListElementName] = {
				name : newImageListElementName, 
				source : this.state.currentImageLink,
				width : 200,
				height : 200, 
				xCoord : 550, 
				yCoord : 20
			}
			this.setState({
				imageList : newImageList,
				currentImageLink : "",
				imageCounter : updateImageCounter
			});
		} else {
			this.setState({imageErrorAlert : true, currentImageLink : ""})
		}
		
	}

	onCurrentImageLinkChange = (event) => {
		this.setState({
			currentImageLink : event.target.value
		})
	}

	handleImageErrorAlertClose= () => {
		this.setState({imageErrorAlert : false})
	}

	handleCloseImage = (imageToDelete) => {
		const newImageList = this.state.imageList;
		const updatedBugCounter = this.state.bugCounter + 1;
		delete newImageList[imageToDelete];
		this.setState({
			imageList : newImageList,
			bugCounter : updatedBugCounter
		})
	}
	
	handleCloseTextBox = (textBoxToDelete) => {
		const newTextBoxList = this.state.textBoxList;
		const updatedBugCounter = this.state.bugCounter + 1
		delete newTextBoxList[textBoxToDelete];
		this.setState({
			textBoxList : newTextBoxList,
			bugCounter : updatedBugCounter
		})
    }

    render() {
        const style = {
            borderColor: this.state.borderColor,
            backgroundColor: this.state.backgroundColor, 
            borderRadius: parseInt(this.state.borderRadius) + "px",
            borderWidth: parseInt(this.state.borderWidth) + "px",
            borderStyle: "solid",
            margin: parseInt(this.state.margin) + "px",
            height: parseInt(this.state.height) + "px",
            width: parseInt(this.state.width) + "px",
            position : "absolute",
            textBoxFontColor : this.state.textBoxFontColor,
            textBoxFontSize : parseInt(this.state.textBoxFontSize) + "px"
        };
        return (
        <div className="container panel panel-default" id = "mainContainer">
                <div className="panel-heading">
                    <GologoloNavBar currentScreen = "Create Screen"/>
                        <form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                        style = {{marginLeft : "-250px", marginTop : "5%", borderStyle : "solid", borderColor : "black", borderRadius : "10px", borderWidth : "5px", padding : "20px 20px 20px 20px", backgroundColor : "rgb(229, 229, 229)"}}
                        >

                        <label htmlFor="color"> Background Color:</label>
                            <TwitterPicker width = "316px" colors = {['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF', '#D291BC', '#FEC8D8']} onChange = {this.handleBackgroundColorChange}/>  

                        <label htmlFor="color" style = {{marginTop : 20}}> Border Color:</label>
                            <TwitterPicker width = "316px" colors = {['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF', '#D291BC', '#FEC8D8']} onChange = {this.handleBorderColorChange}/>

                        <br></br>
                        
                        <TextField label = "Border Radius"
                                    value = {this.state.borderRadius}
                                    variant = "outlined" 
                                    onChange = {this.handleBorderRadiusChange} 
                                    style = {{marginTop : "20px"}}
                                    type = "number"
                                    InputProps={{ inputProps: { min: 1, max: 50, step : 2 } }}
                                    error ={this.state.borderRadius > 0 && this.state.borderRadius < 51 ? false : true }
                                    helperText = "Value should be between 1 - 50 (Inclusive)"
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <BorderStyleIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                    fullWidth/>

                        <br></br>

                        <TextField label = "Border Width"
                                    value = {this.state.borderWidth}
                                    variant = "outlined" 
                                    onChange = {this.handleBorderWidthChange} 
                                    style = {{marginTop : "30px"}}
                                    type = "number"
                                    InputProps={{ inputProps: { min: 1, max: 50, step : 2 } }}
                                    error ={this.state.borderWidth > 0 && this.state.borderWidth < 51 ? false : true }
                                    helperText = "Value should be between 1 - 50 (Inclusive)"
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SwapHorizIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                    fullWidth/>

                        <br></br>

                        <TextField label = "Margin"
                                    value = {this.state.margin}
                                    variant = "outlined" 
                                    onChange = {this.handleMarginChange} 
                                    style = {{marginTop : "30px"}}
                                    type = "number"
                                    InputProps={{ inputProps: { min: 0, max: 50 } }}
                                    error ={this.state.margin > 0 && this.state.margin < 51 ? false : true }
                                    helperText = "Value should be between 1 - 50 (Inclusive)"
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AllOutIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                    fullWidth/>

                        <br></br>

                        <Button
                            fullWidth
                            type="submit"
                            className="btn btn-success"
                            style = {{marginTop : 20, backgroundColor : "#1976d2"}}
                            startIcon = { <SaveOutlinedIcon/> }
                        >
                            Save Changes
                        </Button>
                        </form>
                        <div id = "createScreenLogoCanvas" style = {{display : "flex"}}>
                            <LogoCanvas 
                                styles = {style}
                                textBoxList = {this.state.textBoxList}
                                imageList = {this.state.imageList}
                                imageErrorAlert = {this.state.imageErrorAlert}
                                currentImageLink = {this.state.currentImageLink}
                                downloadImageCallback = {this.downloadImage}
                                createTextBoxCallback = {this.createTextBox}
                                createImageCallback = {this.createImage}
                                addTextBoxCallback = {this.addTextBox}
                                addImageCallback = {this.addImage}
                                onCurrentImageLinkChangeCallback = {this.onCurrentImageLinkChange}
                                handleImageErrorAlertCloseCallback = {this.handleImageErrorAlertClose}
                                handleCloseImageCallback = {this.handleCloseImage}
                                handleCloseTextBoxCallback = {this.handleCloseTextBox}    
                            />
                        </div>
                        <form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                        style = {{marginLeft : "50px", marginTop : "9%", borderStyle : "solid", borderColor : "black", borderRadius : "10px", borderWidth : "5px", padding : "20px 20px 20px 20px", height : "20%", backgroundColor : "rgb(229, 229, 229)"}}
                        >
                        <label htmlFor="color" style = {{fontWeight : "bold", fontSize : "17px"}}> Select preferences for text box first</label>
                        <br/>
                        <label htmlFor="color" style = {{fontWeight : "bold", fontSize : "17px"}}> and then click "Add Text Box" button.</label>
                        <br/>
                        <label htmlFor="color" style = {{fontWeight : "bold", fontSize : "17px"}}> To edit text, click on text box and type.</label>
                        <br/>
                        <label htmlFor="color" style = {{fontWeight : "bold", fontSize : "17px"}}> (Keep mouse button pressed!)</label>
                        <br/>
                        <label htmlFor="color"> Text Box Font Color:</label>
                            <TwitterPicker width = "316px" colors = {['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF', '#D291BC', '#FEC8D8']} onChange = {this.handleTextBoxFontColorChange}/>  

                        <br></br>
                        
                        <TextField label = "Text Box Font Size"
                                    value = {this.state.textBoxFontSize}
                                    variant = "outlined" 
                                    onChange = {this.handleTextBoxFontSizeChange} 
                                    style = {{marginTop : "20px"}}
                                    type = "number"
                                    InputProps={{ inputProps: { min: 1, max: 100, step : 2 } }}
                                    error ={this.state.textBoxFontSize > 0 && this.state.textBoxFontSize < 101 ? false : true }
                                    helperText = "Value should be between 1 - 100 (Inclusive)"
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FormatSizeIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                    fullWidth/>

                        <hr style = {{borderStyle : "solid", borderColor : "black"}}/>
                        
                        <TextField label = "Canvas Width"
                                    value = {this.state.width}
                                    variant = "outlined" 
                                    onChange = {this.handleCanvasWidthChange} 
                                    style = {{marginTop : "20px"}}
                                    type = "number"
                                    InputProps={{ inputProps: { min: 100, max: 1000, step : 5 } }}
                                    error ={this.state.width > 99 && this.state.width < 1001 ? false : true }
                                    helperText = "Value should be between 100 - 1000 (Inclusive)"
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SwapHorizIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                    fullWidth/>
                        
                        <br/>

                        <TextField label = "Canvas Height"
                                    value = {this.state.height}
                                    variant = "outlined" 
                                    onChange = {this.handleCanvasHeightChange} 
                                    style = {{marginTop : "20px"}}
                                    type = "number"
                                    InputProps={{ inputProps: { min: 100, max: 1000, step : 5 } }}
                                    error ={this.state.height > 99 && this.state.   height < 1001 ? false : true }
                                    helperText = "Value should be between 100 - 1000 (Inclusive)"
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HeightIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                    fullWidth/>

                        </form>

                        
                    </div>
            
        </div>
        );
    }
}

export default CreateLogoScreen;
