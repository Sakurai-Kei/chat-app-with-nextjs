import { Schema, model, models } from "mongoose";
import { IGroupInstance } from "../interfaces/models";

const options = {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
};

const groupInstanceSchema = new Schema<IGroupInstance>(
  {
    member: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: [true, "Group Instance requires a group as member"],
    },
    messages: [],
  },
  options
);

export default models.GroupInstance ||
  model("GroupInstance", groupInstanceSchema);
