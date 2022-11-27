import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";

  import FlexBetween from "components/FlexBetween";
  import Dropzone from "react-dropzone";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const Comment = ({ picturePath,
     commentText, occupation, 
     firstName, lastName,
      loggedInUserId, postId, 
      currentComment, userId, type}) => {

    const dispatch = useDispatch();
    const { palette } = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const token = useSelector((state) => state.token);
    const isLiked=currentComment.likes?.some(l=>l.userId==loggedInUserId)
    console.log("like"+isLiked)
    const likeCount = currentComment.likes?.length;

  
    const main = palette.neutral.main;
    const primary = palette.primary.main;




      const patchCommentUpVote = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/commentUpVote`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId ,comment:currentComment }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
      };

  
    return (
      <WidgetWrapper 
      sx={{display : "flex",width: "100%",}}

       >
        <FlexBetween gap="1.5rem">
          <UserImage image={picturePath}/>
        </FlexBetween>

        <Box width="100%" ml="10px" sx={{left:"1px"}}>
      

      <Box sx={{
        width: "100%",
        backgroundColor: palette.neutral.light,
        borderRadius: "3%",
        padding: "0.5rem 0.7rem",
        left:"1px"
      }}>
     <Box   sx={{
      fontSize:"1rem",
     
     
      }}>{`${firstName} ${lastName}`}
      </Box>
    

          <Box sx={{
      fontSize:"0.8rem",
      color:mediumMain
      }}>{` works at - ${occupation}`}
      </Box>
        <Divider />
      <Box  mt="0.7rem"  mb="0.7rem" sx={{
       
      }}>{commentText}
      </Box>
     
        </Box>


       {type==="question"?<FlexBetween gap="1rem"><FlexBetween gap="0.3rem">
            <IconButton onClick={patchCommentUpVote}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween> </FlexBetween> : undefined}


      </Box>
      </WidgetWrapper>
    );
  };
  
  export default Comment;
  