// Import
const { User, Thought } = require('../models');

const thoughtController = {
    // Get all thoughts
    async getThoughts (req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Get a single thought
    async getThought (req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: `No thought found with that Id.`});
            }

            res.status(200).json(thought)
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a thought
    async createThought (req,res) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findByIdAndUpdate(
                req.body.userId,
                { $addToSet: { thoughts: thought._id }},
                { runValidators: true, new: true }
            )

            res.status(200).json({thought, user})
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThought (req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if (!thought) {
                return res.status(404).json({message: `No thought found with that Id.`})
            }

            res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a thought
    async deleteThought (req,res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({message: `No thought with that Id.`})
            }

            res.status(200).json({ message: `Thought and associated reactions have been deleted.`})
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add a reaction
    async addReaction (req,res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true }
            )

            if (!reaction) {
                return res.status(404).json({message: `No thoguth with that Id found.`})
            }

            res.status(200).json(reaction);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a reaction
    async deleteReaction (req,res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId }}},
                { runValidators: true, new: true }
            )

            if (!reaction) {
                return res.status(404).json({message: `Check the Ids - invalid id entered.`});
            }

            res.status(200).json(reaction);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}

// Export
module.exports = thoughtController;