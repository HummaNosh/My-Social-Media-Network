const router = require('express').Router();

const {
  getallUsers,
  getUserbyID,
  createUser,
  updateUser,
  deleteUser,
  newFriend,
  deleteFriend


} = require('../../controllers/userController.js');




// get all the users and create a new one if you want
router
  .route('/')
  .get(getallUsers)
  .post(createUser)

//   get users by the id, update or delete it
  router
  .route('/:id')
 .get(getUserbyID)
  .put(updateUser)
  .delete(deleteUser);


//   /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
// DOUBLE CHECK.............
router
.route('/:id/friends/:friendId')
.post(newFriend)
.delete(deleteFriend)

// not sure
router
.route('/:id/friends')
.post(newFriend)

module.exports = router;
