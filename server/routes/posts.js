import express from "express";
import { addComment, getFeedPosts, getUserPosts, likePost, UpVoteComment } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


// router.get("/forYou:userId", getForYouPosts);
// router.get("/following ", getFollowingPosts);

/* READ */
router.get("/", getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, addComment);
router.patch("/:id/commentUpVote", verifyToken, UpVoteComment);

export default router;
