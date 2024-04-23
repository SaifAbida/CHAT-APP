import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
  conversation_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Conversations",
  },
  sender_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  content: {
    type: String,
    required: true,
  },
  sent_at: { type: Date, default: Date.now },
});

export const Message = mongoose.model("Messages", messageSchema);

export interface messageType extends Document {
  conversation_id: Schema.Types.ObjectId;
  sender_id: Schema.Types.ObjectId;
  content: string;
}
