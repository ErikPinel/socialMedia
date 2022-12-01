import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    members: [{userId:String}],
    messages: [
      {
         room:String,
         author: String //userId 
        , message: String,
         time: String,
      },
     ],
    },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);
export default Conversation;
