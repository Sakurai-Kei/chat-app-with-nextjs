import { Schema, model, models } from "mongoose";
import { IRoomInstance } from "../interfaces/models";

const options = {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
};

const roomInstanceSchema = new Schema<IRoomInstance>(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Room instance requires two users as members"],
      },
    ],
    messages: [
      {
        content: { type: String },
        isImage: { type: Boolean },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        timestamp: { type: Date },
      },
    ],
  },
  options
);

export default models.RoomInstance || model("RoomInstance", roomInstanceSchema);
