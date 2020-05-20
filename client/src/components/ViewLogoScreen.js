import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import GologoloNavBar from './GologoloNavBar.js';
import LogoTextBox from './LogoTextBox.js';
import LogoImage from './LogoImage.js';
import { List, ListItem, ListItemIcon, ListItemText, Button } from '@material-ui/core'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import BorderStyleIcon from '@material-ui/icons/BorderStyle';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import HeightIcon from '@material-ui/icons/Height';
import AllOutIcon from '@material-ui/icons/AllOut';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import FolderIcon from '@material-ui/icons/Folder'

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            margin
            height
            width
            position
            textBoxList{
                name
                text
                color
                fontSize
                border
                background
                x
                y
            }
            imageList{
                name
                source
                width
                height
                x
                y
            }
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    createTextBox = (textBoxListElement) =>{
		return(
			<div key = {textBoxListElement['fontSize'] + textBoxListElement['color']}>
				<LogoTextBox style = {textBoxListElement} handleCloseTextBoxCallback = {this.handleCloseTextBox} disableDraggingBoolean = {true}/>
			</div>
		)
		
    }
    
    createImage = (imageListElement) =>{
		return(
			<div key = {imageListElement.name.length + 3}>
				<LogoImage style = {imageListElement} handleCloseImageCallback = {this.handleCloseImage} disableDraggingBoolean = {true}/>
			</div>
		)
		
	}

    render() {

        function generate(element) {
            return [0, 1, 2].map((value) =>
              React.cloneElement(element, {
                key: value,
              }),
            );
        }

        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    const style = {
                        borderColor: data.logo.borderColor,
                        backgroundColor: data.logo.backgroundColor, 
                        borderRadius: parseInt(data.logo.borderRadius) + "px",
                        borderWidth: parseInt(data.logo.borderWidth) + "px",
                        borderStyle: "solid",
                        margin: parseInt(data.logo.margin) + "px",
                        height: parseInt(data.logo.height) + "px",
                        width: parseInt(data.logo.width) + "px",
                        position : "absolute"
                    };
                    var logoTitle = ""
                    _.map(data.logo.textBoxList, textBoxListElement => logoTitle += textBoxListElement.text)
                    console.log(logoTitle)
                    return (
                        <div className="container panel panel-default" id = "mainContainer">
                            <div className="panel-heading">
                                <GologoloNavBar currentScreen = "View Screen"/>
                                <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                }}
                                style = {{ marginTop : "3%", borderStyle : "solid", borderColor : "black", borderRadius : "10px", borderWidth : "5px", padding : "20px 20px 20px 20px", backgroundColor : "rgb(229, 229, 229)"}}
                                >

                                <List dense={false}>

                                        <ListItem>
                                            <ListItemIcon>
                                                <FolderIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Logo Title" 
                                                secondary = {logoTitle}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemIcon>
                                                <ColorLensIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Background Color"
                                                secondary = {style.backgroundColor}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <ColorLensIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Border Color"
                                                secondary = {style.borderColor}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemIcon>
                                                <BorderStyleIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Border Radius"
                                                secondary = {style.borderRadius}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemIcon>
                                                <SwapHorizIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Border Width"
                                                secondary = {style.borderWidth}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemIcon>
                                                <AllOutIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Margin"
                                                secondary = {style.margin}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemIcon>
                                                <SwapHorizIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Canvas Width"
                                                secondary = {style.width}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemIcon>
                                                <HeightIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Canvas Height"
                                                secondary = {style.height}
                                            />
                                        </ListItem>

                                </List>

                                <Button
                                    fullWidth
                                    style = {{marginTop : 20, backgroundColor : "#1976d2"}}
                                    startIcon = { <EditIcon/> }
                                    component = {Link} 
                                    to={`/edit/${data.logo._id}`}
                                >
                                    Edit Logo
                                </Button>
                                <br/>
                                <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                            {(removeLogo, { loading, error }) => (
                                                <Button
                                                fullWidth
                                                style = {{marginTop : 20, backgroundColor : "#ff1744"}}
                                                startIcon = { <DeleteForeverIcon/> }
                                                onClick={(event) => { event.preventDefault(); removeLogo({ variables: { id: data.logo._id } }) }}
                                                >
                                                    Delete Logo
                                                </Button>
                                            )}
                                </Mutation>
                                
                                </form>
                                <div id = "createScreenLogoCanvas" style = {{display : "flex"}}>
                                    <div id = "logoCanvasImageZone" style = {style} className = "logoTextBoxAndImageBounds">
                                        {_.map(data.logo.textBoxList, textBoxListElement => this.createTextBox(textBoxListElement))}
                                        {_.map(data.logo.imageList, imageListElement => this.createImage(imageListElement))}
                                    </div>
                                </div>
                            </div>   
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;

