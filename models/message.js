const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: {type:String, maxLength:20},
  text: {type:String, maxLength:300},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
