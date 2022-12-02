import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: 
     [{friendId:String,conversationId:String}]
    ,
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
    
    // UserPostsLikes: {
    //   type: Map,
    //   of: Number,
    //   default:0
    // }, To do
  
  },
  
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
