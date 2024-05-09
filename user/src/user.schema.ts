import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id:Number,
  username: String,
  password: String,
  role:String,
});

export interface User extends mongoose.Document {
  id:Number;
  username: string;
  password: string;
  role:string;
}
