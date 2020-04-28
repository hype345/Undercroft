
const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb+srv://chase:123@cluster0-dgmty.mongodb.net/test?retryWrites=true&w=majority"; //get connection link

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true , useUnifiedTopology: true}, function( err, client ) {
      _db  = client.db('Cluster0'); //name of cluster
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};