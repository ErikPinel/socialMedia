import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import AddComment from "./AddComment";
import Comment from "../../components/Comment"
import Prism from "prismjs"
import "../../prism.css"



const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  type,
  code,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [isCopied, setIsCopied] = useState(false);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const codeSpace= "\n"+ code
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);



  return (
    <WidgetWrapper m="2rem 2rem" >
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
     

      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

  { code?   <Box sx={{display:"flex",justifyContent:"end",marginRight:"4vw", transform:"translateY(50px)"}} >
              
              {isCopied ? (
                <AssignmentTurnedInIcon sx={{color:"white"}}/>
              ) : (
                <ContentCopyIcon sx={{color:"white"}} className="clipIcon"   onClick={() => {
                  navigator.clipboard.writeText(code);
                  setIsCopied(true);
                  setTimeout(()=>{setIsCopied(false);},1000)
                }}  />
              )}
            </Box> :""}

      {code?
          <pre
           style={{"marginBottom":"75px"}}
            onClick={() => {
              navigator.clipboard.writeText(code);
              setIsCopied(true);
              setTimeout(()=>{setIsCopied(false);},1000)
            }}
            className="language-javascript pre-insertion"
          >
           

            <code dir="rtl">{codeSpace}</code>
          </pre>:undefined}



      <Divider />






      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <AddComment postId={postId} userId={loggedInUserId} />
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              { comment.comment.message?  <Comment picturePath={comment.comment.picturePath} commentText={comment.comment.message} occupation={comment.comment.occupation} 
              firstName={comment.comment.firstName}  lastName={comment.comment.lastName} postId={postId} 
              loggedInUserId={loggedInUserId}  currentComment={comment} type={type}/>
              :<Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {"comment"}
              </Typography>}
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
