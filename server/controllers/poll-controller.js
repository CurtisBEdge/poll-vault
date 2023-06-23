import Poll from "../models/Poll.js";
import { filterPoll, isFuture } from "../polls-utils.js";

export const getPolls = (req, res) => {
  const { username } = req.user;
  Poll.find()
    .then((pollList) => {
        const returnArray =
          pollList.map((poll) => filterPoll(poll, username))
        res.send(returnArray);
      }
    )
    .catch(() => {
      res.status(400);
      res.statusMessage = "Something went wrong";
      res.send();
    })
}

export const getSinglePoll = (req, res) => {
  const { id } = req.params;
  const { username } = req.user;
  Poll.findById(id)
    .then((foundPoll) => {
      if (!foundPoll) { throw new Error('Poll not found')}
      const filteredPoll = filterPoll(foundPoll, username)
      res.send(filteredPoll)
    })
    .catch(() => {
      res.status(400);
      res.statusMessage = "Something went wrong";
      res.send();
    })
}

export const vote = (req, res) => {
  const { username } = req.user;
  const { id, optionid } = req.params;
  Poll.findById(id)
    .then((foundPoll) => {
      if (!isFuture(foundPoll.endTime - 60000)) {
        throw new Error("Poll is closed :'(")
      }
      const previousVoters = foundPoll.options.id(optionid).voters;
      if (previousVoters.includes(username)) {
        throw new Error("You have already voted")
      }
      previousVoters.push(username);
      return foundPoll.save()
    })
    .then((savedPoll) => res.send(savedPoll))
    .catch((error) => {
      res.status(400);
      res.statusMessage = error.toString();
      res.send();
    })
}

export const createPoll = (req, res) => {
  const { title, endTime, options } = req.body
  const newPoll = new Poll({ title, endTime, options })
  newPoll.save()
    .then((savedPoll) => {
      res.send({
        message: 'New poll created',
        'poll': savedPoll
      })
    })
    .catch((error) => {
      res.status(400);
      res.statusMessage = error.toString();
      res.send();
    });
}

export const deletePolls = (req, res) => {
  const { id } = req.params;
  Poll.findById(id)
    .then((foundPoll) => {
      if (!foundPoll) {
        throw new Error('Poll is not found')
      }
      return Poll.findByIdAndDelete(id)
    })
    .then(() => {
      res.send({
        message: 'Poll has been deleted'
      })
    })
    .catch((error) => {
      res.status(404);
      res.statusMessage = error.toString();
      res.send();
    })
}