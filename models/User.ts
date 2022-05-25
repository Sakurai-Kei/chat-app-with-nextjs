import { Schema, model, models } from "mongoose";
import { IUser } from "../interfaces/models";

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
  },
  options
);

export default models.User || model("User", userSchema);
