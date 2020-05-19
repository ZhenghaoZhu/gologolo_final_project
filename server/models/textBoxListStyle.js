var mongoose = require('mongoose');

var textBoxListStyleSchema = new mongoose.Schema({
  id: String,
  name: {String},
  text: {type : String, default : "Example Text"},
  color : {type : String, default : "#000000"},
  fontSize : { type : String, default : "16" },
  background: { type: String, default : "transparent"},
  border: {Number},
  width: {Number},
  height : {Number},
  xCoord : {Number},
  yCoord : {Number},
});

module.exports = mongoose.model('textBoxListStyle', textBoxListStyleSchema);