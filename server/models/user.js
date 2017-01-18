import mongoose, { Schema } from 'mongoose';
import { ObjectId } from 'mongo-db';
import bcrypt from 'bcrypt-nodejs';

//User schema
const UserSchema = new Schema({
  userName:{
    type: String,
  },
  email:{
    type:String,
    required: true,
    unique: true,
    lowerCase: true,
    minlength:1,
  },
  password:{
    type: String,
    required: true,
    minlength:6
  },
  role:{
    type: String,
    enum: ['admin','user']
  },
  facebook: String
});

//Save hashed passwords only
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

//compare passwords on lookup
userSchema.methods.

const User = mongoose.model( 'User', UserSchema );

export default User;
