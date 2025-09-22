import mongoose, { Document } from "mongoose";

export interface CheeseDocument extends Document {
  name?: string;
  userId?: string;
  description?: string;
  date?: Date;
  milkType?: string;
  milkOrigin: string;
  milkQuantity?: number;
  public?: boolean;
  status?: string;
  making?: object;
  ripening?: object;
  taste?: object;
}

const cheeseSchema = new mongoose.Schema<CheeseDocument>(
  {
    name: { type: String },
    userId: { type: String},
    description: { type: String },
    date: { type: Date, default: Date.now },
    milkType: { type: String },
    milkOrigin: { type: String, default: "Local" }, // Valor per defecte
    milkQuantity: { type: Number },
    public: { type: Boolean, default: false} ,
    status: { type: String, default: "To do"},
    making: { type: Object, default: {} },
    ripening: { type: Object, default: {} },
    taste: { type: Object, default: {} }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<CheeseDocument>("cheeses", cheeseSchema);
