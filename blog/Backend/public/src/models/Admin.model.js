import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: "false"
  },
  role: {
    type: String,
    enum: ['User', 'Admin']
  },
}, { timestamps: true });



export const Admin = mongoose.model('Admin', adminSchema);
