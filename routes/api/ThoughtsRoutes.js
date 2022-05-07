const router = require('express').Router();
// const { createRequire } = require('module');

const {
  getallThoughts,
  getThoubyID,
  createNewThou,
  updateThou,
  deleteThou,
  createNewReaction,
  updateReaction,
  deleteReaction

} = require('../../controllers/thoughtsController');

// just get all the thoughts
router
.route('/')
 .get(getallThoughts)


// get a thought by its id, update or delete it
router
.route('/:thoughtID')
.get(getThoubyID)
.put(updateThou)
.delete(deleteThou)

// create a new thought linked to the user with his id

router.route( '/:enteruserID')
// .post(createNewThou)


// /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field
// DELETE to pull and remove a reaction by the reaction's reactionId value

// create a new reaction per thought using its id
router
.route('/:thoughtId/reactions')
.post (createNewReaction)

// delete a reaction to A THOUGHT using its ID
router
.route('/:thoughtId/reactionsID')
 .delete(deleteReaction)




module.exports = router;
