import mongoose, { Document } from "mongoose";

export interface CheeseDocument extends Document {
  name?: string;
  userId?: mongoose.Types.ObjectId;
  description?: string;
  date?: Date;
  milkType?: string;
  milkOrigin: string;
  milkQuantity?: number;
  public?: boolean;
  status?: string;
}

const cheeseSchema = new mongoose.Schema<CheeseDocument>(
  {
    name: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: "users" },
    description: { type: String },
    date: { type: Date, default: Date.now },
    milkType: { type: String },
    milkOrigin: { type: String, default: "Local" }, // Valor per defecte
    milkQuantity: { type: Number },
    public: { type: Boolean, default: false} ,
    status: { type: String, default: "Per fer", enum: ['Per fer', 'Fent', 'Madurant', 'Fet', 'Consumint', 'Menjat'] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<CheeseDocument>("cheeses", cheeseSchema);
