// Import
const router = require('express').Router();
const apiRoutes = require('./api');

// Middleware
router.use('api', apiRoutes);

// Export
module.exports = router;