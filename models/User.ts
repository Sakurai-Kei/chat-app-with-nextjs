import { Schema, model, models } from "mongoose";
import { IUser } from "../interfaces/models";
import dbConnect from "../lib/mongoDB";
import Message from "./Message";

const options = {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
};

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [3, "Min char length is 3"],
      maxlength: [20, "Max char length is 20"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    about: {
      type: String,
    },
    imgsrc: {
      type: String,
    },
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    roomInstances: [
      {
        type: Schema.Types.ObjectId,
        ref: "RoomInstance",
      },
    ],
  },
  options
);

export default models.User || model("User", userSchema);
