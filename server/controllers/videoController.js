import Video from "./../models/Video";

exports.likeVideo = async (req,res,next) => {
  try {
    let { userId } = req.user;
    let { rawgVideoId } = req.params;
    let existsVideo = await Video.findOne({
      $and: [{rawgVideoId}, {user: userId}]
    });

    let video = null;
    if(!existsVideo) {
      video = await Video.create({rawgVideoId, user: userId});
      res.status(200).json({
        status:"success"
      })
    } else {
      video = await Video.updateOne(
        { $and: [{rawgVideoId}, {user: userId}] },
        { isLike: !existsVideo.isLike },
        { new: true }
      );
    }
    res.status(200).json({
      status:"success",
      data: { video }
    })

  } catch (error) {
    res.status(500).json(error);
  }
}
