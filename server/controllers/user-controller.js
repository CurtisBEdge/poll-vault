import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid"
import User from "../models/User.js";
import {
  notValidPassword,
  notValidUsername, passwordsDontMatch,

} from "../user-validation.js";

export const ADMIN_ROLE = 'ADMIN_ROLE';
export const VOTER_ROLE = 'VOTER_ROLE'

export const signUp = (req, res) => {
  const { username, password, confirmpassword } = req.body;
  try {
    if (notValidPassword(password) || notValidUsername(username)) {
      throw new Error('Invalid password or username format')
    }
    if (passwordsDontMatch(password, confirmpassword)) {
      throw new Error('Passwords do not match')
    }
  } catch (error) {
    res.status(401)
    res.statusMessage = error.toString()
    return res.send();
  }
  User.findOne({ username })
    .then((foundUser) => {
      if (foundUser) {
        throw new Error('Username already exists')
      }
      const saltRound = 10;
      return bcrypt.hash(password, saltRound)
    })
    .then((hashedPassword) => {
      const newUser = new User({
        username,
        password: hashedPassword,
        token: uuid(),
        role: VOTER_ROLE
      })
      return newUser.save();
    })
    .then((savedUser) =>
      res.send({ message: 'Account created', token: savedUser.token, username }))
    .catch((error) => {
      res.status(403)
      res.statusMessage = error.toString()
      res.send();
    })
}

export const login = (req, res) => {
  const { username, password } = req.body;
  try {
    if (notValidPassword(password) || notValidUsername(username)) {
      throw new Error('Invalid password or username format')
    }
  } catch (error) {
    res.status(401)
    res.statusMessage = error.toString()
    return res.send();
  }
  User.findOne({ username })
    .then((foundUser) => {
      if (!foundUser) {
        throw new Error('Not Authorised');
      }
      return Promise.all([bcrypt.compare(password, foundUser.password), foundUser]);
    })
    .then(([result, foundUser]) => {
      if (!result) {
        throw new Error('Not Authorised');
      }
      foundUser.token = uuid();
      return foundUser.save();
    })
    .then((savedUser) => {
      res.send({ token: savedUser.token, message: 'Logged in', username, "role": savedUser.role });
    })
    .catch((error) => {
      res.status(403)
      res.statusMessage = error.toString();
      res.send();
    })
}