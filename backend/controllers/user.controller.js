import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: "API is working!",
  });
};

// update user

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account!"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// delete user

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can delete only your account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    next(error);
  }
};

//Favoriye Ekleme
export const addFavorite = async (req,res,next) => {
  const { userId } = req.params; // Kullanıcı ID'si URL parametresinden alınır
  const { websiteId } = req.body; // Website ID'si request body'den alınır

    try {
    const user = await User.findById(userId);
    if (!user.favorites.includes(websiteId)) {
      user.favorites.push(websiteId);
      await user.save();
      res.status(200).send(user);
    } else {
      return next(errorHandler(400, "Website already in favorites."));
    }
  } catch (error) {
    next(error);
  }
};



//Favoriden Çıkarma
export const removeFavorite = async (req, res, next) => {
  const { userId, websiteId } = req.params; // Kullanıcı ve Website ID'leri URL parametrelerinden alınır

  try {
    const user = await User.findById(userId);
    user.favorites = user.favorites.filter(
      (favId) => favId.toString() !== websiteId
    );
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
