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
                        style : {
                            borderColor: "#4a5257",
                            backgroundColor: "#e5e5e5", 
                            borderRadius: 20,
                            borderWidth: 10,
                            borderStyle: "solid",
                            margin: 2,
                            height: 750,
                            width: 800,
                            textBoxFontColor : "#000000",
                            textBoxFontSize : 16
                        }
                    };

                    this.handleBorderWidthChange = this.handleBorderWidthChange.bind(this)

                }

                handleBackgroundColorChange = (event) => {
                    const style = this.state.style
                    style.backgroundColor = event.hex
                    this.setState({ style });
                };

                handleBorderColorChange = (event) => {
                    const style = this.state.style
                    style.borderColor = event.hex
                    this.setState({ style });
                };

                handleBorderRadiusChange = (event) => {
                    event.preventDefault();
                    const style = this.state.style
                    style.borderRadius = event.target.value
                    if(style.borderRadius > 50){
                        style.borderRadius = 50
                    }
                    if(style.borderRadius < 1) {
                        style.borderRadius  = 1
                    }
                    this.setState({ style });
                };

                handleBorderWidthChange = (event) =>{
                    event.preventDefault();
                    const style = this.state.style
                    style.borderWidth = event.target.value
                    if(style.borderWidth > 50){
                        style.borderWidth = 50
                    }
                    if(style.borderWidth < 1) {
                        style.borderWidth  = 1
                    }
                    this.setState({ style });
                };


                handleMarginChange = (event) => {
                    event.preventDefault();
                    const style = this.state.style
                    style.margin = event.target.value
                    if(style.margin > 50){
                        style.margin = 50
                    }
                    if(style.margin < 1) {
                        style.margin  = 1
                    }
                    this.setState({ style });
                };

                handleTextBoxFontColorChange = (event) => {
                    const style = this.state.style
                    style.textBoxFontColor = event.hex
                    this.setState({ style });
                }

                handleTextBoxFontSizeChange = (event) => {
                    event.preventDefault();
                    const style = this.state.style
                    style.textBoxFontSize = event.target.value
                    if(style.textBoxFontSize > 100){
                        style.textBoxFontSize = 100
                    }
                    if(style.textBoxFontSize < 1) {
                        style.textBoxFontSize  = 1
                    }
                    this.setState({ style });
                }

                handleCanvasWidthChange = (event) => {
                    event.preventDefault();
                    const style = this.state.style
                    style.width = event.target.value
                    if(style.width > 1000){
                        style.width = 1000
                    }
                    if(style.width < 100) {
                        style.width  = 100
                    }
                    this.setState({ style });
                }

                handleCanvasHeightChange = (event) => {
                    event.preventDefault();
                    const style = this.state.style
                    style.height = event.target.value
                    if(style.height > 1000){
                        style.height = 1000
                    }
                    if(style.height < 100) {
                        style.height  = 100
                    }
                    this.setState({ style });
                }

                render() {
                    const style = {
                        borderColor: this.state.style.borderColor,
                        backgroundColor: this.state.style.backgroundColor, 
                        borderRadius: parseInt(this.state.style.borderRadius) + "px",
                        borderWidth: parseInt(this.state.style.borderWidth) + "px",
                        borderStyle: "solid",
                        margin: parseInt(this.state.style.margin) + "px",
                        height: parseInt(this.state.style.height) + "px",
                        width: parseInt(this.state.style.width) + "px",
                        position : "absolute",
                        textBoxFontColor : this.state.style.textBoxFontColor,
                        textBoxFontSize : parseInt(this.state.style.textBoxFontSize) + "px"
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
                                               value = {this.state.style.borderRadius}
                                               variant = "outlined" 
                                               onChange = {this.handleBorderRadiusChange} 
                                               style = {{marginTop : "20px"}}
                                               type = "number"
                                               InputProps={{ inputProps: { min: 1, max: 50, step : 2 } }}
                                               error ={this.state.style.borderRadius > 0 && this.state.style.borderRadius < 51 ? false : true }
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
                                               value = {this.state.style.borderWidth}
                                               variant = "outlined" 
                                               onChange = {this.handleBorderWidthChange} 
                                               style = {{marginTop : "30px"}}
                                               type = "number"
                                               InputProps={{ inputProps: { min: 1, max: 50, step : 2 } }}
                                               error ={this.state.style.borderWidth > 0 && this.state.style.borderWidth < 51 ? false : true }
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
                                               value = {this.state.style.margin}
                                               variant = "outlined" 
                                               onChange = {this.handleMarginChange} 
                                               style = {{marginTop : "30px"}}
                                               type = "number"
                                               InputProps={{ inputProps: { min: 0, max: 50 } }}
                                               error ={this.state.style.margin > 0 && this.state.style.margin < 51 ? false : true }
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
                                        disabled={this.state.whiteSpace}
                                        style = {{marginTop : 20, backgroundColor : "#1976d2"}}
                                        startIcon = { <SaveOutlinedIcon/> }
                                    >
                                        Save Changes
                                    </Button>
                                    </form>
                                    <div id = "createScreenLogoCanvas" style = {{display : "flex"}}>
                                        <LogoCanvas styles = {style}></LogoCanvas>
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
                                               value = {this.state.style.textBoxFontSize}
                                               variant = "outlined" 
                                               onChange = {this.handleTextBoxFontSizeChange} 
                                               style = {{marginTop : "20px"}}
                                               type = "number"
                                               InputProps={{ inputProps: { min: 1, max: 100, step : 2 } }}
                                               error ={this.state.style.textBoxFontSize > 0 && this.state.style.textBoxFontSize < 101 ? false : true }
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
                                               value = {this.state.style.width}
                                               variant = "outlined" 
                                               onChange = {this.handleCanvasWidthChange} 
                                               style = {{marginTop : "20px"}}
                                               type = "number"
                                               InputProps={{ inputProps: { min: 100, max: 1000, step : 5 } }}
                                               error ={this.state.style.width > 99 && this.state.style.width < 1001 ? false : true }
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
                                               value = {this.state.style.height}
                                               variant = "outlined" 
                                               onChange = {this.handleCanvasHeightChange} 
                                               style = {{marginTop : "20px"}}
                                               type = "number"
                                               InputProps={{ inputProps: { min: 100, max: 1000, step : 5 } }}
                                               error ={this.state.style.height > 99 && this.state.style.height < 1001 ? false : true }
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
