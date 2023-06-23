import mongoose from "mongoose";
import { isFuture, pollOptionsBoundaries, pollTextValidation, pollURLValidation } from "../polls-utils.js";

const pollSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    validate: [pollTextValidation, "Poll title must not be empty"],
  },
  endTime: {
    type: Date,
    required: true,
    validate: [isFuture, "The end date of the poll must be in the future!"]
  },
  options: {
    type: [{
      name: {
        type: String,
        required: true,
        validate: [pollTextValidation, "Poll option must not be empty"],
      },
      url: {
        type: String,
        required: false,
        validate: [pollURLValidation, "Not a valid URL"]
      },
      voters: {
        type: [String],
        required: false
      },
    }],
    validate: [pollOptionsBoundaries, "Number of poll must be between 2 and 4"]
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
    required: false
  }
}, { strict: false });

const Poll = mongoose.models.Poll || mongoose.model("Poll", pollSchema)

export default Poll