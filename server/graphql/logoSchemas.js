var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
let LogoCanvasModel = require('../models/logoCanvas');


//SECTION: TextBox type and input

var logoTextBoxType = new GraphQLObjectType({
    name: "logoTextBox",
        fields: function () {
            return {
            text: {
                type: GraphQLString,
            },
            color: {
                type: GraphQLString,
            },
            fontSize: {
                type: GraphQLInt,
            },
            width : {
                type : GraphQLInt
            },
            height : {
                type : GraphQLInt
            },
            xCoord: {
                type: GraphQLInt,
            },
            yCoord: {
                type: GraphQLInt,
            },
        };
     },
});

var logoTextBoxTypeInput = new GraphQLInputObjectType({
    name: "logoTextBoxInput",
        fields: function () {
            return {
                text: {
                    type: GraphQLString,
                },
                color: {
                    type: GraphQLString,
                },
                fontSize: {
                    type: GraphQLInt,
                },
                width : {
                    type : GraphQLInt
                },
                height : {
                    type : GraphQLInt
                },
                xCoord: {
                    type: GraphQLInt,
                },
                yCoord: {
                    type: GraphQLInt,
                },
            };
        },
});


// SECTION: Image type and input

var logoImageType = new GraphQLObjectType({
    name: "logoImage",
    fields: function () {
        return {
            name: {
                type: GraphQLString,
            },
            source: {
                type: GraphQLString,
            },
            width : {
                type : GraphQLInt
            },
            height : {
                type : GraphQLInt
            },
            xCoord: {
                type: GraphQLInt,
            },
            yCoord: {
                type: GraphQLInt,
            },
        };
    },
});

var logoImageTypeInput = new GraphQLInputObjectType({
    name: "logoImageInput",
    fields: function () {
        return {
            name: {
                type: GraphQLString,
            },
            source: {
                type: GraphQLString,
            },
            width : {
                type : GraphQLInt
            },
            height : {
                type : GraphQLInt
            },
            xCoord: {
                type: GraphQLInt,
            },
            yCoord: {
                type: GraphQLInt,
            },
        };
    },
});

// SECTION: logoCanvas type

var logoCanvasType = new GraphQLObjectType({
    name: "logo",
    fields: function () {
      return {
        _id: {
          type: GraphQLString,
        },
        backgroundColor: {
            type: GraphQLString,
        },
        borderColor: {
            type: GraphQLString,
        },
        borderRadius: {
            type: GraphQLInt,
        },
        borderWidth: {
            type: GraphQLInt,
        },
        margin: {
            type: GraphQLInt,
        },
        height: {
            type: GraphQLInt,
        },
        width: {
            type: GraphQLInt,
        },
        textBoxFontColor : {
            type: GraphQLString
        },
        textBoxFontSize : {
            type : GraphQLInt
        },
        textBoxList: {
            type: GraphQLList(logoTextBoxType),
        },
        imageList: {
            type: GraphQLList(logoImageType),
        },
        lastUpdate: {
            type: GraphQLDate,
        },
      };
    },
  });


  var queryType = new GraphQLObjectType({
    name: "Query",
    fields: function () {
      return {
        logos: {
          type: new GraphQLList(logoCanvasType),
          resolve: function () {
            const logos = LogoCanvasModel.find().exec();
            if (!logos) {
              throw new Error("Error");
            }
            return logos;
          },
        },
        logo: {
          type: logoCanvasType,
          args: {
            id: {
              name: "_id",
              type: GraphQLString,
            },
          },
          resolve: function (root, params) {
            const logoDetails = LogoCanvasModel.findById(params.id).exec();
            if (!logoDetails) {
              throw new Error("Error");
            }
            return logoDetails;
          },
        },
      };
    },
  });

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoCanvasType,
                    args: {
                  
                        backgroundColor: {
                            type: new GraphQLNonNull(GraphQLString),
                        },
                        borderColor: {
                            type: new GraphQLNonNull(GraphQLString),
                        },
                        borderRadius: {
                            type: new GraphQLNonNull(GraphQLInt),
                        },
                        borderWidth: {
                            type: new GraphQLNonNull(GraphQLInt),
                        },
                        margin: {
                            type: new GraphQLNonNull(GraphQLInt),
                        },
                        height: {
                            type: new GraphQLNonNull(GraphQLInt),
                        },
                        width: {
                            type: new GraphQLNonNull(GraphQLInt),
                        },
                        textBoxFontColor : {
                            type: new GraphQLNonNull(GraphQLString),
                        },
                        textBoxFontSize : {
                            type : new GraphQLNonNull(GraphQLInt)
                        },
                        textBoxList : {
                            type: new GraphQLNonNull(GraphQLList(logoTextBoxTypeInput)),
                        },
                        imageList: {
                            type: new GraphQLNonNull(GraphQLList(logoImageTypeInput)),
                        },
                    },
                    resolve: function (root, params) {
                    const logoCanvasModel = new LogoCanvasModel(params);
                    const newLogoCanvas = logoCanvasModel.save();
                    if (!newLogoCanvas) {
                        throw new Error("Error");
                    }
                        return newLogoCanvas;
                    },
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });


// TODO: Update logoSchema with appropriate structures for LogoCanvas, LogoTextBox, and LogoImage