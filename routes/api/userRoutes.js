// Import
const router = require('express').Router();

// Import functions from the userController
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// Route to '/api/users' -- Tested and works!
router.route('/').get(getUsers).post(createUser);

// Route to '/api/users/:userId' -- Tested and works!
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

// Route to '/api/users/:userId/friends/:friendId' -- Not working
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

// Export
module.exports = router;