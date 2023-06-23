import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
})

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;