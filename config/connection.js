// Imports
const { connect, connection } = require('mongoose');

// Creates a variable for database to connect
const connectVariable = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentDB'

// Connects mongooose and mongodb
connect(connectVariable);

// Export
module.exports = connection;