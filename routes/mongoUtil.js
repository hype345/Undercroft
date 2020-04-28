
const MongoClient = require( 'mongodb' ).MongoClient;
const url = ""; //get connection link

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true , useUnifiedTopology: true}, function( err, client ) {
      _db  = client.db(''); //name of cluster
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};