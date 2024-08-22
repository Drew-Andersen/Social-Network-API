const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const { log } = require('console');

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Allow server to listen
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Listening at localhost:${PORT}`);
    })
})