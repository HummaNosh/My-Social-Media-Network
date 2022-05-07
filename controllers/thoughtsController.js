const {User, Thoughts, Types} = require('../models');

module.exports = {

    getallThoughts(req, res) {
        Thoughts.find()
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
}