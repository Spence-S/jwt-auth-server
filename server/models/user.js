import mongoose, { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

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

//secure the password with pre-save middleware
UserSchema.pre('save', function(next){
  let user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            // Store hash in your password DB.
            user.password = hash;
            next();
        });
    });
  }else{
    next();
  }
});

//compare passwords on lookup
UserSchema.methods.comparePassword = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
}

const User = mongoose.model( 'User', UserSchema );

export default User;
