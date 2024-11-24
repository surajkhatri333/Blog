import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    // unique: true,
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
  role: {
    type: String,
    enum: ['User' , 'Admin']
  },
}, { timestamps: true });

// Hash the password before saving
// adminSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await hash(this.password, 10);
//   next();
// });

// // Method to compare passwords
// adminSchema.methods.comparePassword = async function (password) {
//   return compare(password, this.password);
// };

export const Admin = mongoose.model('Admin', adminSchema);
