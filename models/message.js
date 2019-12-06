var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
    {
        title: {type: String, required: true, max: 100},
        timestamp: {type: Date, default: Date.now},
        text: {type: String, required: true, max: 100},
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    }
);

//Virtual for formatted timestamp
MessageSchema
.virtual('timestamp_formatted')
.get(function () {
  return moment(this.timestamp).format('LT ll');
});

//Export model
module.exports = mongoose.model('Message', MessageSchema);