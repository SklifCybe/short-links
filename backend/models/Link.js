const { model, Schema, Types } = require('mongoose');

const schema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  clicks: { type: Number, required: true, default: 0 },
  owner: { type: Types.ObjectId, required: true, ref: 'User' },
});

module.exports = model('Link', schema);
