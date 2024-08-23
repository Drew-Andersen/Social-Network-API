// Import
const router = require('express').Router();

// Import functions from the thoughtController
const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// Route to '/api/thoughts' -- Tested and works!
router.route('/').get(getThoughts).post(createThought);

// Route to '/api/thoughts/:thoughtId' -- Tested and works!
router.route('/:thoughtId').get(getThought).put(updateThought).delete(deleteThought);

// Route to '/api/thoughts/:thoughtId/reactions' -- Tested and works!
router.route('/:thoughtId/reactions').post(addReaction);

// Route to '/api/thoughts/:thoughtId/reactions/reactionId' -- Tested and works!
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export
module.exports = router;