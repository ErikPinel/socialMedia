import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentFriendChat } from "state";
import { setFriends } from "state";
import { setUserIdChat } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const UseresSearch = ({ friendId, name, subtitle, userPicturePath,conversationId ,friend}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  let friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  if(!user.friends.length)friends=[];//

    // friendListWidigit componet change state from  friend.friendId -> friend._id
  let isFriend =  friends.find((friend) => friend.friendId == friendId|| friend._id == friendId);
  

  
//  let friendIndex = user.friends.findIndex((friend) => friend._id == friendId);



  const patchFriend = async () => {
    dispatch(setCurrentFriendChat({ currentFriendChat:null }));
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      
      },
     
    );
    const data = await response.json();
   
    dispatch(setFriends({ friends: data }));
   
  };



  return (
    <FlexBetween>
      <FlexBetween gap="1rem" 
       >
        <Box
              onClick={() => {
                dispatch(setCurrentFriendChat({ currentFriendChat:friend }));
                // navigate(`/profile/${friendId}`);
                // navigate(0);
              }}
             
        >
        <UserImage image={userPicturePath} size="55px"  />
      </Box>
      
        <Box
    
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
     {friendId!==_id? <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>:undefined}
    </FlexBetween>
  );
};

export default UseresSearch;
