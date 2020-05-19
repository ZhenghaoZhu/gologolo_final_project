var mongoose = require('mongoose');

var logoCanvasStyleSchema = new mongoose.Schema({
  id: String,
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 2, max: 60},
  borderWidth: { type: Number, min: 2, max: 100},
  borderStyle : String,
  margin: { type : Number, min: 2, max: 100},
  height : { type : Number, min : 100, max : 1000 },
  width : { type : Number, min : 100, max : 1000 },
  textBoxFontColor : {type : String, default : "black"},
  textBoxFontSize : {type : Number, default : 17},
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('logoCanvasStyle', logoCanvasStyleSchema);