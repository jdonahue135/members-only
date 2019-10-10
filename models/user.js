var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        last_name: {type: String, required: true, max: 100},
        username: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 100},
        admin_status: {type: Boolean, required: true}
    }
);

// Virtual for user's full name
UserSchema
.virtual('name')
.get(function () {
    return this.first_name + ' ' + this.last_name;
});

//Export model
module.exports = mongoose.model('User', UserSchema);