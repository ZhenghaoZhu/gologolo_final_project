import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import LogoCanvas from './LogoCanvas.js';
import GologoloNavBar from './GologoloNavBar.js';
import { TextField, Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { TwitterPicker } from 'react-color';

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
                            borderColor: "#994735",
                            backgroundColor: "#e5e5e5", 
                            borderRadius: 20,
                            borderWidth: 10,
                            borderStyle: "solid",
                            margin: 2,
                            height: 750,
                            width: 800
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
                    const style = this.state.style
                    style.borderRadius = document.getElementById("borderRadiusInput").value + "px"
                    this.setState({ style });
                };

                handleBorderWidthChange = (event) =>{
                    const style = this.state.style
                    style.borderWidth = document.getElementById("borderWidthInput").value + "px"
                    this.setState({ style });
                };


                handleMarginChange = (event) => {
                    const style = this.state.style
                    style.margin = document.getElementById("marginInput").value + "px"
                    this.setState({ style });
                };

                render() {
                    console.log(this.state)
                    const style = {
                        borderColor: this.state.style.borderColor,
                        backgroundColor: this.state.style.backgroundColor, 
                        borderRadius: this.state.style.borderRadius,
                        borderWidth: this.state.style.borderWidth,
                        borderStyle: "solid",
                        margin: this.state.style.margin,
                        height: this.state.style.height,
                        width: this.state.style.width
                    };
                    console.log(style)
                    return (
                    <div className="container panel panel-default" id = "mainContainer">
                        <div className="leftbox">
                            <div className="panel-heading">
                                <GologoloNavBar currentScreen = "Create Screen"/>
                            </div>
                            <div className="panel-body">
                                <div className = "panel_with_displayed_logo">
                                    <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                    }}
                                    >

                                    <label htmlFor="color"> Background Color:</label>
                                        <TwitterPicker onChange = {this.handleBackgroundColorChange}/>  

                                    <label htmlFor="color" style = {{marginTop : 20}}> Border Color:</label>
                                        <TwitterPicker onChange = {this.handleBorderColorChange}/>

                                    <br></br>
                                    
                                    <label>Border Radius:</label>
                                    <input
                                    id="borderRadiusInput"
                                    type="number"
                                    min="2"
                                    max="144"
                                    className="form-control"
                                    name="borderRadius"
                                    placeholder="Border Radius"
                                    defaultValue={this.state.style.borderRadius}
                                    onChange={this.handleBorderRadiusChange}
                                    />

                                    <br></br>

                                    <label>Border Thickness:</label>
                                    <input
                                    id="borderWidthInput"
                                    type="number"
                                    min="2"
                                    max="144"
                                    className="form-control"
                                    name="borderWidth"
                                    placeholder="Border Width"
                                    defaultValue={this.state.style.borderWidth}
                                    onChange={this.handleBorderWidthChange}
                                    />

                                    <br></br>

                                    <label>Margin:</label>
                                    <input
                                    id="marginInput"
                                    type="number"
                                    min="2"
                                    max="144"
                                    className="form-control"
                                    name="borderWidth"
                                    placeholder="Margin"
                                    defaultValue={this.state.style.margin}
                                    onChange={this.handleMarginChange}
                                    />

                                    <br></br>

                                    <Button
                                        fullWidth
                                        type="submit"
                                        className="btn btn-success"
                                        disabled={this.state.whiteSpace}
                                        style = {{marginTop : 20, backgroundColor : "#424242"}}
                                        startIcon = { <CheckIcon/> }
                                    >
                                        Submit
                                    </Button>
                                    </form>
                                    <div id = "createScreenLogoCanvas">
                                        <LogoCanvas style = {style}></LogoCanvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    );
                }
            }

export default CreateLogoScreen;
