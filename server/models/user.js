import mongoose, { Schema } from 'mongoose';
import { ObjectId } from 'mongo-db';

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
});
