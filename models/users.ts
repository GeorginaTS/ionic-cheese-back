import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  profile?: string;
  active?: boolean;
  // afegeix-hi els altres camps que tinguis
}

const userSchema = new Schema<UserDocument>({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  profile: { type: String },
  active: { type: Boolean },
});

export default model<UserDocument>("users", userSchema);
