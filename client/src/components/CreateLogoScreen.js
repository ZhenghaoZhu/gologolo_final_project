import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import DisplayLogo from './DisplayLogo.js';

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
                    text: "Change this Text",
                    color: "#0000FF",
                    fontSize: 30,
                    borderColor: "#FF0000",
                    backgroundColor: "#00FF00", 
                    borderRadius: 40,
                    borderWidth: 30,
                    padding: 15,
                    margin: 15,
                    whiteSpace: "pre",
                    };
                }

                handleTextChange = (event) => {
                    if (event.target.value.trim() === "") {
                    this.setState({ text: event.target.value, whiteSpace: true });
                    } else {
                    this.setState({ text: event.target.value, whiteSpace: false });
                    }
                };

                handleColorChange = (event) => {
                    this.setState({ color: event.target.value });
                };

                handleBackgroundColorChange = (event) => {
                    this.setState({ backgroundColor: event.target.value });
                };

                handleBorderColorChange = (event) => {
                    this.setState({ borderColor: event.target.value });
                };

                handleBorderRadiusChange = (event) => {
                    this.setState({ borderRadius: event.target.value });
                };

                handleWidthChange = (event) => {
                    this.setState({ borderWidth: event.target.value });
                };

                handlePaddingChange = (event) => {
                    this.setState({ padding: event.target.value });
                };

                handleMarginChange = (event) => {
                    this.setState({ margin: event.target.value });
                };

                handleFontSizeChange = (event) => {
                    this.setState({ fontSize: event.target.value });
                };

                render() {
                    const styles = {
                    container: {
                        color: this.state.color,
                        fontSize: parseInt(this.state.fontSize),
                        backgroundColor: this.state.backgroundColor, 
                        borderRadius: parseInt(this.state.borderRadius), 
                        borderColor: this.state.borderColor,
                        borderWidth: parseInt(this.state.borderWidth),
                        padding: parseInt(this.state.padding),
                        margin: parseInt(this.state.margin)
                    },
                    };
                    return (
                    <Mutation
                        mutation={ADD_LOGO}
                        onCompleted={() => this.props.history.push("/")}
                    >
                        {(addLogo, { loading, error }) => (
                        <div className="container panel panel-default">
                            <div className="leftbox">
                            <div className="panel-heading">
                                <h4>
                                <Link to="/">Home</Link>
                                </h4>
                                <h3 className="panel-title">Create Logo</h3>
                            </div>
                            <div className="panel-body">
                                <div className = "panel_with_displayed_logo">
                                <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    addLogo({
                                    variables: {
                                        text: this.state.text,
                                        color: this.state.color,
                                        backgroundColor: this.state.backgroundColor,
                                        borderColor: this.state.borderColor,
                                        borderRadius: parseInt(this.state.borderRadius),
                                        borderWidth: parseInt(this.state.borderWidth),
                                        padding: parseInt(this.state.padding),
                                        margin: parseInt(this.state.margin),
                                        fontSize: parseInt(this.state.fontSize),
                                        ms: String(Date.now())
                                    },
                                    });
                                }}
                                >
                                <div className="form-group">
                                    <label htmlFor="text">Text:</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name="text"
                                    placeholder="Text"
                                    defaultValue={this.state.text}
                                    onChange={this.handleTextChange}
                                    required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="color">Color:</label>
                                    <input
                                    type="color"
                                    className="form-control"
                                    name="color"
                                    placeholder="Color"
                                    defaultValue={this.state.color}
                                    onChange={this.handleColorChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="fontSize">Font Size:</label>
                                    <input
                                    type="number"
                                    min="2"
                                    max="144"
                                    className="form-control"
                                    name="fontSize"
                                    placeholder="Font Size"
                                    defaultValue={this.state.fontSize}
                                    onChange={this.handleFontSizeChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="color"> Background Color:</label>
                                    <input
                                    type="color"
                                    className="form-control"
                                    name="backgroundColor"
                                    placeholder="Background Color"
                                    defaultValue={this.state.backgroundColor}
                                    onChange={this.handleBackgroundColorChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="color"> Border Color:</label>
                                    <input
                                    type="color"
                                    className="form-control"
                                    name="borderColor"
                                    placeholder="Border Color"
                                    defaultValue={this.state.borderColor}
                                    onChange={this.handleBorderColorChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label> Border Radius:</label>
                                    <input
                                    type="number"
                                    min="2"
                                    max="144"
                                    className="form-control"
                                    name="borderRadius"
                                    placeholder="Border Radius"
                                    defaultValue={this.state.borderRadius}
                                    onChange={this.handleBorderRadiusChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Border Thickness:</label>
                                    <input
                                    type="number"
                                    min="2"
                                    max="144"
                                    className="form-control"
                                    name="borderWidth"
                                    placeholder="Border Width"
                                    defaultValue={this.state.borderWidth}
                                    onChange={this.handleWidthChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Padding:</label>
                                    <input
                                    type="number"
                                    min="2"
                                    max="144"
                                    className="form-control"
                                    name="Padding"
                                    placeholder="Padding"
                                    defaultValue={this.state.padding}
                                    onChange={this.handlePaddingChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Margin:</label>
                                    <input
                                    type="number"
                                    min="2"
                                    max="144"
                                    className="form-control"
                                    name="margin"
                                    placeholder="Border Margin"
                                    defaultValue={this.state.margin}
                                    onChange={this.handleMarginChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={this.state.whiteSpace}
                                >
                                    Submit
                                </button>
                                </form>
                                <div id = "displayedLogoViewLogoScreen">
                                    <DisplayLogo logo = {styles.container} logoText = {this.state.text}></DisplayLogo>
                                </div>
                                </div>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error. Please try again</p>}
                            </div>
                            </div>
                            
                        </div>
                        )}
                    </Mutation>
                    );
                }
                }

export default CreateLogoScreen;
