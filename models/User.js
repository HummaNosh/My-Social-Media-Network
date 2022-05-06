const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');

// Schema to create User model
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      max_length: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
      // must match valid email1!!!
    },
    thoughts: [{
              type: Schema.Types.ObjectId,
              ref: 'Thoughts',
            
          },
        ],  
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
    
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

User
  .virtual('friendCount')
  .get(function () {
    return this.responses.length;
  });

const User = model('user', UserSchema);

module.exports = User;