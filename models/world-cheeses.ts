import mongoose, { Document } from "mongoose";

export interface WorldCheeseDocument extends Document {
  name?: string;
  origin_city?: string;
  origin_country?: string;
  latitude?: string;
  logitude?: string;
  milk_type?: string;
  fermantation_type: string;
  description?: string;
  image?: string;
  awards?: string[];
  price?: number;
}

const worldCheeseSchema = new mongoose.Schema<WorldCheeseDocument>(
  {
    name: { type: String },
    origin_city: { type: String },
    origin_country: { type: String },
    latitude: { type: String },
    logitude: { type: String },
    milk_type: { type: String },
    fermantation_type: { type: String },
    description: { type: String },
    image: { type: String },
    awards: { type: [String] },
    price: { type: Number, default: 0 }, // Valor per defecte
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<WorldCheeseDocument>("world-cheeses", worldCheeseSchema);
