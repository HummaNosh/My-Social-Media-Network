const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');



module.exports = {

  // below works
  getallUsers(req, res) {
    User.find()
      .then(async (user) => {
        const UserOB = {
          user,
        //   headCount: await headCount(),
        };
        return res.json(UserOB);
      })
      .catch((err) => {
        console.log("borked", err);
        return res.status(500).json(err);
      });
  },
// below works!!
  getUserbyID(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
            user
            //   grade: await grade(req.params.userID),
            })
      )
      .catch((err) => {
        console.log("borked", err);
        return res.status(500).json(err);
      });
  },

  // below works
createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json({message: "Wahoo! You created a new user!!", User}))
      .catch((err) => res.status(500).json({message: "Borked!!", err}));
  },


  // WORK ON THIS!!!!!!!!!!!!!
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          :res.json
      )
      .catch((err) => {
        console.log("borked", err);
        res.status(500).json(err);
      });
  },

// below works
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No course with this id!' })
          : res.json({message:"Wahoo! You have made changes and updated this user successfully!", user})
      )
      .catch((err) => res.status(500).json(err));
  },


//   adding a friend..
  newFriend(req, res) {
    console.log('You are adding a new friend- make sure theyre cute');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.body } },
     { runValidators: true, new: true }
    )
      .then((User) =>
      console.log("is it working?"),
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
      { _id: req.params.id },
      { $pull: { friendsId:req.params.friendId } },
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
