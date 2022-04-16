const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db("dnapattern");
        console.log("Successfully connected to MongoDB.");
        console.log("Database name: " + db.databaseName);
        // list objects in the dna_penyakit collection
        console.log("Listing objects in the dna_penyakit collection:");
        _db
          .collection("dna_penyakit")
          .find({})
          .toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
          });
        console.log("Listing objects in the log collection:");
        _db
          .collection("log")
          .find({})
          .toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
          });
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
