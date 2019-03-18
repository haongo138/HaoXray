const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adaper = new FileSync('db.json');

db = low(adaper);
// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write();

module.exports = db;
