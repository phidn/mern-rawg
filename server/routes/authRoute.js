import express from "express";
import { checkCurrentUser } from "../middlewares/checkCurrentUser";
import { getCurrentUser } from "./../controllers/authController";
import {register, login} from "./../controllers/authController";

const Router = express.Router();
Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/").get(checkCurrentUser, getCurrentUser);

module.exports = Router;
