import User from "./../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({userId: user._id}, process.env.APP_SECRET);
    
    res.status(200).json({
      status: "success",
      data: { token, userName: user.name }
    });

  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    });
    
    if(!user) {
      // Error: Email is not correct
      const err = new Error("Incorrect email address or password, please try again.");
      err.statusCode = 400;
      return next(err);
    }

    if(bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({userId: user._id}, process.env.APP_SECRET);
      
      res.status(200).json({
        status: "success",
        data: { token, userName: user.name }
      });
      
    } else {
      const err = new Error("Incorrect email address or password, please try again.");
      err.statusCode = 400;
      return next(err);
    }

  } catch (error) {
    next(error);
  }
};
