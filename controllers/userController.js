// Import
const { User, Thought } = require('../models');

// Routing
// Get all users
const userController = {
    async getUsers (req, res) {
        try {
            const users = await User.find()
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' });

            res.status(200).json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Get a single user based on id
    async getUser (req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' });

            if (!user) {
                return res.status(404).json({message: `No user found with that Id.`})
            }

            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a new user
    
}