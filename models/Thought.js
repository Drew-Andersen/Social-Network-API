// Import
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 250,
            minlength: 15
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

// Increase reaction count in the Thought model when they are added
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

// Creates the Thought Model
const Thought = model('thought', thoughtSchema);

// Export
module.exports = Thought;