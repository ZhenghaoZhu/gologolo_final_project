var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');
let LogoCanvasStyleModel = require('../models/logoCanvasStyle');

var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            text: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderRadius: {
                type: GraphQLInt
            },
            borderWidth: {
                type: GraphQLInt
            },
            padding: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            },
            lastUpdate: {
                type: GraphQLDate
            },
            ms: {
                type: GraphQLString
            }
        }
    }
});

var logoCanvasStyleType = new GraphQLObjectType({ // Query in create/edit LogoScreen
    name: 'logoCanvasStyle',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            backgroundColor : {
                type : GraphQLString
            },
            borderColor : {
                type : GraphQLString
            },
            borderRadius : {
                type : GraphQLInt
            },
            borderWidth : {
                type : GraphQLInt
            },
            borderStyle : {
                type : GraphQLString
            },
            margin : {
                type : GraphQLInt
            },
            height : {
                type : GraphQLInt
            },
            width : {
                type : GraphQLInt
            },
            textBoxFontColor : {
                type : GraphQLString
            },
            textBoxFontSize : {
                type : GraphQLInt
            },
            lastUpdate: {
                type: GraphQLDate
            }
        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            },
            logoCanvasStyles: {
                type: new GraphQLList(logoCanvasStyleType),
                resolve: function () {
                    const logoCanvasStyles = LogoCanvasStyleModel.find().exec()
                    if (!logoCanvasStyles) {
                        throw new Error('Error')
                    }
                    return logoCanvasStyles
                }
            },
            logoCanvasStyle: {
                type: logoCanvasStyleType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoCanvasStyles = LogoCanvasStyleModel.findById(params.id).exec()
                    if (!logoCanvasStyles) {
                        throw new Error('Error')
                    }
                    return logoCanvasStyles
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    ms : {
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    logoModel.ms = Date.now();
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    ms : {
                        type: GraphQLString
                    }
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id, { text: params.text, 
                                                                    color: params.color, 
                                                                    fontSize: params.fontSize, 
                                                                    backgroundColor: params.backgroundColor, 
                                                                    borderColor: params.borderColor,
                                                                    borderRadius: params.borderRadius,
                                                                    borderWidth: params.borderWidth,
                                                                    padding: params.padding, 
                                                                    margin: params.margin,
                                                                    lastUpdate: new Date(),
                                                                    ms: String(Date.now()) }, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            },
            addLogoCanvasStyle: {
                type: logoCanvasStyleType,
                args: {
                    backgroundColor : {
                        type : new GraphQLNonNull(GraphQLString) 
                    },
                    borderColor : {
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius : {
                        type : new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth : {
                        type : new GraphQLNonNull(GraphQLInt)
                    },
                    borderStyle : {
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    margin : {
                        type : new GraphQLNonNull(GraphQLInt)
                    },
                    height : {
                        type : new GraphQLNonNull(GraphQLInt)
                    },
                    width : {
                        type : new GraphQLNonNull(GraphQLInt)
                    },
                    textBoxFontColor : {
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    textBoxFontSize : {
                        type : new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: function (root, params) {
                    const logoCanvasStyleModel = new LogoCanvasStyleModel(params);
                    const newLogoCanvasStyle = logoCanvasStyleModel.save();
                    if (!newLogoCanvasStyle) {
                        throw new Error('Error');
                    }
                    return newLogoCanvasStyle
                }
            },

            updateLogoCanvasStyle: {
                type: logoCanvasStyleType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    backgroundColor : {
                        type : new GraphQLNonNull(GraphQLString) 
                    },
                    borderColor : {
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius : {
                        type : new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth : {
                        type : new GraphQLNonNull(GraphQLInt)
                    },
                    borderStyle : {
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    margin : {
                        type : new GraphQLNonNull(GraphQLInt)
                    },
                    height : {
                        type : new GraphQLNonNull(GraphQLInt)
                    },
                    width : {
                        type : new GraphQLNonNull(GraphQLInt)
                    },
                    textBoxFontColor : {
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    textBoxFontSize : {
                        type : new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(root, params) {
                    return LogoCanvasStyleModel.findByIdAndUpdate(params.id, { 
                            backgroundColor : params.backgroundColor,
                            borderColor : params.borderColor,
                            borderRadius : params.borderRadius,
                            borderWidth : params.borderWidth,
                            borderStyle : params.borderStyle,
                            margin : params.margin,
                            height : params.height,
                            width : params.width,
                            textBoxFontColor : params.textBoxFontColor,
                            textBoxFontSize : params.textBoxFontSize,
                            lastUpdate: new Date(),
                        }, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeLogoCanvasStyle: {
                type: logoCanvasStyleType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogoCanvasStyle = LogoCanvasStyleModel.findByIdAndRemove(params.id).exec();
                    if (!remLogoCanvasStyle) {
                        throw new Error('Error')
                    }
                    return remLogoCanvasStyle;
                }
            },
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });


// TODO: Update logoSchema with appropriate structures for LogoCanvas, LogoTextBox, and LogoImage