import express from "express";
import { likeVideo } from "./../controllers/videoController";
import { verifyToken } from "./../middlewares/verifyToken";

const Router = express.Router();
Router.route("/like/:rawgVideoId").get(verifyToken, likeVideo);

module.exports = Router;
