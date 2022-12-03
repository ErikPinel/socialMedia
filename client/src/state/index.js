import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  currentFriendChat:null,
  
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
       
        state.user.friends = action.payload.friends;
        
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setCurrentFriendChat: (state, action) => {
      console.log("wowState"+action.payload.currentFriendChat)
      state.currentFriendChat = action.payload.currentFriendChat;
    },
    setTwitter: (state, action) => {
      console.log("tititititititi"+action.payload.twitterValue)
      state.user.twitter = action.payload.twitterValue;
    },

    setLinkedin: (state, action) => {
      state.user.linkedin = action.payload.linkedinValue;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setCurrentFriendChat,setLinkedin, setTwitter} =
  authSlice.actions;
export default authSlice.reducer;
