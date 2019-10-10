var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
    {
        title: {type: String, required: true, max: 100},
        timestamp: {type: Date, required: true, value: Date.now},
        text: {type: String, required: true, max: 100},
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    }
);

//Virtual for formatted timestamp
BookInstanceSchema
.virtual('timestamp_formatted')
.get(function () {
  return moment(this.timestamp).format('LLLL');
});

//Export model
module.exports = mongoose.model('Message', MessageSchema);