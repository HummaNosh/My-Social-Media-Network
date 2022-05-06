const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');



module.exports = {

  getallUsers(req, res) {
    User.find()
      .then(async (User) => {
        const UserOB = {
          User,
        //   headCount: await headCount(),
        };
        return res.json(UserOB);
      })
      .catch((err) => {
        console.log("borked", err);
        return res.status(500).json(err);
      });
  },

  getallUsers(req, res) {
    User.findOne({ _id: req.params.userID })
      .select('-__v')
      .then(async (User) =>
        !User
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
            User,
            //   grade: await grade(req.params.userID),
            })
      )
      .catch((err) => {
        console.log("borked", err);
        return res.status(500).json(err);
      });
  },

createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userID })
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No such user exists' })
          :res.json
      )
      .catch((err) => {
        console.log("borked", err);
        res.status(500).json(err);
      });
  },

//   adding a friend..
  newFriend(req, res) {
    console.log('You are adding a new friend- make sure theyre cute');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $addToSet: { friends: req.params.friendId } },
    //   { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res
              .status(404)
              .json({ message: 'No one found with that ID' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },


  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $pull: { friends:req.params.friendId } },
    //   { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res
              .status(404)
              .json({ message: 'No User found with that ID' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
};
