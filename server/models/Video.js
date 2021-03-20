import mongoose from "mongoose";

let videoSchema = new mongoose.Schema({
  rawgVideoId: { type: String, required: [true, "Like function must have video content"] },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  isLike: { type: Boolean, default: true },
}, { timestamps: true });

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
