import React, { Component } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import DisplayLogo from './DisplayLogo.js';
import { Grid, TextField, Button, Avatar, Link as MaterialUILink, Paper } from '@material-ui/core';
import GologoloAppBar from './GologoloNavBarEditScreen.js';
import { GithubPicker, SliderPicker } from 'react-color';
import { SaveIcon } from '@material-ui/icons';

const GET_LOGO = gql`
  query logo($logoId: String) {
    logo(id: $logoId) {
      _id
      text
      color
      fontSize
      backgroundColor
      borderColor
      borderRadius
      borderWidth
      padding
      margin
    }
  }
`;

const UPDATE_LOGO = gql`
  mutation updateLogo(
    $id: String!,
    $text: String!,
    $color: String!,
    $fontSize: Int!,
    $backgroundColor: String!,
    $borderColor: String!,
    $borderRadius: Int!,
    $borderWidth: Int!,
    $padding: Int!,
    $margin: Int!,
  ) {
    updateLogo(
      id: $id
      text: $text
      color: $color
      fontSize: $fontSize
      backgroundColor: $backgroundColor
      borderColor: $borderColor
      borderRadius: $borderRadius
      borderWidth: $borderWidth
      padding: $padding
      margin: $margin
    ) {
      lastUpdate
    }
  }
`;

class EditLogoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      color: null,
      backgroundColor: null,
      borderColor: null,
      borderRadius: null,
      borderWidth: null,
      padding: null,
      margin: null,
      fontSize: null,
      whiteSpace: null,
    };
  }

  text;
  color;
  backgroundColor;
  borderColor;
  borderRadius;
  borderWidth;
  padding;
  margin;
  fontSize;
  buttonStatus = true;

  handleTextChange = (event) => {
    if (event.target.value.trim() === "") {
      this.buttonStatus = true;
    } else {
      this.buttonStatus = false;
    }
    this.setState({ text: event.target.value });
  };

  handleColorChange = (event) => {
    this.buttonStatus = false;
    this.setState({ color: event.hex });
  };

  handleBackgroundColorChange = (event) => {
    this.buttonStatus = false;
    this.setState({ backgroundColor: event.hex });
  };

  handleBorderColorChange = (event) => {
    this.buttonStatus = false;
    this.setState({ borderColor: event.hex });
  };

  handleBorderRadiusChange = (event) => {
    this.buttonStatus = false;
    this.setState({ borderRadius: event.target.value });
  };

  handleWidthChange = (event) => {
    this.buttonStatus = false;
    this.setState({ borderWidth: event.target.value });
  };

  handlePaddingChange = (event) => {
    this.buttonStatus = false;
    this.setState({ padding: event.target.value });
  };

  handleMarginChange = (event) => {
    this.buttonStatus = false;
    this.setState({ margin: event.target.value });
  };

  handleFontSizeChange = (event) => {
    this.buttonStatus = false;
    this.setState({ fontSize: event.target.value });
  };

  changeAll(
    text,
    color,
    backgroundColor,
    borderColor,
    borderRadius,
    borderWidth,
    padding,
    margin,
    fontSize
  ) {
    this.setState({
      text: text,
      color: color,
      fontSize: fontSize,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderRadius: borderRadius,
      borderWidth: borderWidth,
      padding: padding,
      margin: margin
    });
  }
  render() {
    return (
      <Query
        query={GET_LOGO}
        variables={{ logoId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (this.state.text === null) {
            this.changeAll(
              data.logo.text,
              data.logo.color,
              data.logo.backgroundColor,
              data.logo.borderColor,
              data.logo.borderRadius,
              data.logo.borderWidth,
              data.logo.padding,
              data.logo.margin,
              data.logo.fontSize
            );
          }

          return (
            <Mutation
              mutation={UPDATE_LOGO}
              key={data.logo._id}
              onCompleted={() => this.props.history.push(`/`)}
            >
              {(updateLogo, { loading, error }) => (
                <div>
                  <GologoloAppBar>
                  </GologoloAppBar>
                  <Grid
                    id = "editScreenGridContainer"
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    xs = {12}
                  >
                    <Grid item xs = {2}>
                      <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            updateLogo({
                              variables: {
                                id: data.logo._id,
                                text: this.state.text,
                                color: this.state.color,
                                fontSize: parseInt(this.state.fontSize),
                                backgroundColor: this.state.backgroundColor,
                                borderColor: this.state.borderColor,
                                borderRadius: parseInt(this.state.borderRadius),
                                borderWidth: parseInt(this.state.borderWidth),
                                padding: parseInt(this.state.padding),
                                margin: parseInt(this.state.margin)
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
                              defaultValue={data.logo.text}
                              onChange={this.handleTextChange}
                              required
                            />
                          </div>
                          <label htmlFor="text">Font Color:</label>
                          <GithubPicker
                            width = "relative"
                            triangle = "hide"
                            name = "color"
                            colors = {['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB', '#957DAD', '#D291BC', '#fbd4c4', '#e1b09c', '#af8d8d', '#b07777']}
                            defaultValue = {data.logo.color}
                            onChange = {this.handleColorChange}
                          />

                          {/* <label htmlFor="fontSize">Font Size:</label> */}
                          <div className="form-group">
                            <label htmlFor="fontSize">Font Size:</label>
                            <input
                              type="number"
                              min="2"
                              max="80"
                              className="form-control"
                              name="fontSize"
                              placeholder="Font Size"
                              defaultValue={data.logo.fontSize}
                              onChange={this.handleFontSizeChange}
                              required
                            />
                          </div>

                            <label htmlFor="color"> Background Color:</label>
                            <GithubPicker
                            width = "relative"
                            triangle = "hide"
                            name = "color"
                            colors = {['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB', '#957DAD', '#D291BC', '#fbd4c4', '#e1b09c', '#af8d8d', '#b07777']}
                            defaultValue = {data.logo.color}
                            onChange = {this.handleBackgroundColorChange}
                          />

                            <label htmlFor="color"> Border Color:</label>
                            <GithubPicker
                            width = "relative"
                            triangle = "hide"
                            name = "color"
                            colors = {['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB', '#957DAD', '#D291BC', '#fbd4c4', '#e1b09c', '#af8d8d', '#b07777']}
                            defaultValue = {data.logo.color}
                            onChange = {this.handleBorderColorChange}
                          />

                          <div className="form-group">
                            <label> Border Radius:</label>
                            <input
                              type="number"
                              min="2"
                              max="144"
                              className="form-control"
                              name="borderRadius"
                              placeholder="Border Radius"
                              defaultValue={data.logo.borderRadius}
                              onChange={this.handleBorderRadiusChange}
                              required
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
                              defaultValue={data.logo.borderWidth}
                              onChange={this.handleWidthChange}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label>Border Padding:</label>
                            <input
                              type="number"
                              min="2"
                              max="144"
                              className="form-control"
                              name="padding"
                              placeholder="Border Padding"
                              defaultValue={data.logo.padding}
                              onChange={this.handlePaddingChange}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label> Border Margin:</label>
                            <input
                              type="number"
                              min="2"
                              max="144"
                              className="form-control"
                              name="margin"
                              placeholder="Border Margin"
                              defaultValue={data.logo.margin}
                              onChange={this.handleMarginChange}
                              required
                            />
                          </div>

                        <button
                          type="submit"
                          id = "editScreenSubmitButton"
                          className="btn btn-success"
                          disabled={this.buttonStatus}
                          >
                            Submit
                          </button>
                        </form>
                    </Grid>
                        <DisplayLogo id = "editScreenLogo"logo = {{
                            display: "inline-block",
                            color: this.state.color,
                            fontSize: parseInt(this.state.fontSize),
                            backgroundColor: this.state.backgroundColor, 
                            borderRadius: parseInt(this.state.borderRadius), 
                            borderColor: this.state.borderColor,
                            borderWidth: parseInt(this.state.borderWidth),
                            padding: parseInt(this.state.padding),
                            margin: parseInt(this.state.margin),
                            borderStyle: "solid",
                            position: "center",
                          }} logoText = {this.state.text}/>
                  </Grid>
                  <div className="panel-body">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error :( Please try again</p>}
                  </div>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default EditLogoScreen;
