const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const Group = mongoose.model('group', GroupSchema);

module.exports = { GroupSchema, Group };