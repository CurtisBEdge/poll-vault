import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;