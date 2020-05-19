import React from "react";
import _ from "lodash";
import { Button, Snackbar, IconButton } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ImageIcon from '@material-ui/icons/Image';
import CloseIcon from '@material-ui/icons/Close';

export default class LogoCanvas extends React.PureComponent {
  
	constructor(props) {
	  super(props);
  
	  this.state = {
		
	  };

	}

	

	render() {
		return(
				<div id = "logoCanvasMain" style = {{width : "800px"}} key = {"logoCanvas" + this.props.styles.borderColor}>
					<Snackbar
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						  }}
						open={this.props.imageErrorAlert}
						onClose={this.props.handleImageErrorAlertCloseCallback}
						autoHideDuration={6000}
						message="Image Link Invalid"
						action={
							<React.Fragment>
							  <IconButton
								aria-label="close"
								color="inherit"
								onClick={this.props.handleImageErrorAlertCloseCallback}
							  >
								<CloseIcon />
							  </IconButton>
							</React.Fragment>
						  }
					/>
					<Button variant = "outlined" onClick = {this.props.downloadImageCallback} id = "downloadLogoButton" startIcon = { <CloudDownloadIcon/> }>Download Logo as Image</Button>
					<input  onChange = {this.props.onCurrentImageLinkChangeCallback} id = "imageLinkTextField" placeholder = "Image Link" value = {this.props.currentImageLink}/>
					<Button variant = "outlined" onClick = {this.props.addImageCallback} id = "addImageButton" startIcon = { <ImageIcon/> }>Add Image</Button>
					<Button variant = "outlined" onClick = {this.props.addTextBoxCallback} id = "addTextBoxButton" startIcon = { <AddBoxIcon/> }>Add Text Box</Button>
					<body id = "logoCanvasImageZone" style = {this.props.styles} className = "logoTextBoxAndImageBounds">
						{_.map(this.props.textBoxList, textBoxListElement => this.props.createTextBoxCallback(textBoxListElement))}
						{_.map(this.props.imageList, imageListElement => this.props.createImageCallback(imageListElement))}
					</body>
				</div>
		) 
	} 
  }

