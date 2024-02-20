const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Boşlukları kaldırır
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // E-posta adresini küçük harfe çevirir
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true, 
      trim: true,
    },
  },
  { timestamps: true }
); // Oluşturulma ve güncellenme zaman damgalarını ekler

module.exports = mongoose.model("User", UserSchema);
