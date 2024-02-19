import mongoose from "mongoose";

const webSitesSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    img_logo: { type: String, required: true, unique: true },
    kisa_link: { type: String, required: true, unique: true },
    uzun_link: { type: String, required: true, unique: true },
    ana_baslik: { type: String, required: true, unique: false },
    uzun_aciklama: { type: String, required: true, unique: false },
    meta_etiketleri: [{ type: Array, required: true, unique: false }],
  },
  { timestamps: true }
);

const  Websites = mongoose.model("Websites",webSitesSchema) ;

export default Websites;