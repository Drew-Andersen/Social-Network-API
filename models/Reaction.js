// Import
const { Schema, model } = require('mongoose');

// sub-document for the Thought model
const reactionSchema = new Schema(
    {
        // reactionId: {
        //     type: Schema.Types.ObjectId,
        //     default: () => new Types.ObjectId()
        // },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 250
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

// Export
module.exports = reactionSchema;