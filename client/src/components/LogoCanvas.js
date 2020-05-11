import React from "react";
import _ from "lodash";
import { Rnd } from 'react-rnd';
import { Button } from '@material-ui/core';
import LogoTextBox from './LogoTextBox.js';
import LogoImage from './LogoImage.js';
import * as html2Canvas from 'html2canvas';
import htmlToImage from 'html-to-image';

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
			  source : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.treasurebunker.com%2Fforums%2Fuploads%2Freactions%2Freact_haha.png&f=1&nofb=1",
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
		// html2canvas(document.getElementById('logoCanvasMain'), { letterRendering: 1, allowTaint : true, onrendered : function (canvas) {
		// 	const contentData = canvas.toDataURL('image/png');
		// 	console.log(contentData);
		//  } });  
	}

	render() {
		return(
			<div id = "logoCanvasMain">
				<Button variant = "outlined" onClick = {this.downloadImage}>Download image</Button>
				<div id = "stretchyDiv">
				{_.map(this.state.listOfLogoTextBox, textBoxElement => this.createTextBox(textBoxElement))}
				{_.map(this.state.listofLogoImage, imageElement => this.createImage(imageElement))}
				</div>
			</div>
		)
	}
  
	
  }