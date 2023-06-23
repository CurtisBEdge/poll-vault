import User from "../models/User.js";
import { ADMIN_ROLE } from "./user-controller.js";

export const authController = (req, res, next) => {
  const token = req.headers["authorization"]
  User.findOne({ token })
    .then((foundUser) => {
      if (foundUser) {
        req.user = foundUser;
        next();
      } else {
        res.status(401);
        res.send({ message: "Access denied " })
      }
    })
}

export const isAdmin = (req, res, next) => {
  const { role } = req.user
  if (role === ADMIN_ROLE) {
    next()
  } else {
    res.status(403)
    res.send({ message: "Not Authorised" })
  }
}