import mongoose, { Schema, models } from "mongoose";

const usersSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    maxLength: 20,
  },
  rooms: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: [],
  },
  favoriteColor: {
    type: String,
    default: "white",
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  date_joined: {
    type: Date,
    default: () => Date.now(),
  },
});

export default models.Users || mongoose.model("Users", usersSchema);
