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
    async createUser (req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update the user
    async updateUser (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: `No user found with that id.` })
            }

            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a user
    async deleteUser (req, res) {
        try {
            const user = await User.findByIdAndDelete({ _id:req.params.userId });

            if (!user) {
                return res.status(404).json({ message: `No user with that if found.` })
            }

            await Thought.deleteMany({ _id: {$in: user.thoughts} });
            return res.status(200).json({ message: `User and associated thoughts/ reactions have been deleted.` })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add a friend
    async addFriend (req, res) {
        try {
            const friend = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: req.params.friendId} },
                { runValidators: true, new: true}
            )

            if (!friend) {
                return res.status(404).json({ message: `No user found with that Id.`})
            }

            res.status(200).json(friend);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a friend
    async deleteFriend (req, res) {
        try {
            const friend = User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { runValidators: true, new: true }
            )

            if (!friend) {
                return res.status(404).json({ message: `No mathcing id found.`});
            }

            res.status(200).json(friend);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}

// Export
module.exports = userController;