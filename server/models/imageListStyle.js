var mongoose = require('mongoose');

var imageListStyleSchema = new mongoose.Schema({
  id: String,
  name: {String},
  source: {String},
  width : {String},
  height: {Number},
  xCoord : {Number},
  yCoord : {Number},
});

module.exports = mongoose.model('imageListStyle', imageListStyleSchema);