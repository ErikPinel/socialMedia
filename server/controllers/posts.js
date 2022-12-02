import Post from "../models/Post.js";
import User from "../models/User.js";
import { patchCommentByPopularity } from "../middleware/commentInsertion.js";
// import { filterForYouPosts } from "../middleware/filterForYouPosts.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath, type, code } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
      type,
      code,
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const { likes } = req.body;
    const post = await Post.findById(id);
    post.comments.push({ comment, likes });

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: post.comments },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};



// export const getForYouPosts = async (req, res) => { To do
//   const {userId}=req.params;
//   try {
//     const posts = await Post.find();
//     const user = await User.findOne({_id:userId});
//     filterForYouPosts(posts,user)
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };











/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};






export const UpVoteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const { comment } = req.body;
    comment.likes ? undefined : (comment.likes = []);
    const post = await Post.findById(id);
    const isLiked = comment.likes.some((e) => e.userId === userId);

    if (isLiked) {
      const likeIndex = comment.likes.findIndex((e) => e.userId === userId);
      comment.likes.splice(likeIndex, 1);
    } else {
      comment.likes.push({ userId: userId });
    }
    const commentIndex = post.comments.findIndex((e) => e._id == comment._id);
    post.comments[commentIndex] = comment;
    post.comments = patchCommentByPopularity(post.comments, commentIndex, !isLiked);

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: post.comments },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
