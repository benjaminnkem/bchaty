import mongoose, { Schema, models } from "mongoose";

const usersSchema = new Schema({
  username: { type: String, required: true, trim: true },
  rooms: { type: Array, required: true, default: [] },
  color: { type: String, default: "white" },
  date_joined: { type: Date, default: Date.now },
});

export default models.Users || mongoose.model("Users", usersSchema);
