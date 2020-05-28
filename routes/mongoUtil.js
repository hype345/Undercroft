
const mongoose = require('mongoose')

const url = "mongodb+srv://chase:123@cluster0-dgmty.mongodb.net/test?retryWrites=true&w=majority"; 

var _db;

module.exports = {

  connectToServer: async function( callback ) {
    await mongoose.connect( url,  { useNewUrlParser: true , useUnifiedTopology: true}, function( err, client ) {
      return callback( err );
    } );
  }
};
