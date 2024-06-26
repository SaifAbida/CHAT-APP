import mongoose, { Schema } from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  name: { type: String, default: "Conversation" },
  created_at: { type: Date, default: Date.now },
});

export const Conversation = mongoose.model("Conversations", conversationSchema);

export interface conversationType {
  [x: string]: any;
  _id?: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  name?: string;
  created_at?: Date;
}
