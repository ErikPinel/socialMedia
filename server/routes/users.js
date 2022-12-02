import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  allUsers,
  getConversation,
  patchConversation,
  searchUserByName,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
import { userSearch } from "../middleware/userSearch.js";

const router = express.Router();

/* READ */
router.get("/", allUsers);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/getConversation/:conversationId", verifyToken, getConversation);
router.get("/search/:searchValue/:userId", verifyToken, searchUserByName);


/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/patchConversation/:conversationId/patch", verifyToken, patchConversation);

export default router;
