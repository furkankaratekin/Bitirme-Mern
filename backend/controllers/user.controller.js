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
export const addFavorite = async (req, res, next) => {
  const { userId } = req.params; // Kullanıcı ID'si URL parametresinden alınır
  const { websiteId } = req.body; // Website ID'si request body'den alınır

  
  try {
    const user = await User.findById(userId);
    if (!user.favorites.includes(websiteId.toString())) {
      user.favorites.push(websiteId.toString());
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
  const {userId} = req.params;  //Kullancııc ıd'si ırl parametresinden alınır
  const {websiteId} = req.body;  //Kullanıcı website ID'si request bodyden geir

  try{
    const user = await User.findById(userId);
    const index = user.favorites.indexOf(websiteId);
    if (index > -1) {
      user.favorites.splice(index,1);  //Website ID'si favoriler listesinden kaldırılır.
      await user.save();
      res.status(200).send(user);
    } else {
      return next(errorHandler(400, "Website favorilerde bulunamadı"))
    }
  }
  catch(error){
    next(error)
  }
};

//Favori Listeleme
export const listFavorites = async (req, res, next) => {
  const { userId } = req.params; // Kullanıcı ID'si URL parametresinden alınır

  try {
    const user = await User.findById(userId);
    if (user && user.favorites.length > 0) {
      res.status(200).json(user.favorites);
    } else {
      return next(
        errorHandler(404, "No favorites found or user does not exist.")
      );
    }
  } catch (error) {
    next(error);
  }
};




//Favoriden Çıkarma
/* export const removeFavorite = async (req, res, next) => {
  const { userId, websiteId } = req.params; // Kullanıcı ve Website ID'leri URL parametrelerinden alınır
  console.log("remove favorite geldi");
  try {
    const user = await User.findById(userId);
    console.log(user);
    user.favorites = user.favorites.filter(
      (favId) => favId.toString() !== websiteId
    );
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
 */