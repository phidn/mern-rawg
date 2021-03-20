import express from "express";
import { likeVideo, getAll } from "./../controllers/videoController";
import { verifyToken } from "./../middlewares/verifyToken";

const Router = express.Router();
Router.route("/like/:rawgVideoId").post(verifyToken, likeVideo);
Router.route("/like/getAll").get(verifyToken, getAll);

module.exports = Router;
