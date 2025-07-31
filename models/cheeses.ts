import mongoose, { Document } from "mongoose";

export interface CheeseDocument extends Document {
  name?: string;
  userId?: mongoose.Types.ObjectId;
  description?: string;
  date?: Date;
  milk_type?: string;
  milk_quantity?: number;
  public?: boolean;
  status?: string;
}

const cheeseSchema = new mongoose.Schema<CheeseDocument>(
  {
    name: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: "users" },
    description: { type: String },
    date: { type: Date },
    milk_type: { type: String },
    milk_quantity: { type: Number },
    public: { type: Boolean },
    status: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<CheeseDocument>("cheeses", cheeseSchema);
