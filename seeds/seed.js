// Import
const { User, Thought, Reaction } = require('../models');
const mongoose = require('mongoose');

// Connection
const connection = require('../config/connection');

// Seed the data
const users = [
    {
        username: "Drew",
        email: "drew@mail.com",
        thoughts: [],
        friends: []
    },
    {
        username: "Sam",
        email: "sam@mail.com",
        thoughts: [],
        friends: []
    }
];

console.log(connection);

// Connects to the server
connection.once("open", async () => {
    console.log(`You are now connected`);

    // Deletes all existing students
    await User.deleteMany({});
    
    // Adds the seed data
    await User.collection.insertMany(users);

    console.table(users);
    console.log(`Seeding complete`);
    process.exit(0);
})
