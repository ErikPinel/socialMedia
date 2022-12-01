import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  allUsers,
  patchConversation,
  getConversation,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", allUsers);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/getConversation/:conversationId", verifyToken, getConversation);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/patchConversation/:conversationId/patch", verifyToken, patchConversation);

export default router;
