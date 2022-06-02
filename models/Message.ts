import { Schema, model, models } from "mongoose";
import { IMessage } from "../interfaces/models";

const options = {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
};

const messageSchema = new Schema<IMessage>(
  {
    content: {
      type: String,
      required: [true, "Content of message cannot be empty"],
    },
    isImage: { type: Boolean, required: [true, "isImage must be defined"] },
    instance: {
      type: String,
      enum: {
        values: ["private", "group"],
        message: "Only private or group string is accepted",
      },
      required: [true, "Instance must be defined"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Message must have author"],
    },
    timestamp: { type: Date },
  },
  options
);

export default models.Message || model("Message", messageSchema);
