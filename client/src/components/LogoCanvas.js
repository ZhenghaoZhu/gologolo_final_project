import React from "react";
import _ from "lodash";
import { Button } from '@material-ui/core';
import LogoTextBox from './LogoTextBox.js';
import LogoImage from './LogoImage.js';
import * as html2Canvas from 'html2canvas';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ImageIcon from '@material-ui/icons/Image';

export default class LogoCanvas extends React.PureComponent {
  
	constructor(props) {
	  super(props);
  
	  this.state = {
		listOfLogoTextBox : ["textBox1", "textBox2", "textBox3"],
		listofLogoImage : ["image1", "image2"],
		xCoord : "10",
		yCoord : "10",
		width : "300",
		height : "600",
		textBoxListStyle : {
			"textBox1" :{
			  text: "textBox1",
			  color: "#FF0000",
			  fontSize: "12pt",
			  backgroundColor: "#00FFFF", 
			  borderRadius: "10pt", 
			  borderColor: "#FFFF00",
			  borderWidth: "10pt",
			  borderStyle: "solid",
			  padding: "4pt",
			  margin: "3pt",
			  xCoord: 0,
			  yCoord: 0
			},
			"textBox2" :{
			  text: "textBox2",
			  color: "#FF0000",
			  fontSize: "12pt",
			  backgroundColor: "#00FFFF", 
			  borderRadius: "10pt", 
			  borderColor: "#FFFF00",
			  borderWidth: "10pt",
			  borderStyle: "solid",
			  padding: "4pt",
			  margin: "3pt",
			  xCoord: 50,
			  yCoord: 40
			},
			"textBox3" :{
			  text: "textBox3",
			  color: "#FF0000",
			  fontSize: "12pt",
			  backgroundColor: "#00FFFF", 
			  borderRadius: "10pt", 
			  borderColor: "#FFFF00",
			  borderWidth: "10pt",
			  borderStyle: "solid",
			  padding: "4pt",
			  margin: "3pt",
			  xCoord: 300,
			  yCoord: 300
			},
		},
		imageListStyle : {
			"image1" : {
			  source : "data:image/jpeg;base64,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",
			  xCoord : 400,
			  yCoord : 400,
			},
			"image2" : {
			  source : "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic1.squarespace.com%2Fstatic%2F5330664de4b0c8441aea50d8%2Ft%2F5571f878e4b04dc4103f243b%2F1433532536540%2FEmoji&f=1&nofb=1",
			  xCoord : 200,
			  yCoord : 200,
			}
		}
	  };
	}

	createTextBox(textBoxElement){
		return(
			<div>
				<LogoTextBox style = {this.state.textBoxListStyle[textBoxElement]} />
			</div>
		)
		
	}

	createImage(imageElement){
		return(
			<div>
				<LogoImage style = {this.state.imageListStyle[imageElement]} />
			</div>
		)
		
	}

	downloadImage() {
		html2Canvas(document.getElementById("logoCanvasMain")).then(function(canvas)  {  
			const contentData = canvas.toDataURL('image/png');
			console.log(contentData);
		  });
	}

	addTextBox() {
		console.log("addTextBox function");
	}

	addImage() {
		console.log("addImage function");
	}

	render() {
		return(
			<div id = "logoCanvasMain">
				<Button variant = "outlined" onClick = {this.addTextBox} id = "addTextBoxButton" startIcon = { <AddBoxIcon/> }>Add Text Box</Button>
				<Button variant = "outlined" onClick = {this.addImage} id = "addImageButton" startIcon = { <ImageIcon/> }>Add Image</Button>
				<Button variant = "outlined" onClick = {this.downloadImage} id = "downloadLogoButton" startIcon = { <CloudDownloadIcon/> }>Download Logo as Image</Button>
				<div id = "stretchyDiv">
				{_.map(this.state.listOfLogoTextBox, textBoxElement => this.createTextBox(textBoxElement))}
				{_.map(this.state.listofLogoImage, imageElement => this.createImage(imageElement))}
				</div>
			</div>
		)
	}
  
	
  }