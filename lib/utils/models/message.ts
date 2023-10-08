import mongoose, { Schema, models } from "mongoose";

const messageSchema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  color: String,
  datetime_sent: String,
});

export default models.Messages || mongoose.model("Messages", messageSchema);
