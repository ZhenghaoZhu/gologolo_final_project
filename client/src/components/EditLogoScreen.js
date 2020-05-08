import React, { Component } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import DisplayLogo from './DisplayLogo.js';

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
    this.setState({ color: event.target.value });
  };

  handleBackgroundColorChange = (event) => {
    this.buttonStatus = false;
    this.setState({ backgroundColor: event.target.value });
  };

  handleBorderColorChange = (event) => {
    this.buttonStatus = false;
    this.setState({ borderColor: event.target.value });
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
                <div className="container panel panel-default">
                  <div className="leftbox">
                    <div className="panel-heading">
                      <h4>
                        <Link to="/">Home</Link>
                      </h4>
                      <h3 className="panel-title">Edit Logo</h3>
                    </div>
                    <div className="panel-body">
                    <div className = "panel_with_displayed_logo ">
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
                        <div className="form-group">
                          <label htmlFor="color">Color:</label>
                          <input
                            type="color"
                            className="form-control"
                            name="color"
                            placeholder="Color"
                            defaultValue={data.logo.color}
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
                            defaultValue={data.logo.fontSize}
                            onChange={this.handleFontSizeChange}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="color"> Background Color:</label>
                          <input
                            type="color"
                            className="form-control"
                            name="backgroundColor"
                            placeholder="Background Color"
                            defaultValue={data.logo.backgroundColor}
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
                            defaultValue={data.logo.borderColor}
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
                          className="btn btn-success"
                          disabled={this.buttonStatus}
                        >
                          Submit
                        </button>
                      </form>
                      <div id = "displayedLogoViewLogoScreen">
                          <DisplayLogo logo = {{
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
                          }} logoText = {this.state.text}></DisplayLogo>
                      </div>
                    </div>
                      {loading && <p>Loading...</p>}
                      {error && <p>Error :( Please try again</p>}
                    </div>
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
