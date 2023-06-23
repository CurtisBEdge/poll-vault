import express from "express";
import { getPolls, createPoll, deletePolls, vote, getSinglePoll } from "../controllers/poll-controller.js";
import { isAdmin } from "../controllers/auth-controller.js";
import { addComment, getComments } from "../controllers/comment-controller.js";
import poll from "../models/Poll.js";


const pollRouters = express.Router();

pollRouters.get('/', getPolls)
pollRouters.patch('/:id/:optionid', vote)
pollRouters.use(isAdmin)
pollRouters.post('/', createPoll)
pollRouters.get('/:id', getSinglePoll)
pollRouters.delete('/:id', deletePolls)
pollRouters.get('/:id/comments', getComments)
pollRouters.post('/:id/addcomment', addComment)

export default pollRouters;