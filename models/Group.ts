import { Schema, model, models } from "mongoose";
import { IGroup } from "../interfaces/models";

const options = {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
};

const groupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: [32, "Max char length is 32"],
    },
    about: {
      type: String,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        content: {
          type: String,
          required: [true, "Message must have content"],
        },
        isImage: { type: Boolean },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        timestamp: { type: Date },
      },
    ],
    imgsrc: { type: String },
  },
  options
);

export default models.Group || model("Group", groupSchema);
