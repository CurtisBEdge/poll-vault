import Poll from "../models/Poll.js";
import Comment from "../models/Comment.js";

export const getComments = (req, res) => {
  console.log("I'm here")
  const { id } = req.params;
  Poll.findById(id)
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username"
      }
    })
    .then((foundRecord) => res.send(foundRecord.comments))
    .catch((error) => {
      res.status(404)
      res.statusMessage = error.toString()
      res.send()
    })
}

export const addComment = (req, res) => {
  const { id } = req.params;
  const { text, timestamp } = req.body;
  const user = req.user;
  const newComment = new Comment({ text, timestamp, user: user._id });
  newComment.save()
    .then((savedComment) => {
      Poll.findById(id)
        .then((foundPoll) => {
          foundPoll.comments.push(savedComment._id)
          return foundPoll.save()
        })
        .then((savedPoll) => res.send({ message: `A new comment '${savedComment.text}' was left on '${savedPoll.title}'` }))
    }).catch((error) => res.send(error))
}