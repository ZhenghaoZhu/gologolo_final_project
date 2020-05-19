import React from "react";
import _ from "lodash";
import { Button, Snackbar, IconButton } from '@material-ui/core';
import LogoTextBox from './LogoTextBox.js';
import LogoImage from './LogoImage.js';
import * as html2Canvas from 'html2canvas';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ImageIcon from '@material-ui/icons/Image';
import download from 'downloadjs';
import CloseIcon from '@material-ui/icons/Close';

export default class LogoCanvas extends React.PureComponent {
  
	constructor(props) {
	  super(props);
  
	  this.state = {
		currentImageLink : "", // Dont put in schema
		textBoxCounter : 3,
		imageCounter : 4,
		bugCounter : 0,
		imageErrorAlert : false, // Dont put in schema
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

	}

	createTextBox(textBoxListElement){
		return(
			<div key = {textBoxListElement['fontSize'] + textBoxListElement['color']}>
				<LogoTextBox style = {textBoxListElement} handleCloseTextBoxCallback = {this.handleCloseTextBox} />
			</div>
		)
		
	}

	createImage(imageListElement){
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
			color: this.props.styles.textBoxFontColor,
			fontSize: parseInt(this.props.styles.textBoxFontSize) + "px",
			background : "transparent",
			border : "none",
			width : 130,
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
		console.log(this.state.imageList)
		return(
				<div id = "logoCanvasMain" style = {{width : "800px"}} key = {"logoCanvas" + this.props.styles.borderColor}>
					<Snackbar
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						  }}
						open={this.state.imageErrorAlert}
						onClose={this.handleImageErrorAlertClose}
						autoHideDuration={6000}
						message="Image Link Invalid"
						action={
							<React.Fragment>
							  <IconButton
								aria-label="close"
								color="inherit"
								onClick={this.handleImageErrorAlertClose}
							  >
								<CloseIcon />
							  </IconButton>
							</React.Fragment>
						  }
					/>
					<Button variant = "outlined" onClick = {this.downloadImage} id = "downloadLogoButton" startIcon = { <CloudDownloadIcon/> }>Download Logo as Image</Button>
					<input  onChange = {this.onCurrentImageLinkChange} id = "imageLinkTextField" placeholder = "Image Link" value = {this.state.currentImageLink}/>
					<Button variant = "outlined" onClick = {this.addImage} id = "addImageButton" startIcon = { <ImageIcon/> }>Add Image</Button>
					<Button variant = "outlined" onClick = {this.addTextBox} id = "addTextBoxButton" startIcon = { <AddBoxIcon/> }>Add Text Box</Button>
					<body id = "logoCanvasImageZone" style = {this.props.styles} className = "logoTextBoxAndImageBounds">
						{_.map(this.state.textBoxList, textBoxListElement => this.createTextBox(textBoxListElement))}
						{_.map(this.state.imageList, imageListElement => this.createImage(imageListElement))}
					</body>
				</div>
		) 
	} 
  }

