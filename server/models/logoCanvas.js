var mongoose = require('mongoose');

var logoCanvasSchema = new mongoose.Schema({
  id: String,
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 2, max: 60},
  borderWidth: { type: Number, min: 2, max: 100},
  borderStyle : String,
  margin: { type : Number, min: 2, max: 100},
  height : { type : Number, min : 100, max : 1000 },
  width : { type : Number, min : 100, max : 1000 },
  position : {type : String, default : "absolute"},
  textBoxFontColor : {type : String, default : "black"},
  textBoxFontSize : {type : Number, default : 17},
  
  textBoxCounter : { type : Number, min: 0},
  imageCounter : { type : Number, min: 0},
  bugCounter : { type : Number, min : 0},

  textBoxList : [{ 
    name : String, 
    text : String, 
    color : String, 
    fontSize : String, 
    background : String, 
    border : Number, 
    height : Number, 
    xCoord : Number, 
    yCoord : Number
  }],

  imageList : [{ 
    name : String, 
    source : String, 
    width : Number, 
    height : Number, 
    xCoord : Number, 
    yCoord : Number
  }],

  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('logoCanvas', logoCanvasSchema);