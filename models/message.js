const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: String,
  text: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
