var mongoose = require('mongoose');

var logoCanvasComponentsSchema = new mongoose.Schema({
  id: String,
  textBoxCounter : { type : Number, min: 0},
  imageCounter : { type : Number, min: 0},
  bugCounter : { type : Number, min : 0},
  textBoxList : [{ id : String, name : String, text : String, color : String, fontSize : String, background : String, border : Number, height : Number, xCoord : Number, yCoord : Number}],
  imageList : [{ id : String, name : String, source : String, width : Number, height : Number, xCoord : Number, yCoord : Number}]
});

module.exports = mongoose.model('logoCanvasComponents', logoCanvasComponentsSchema);