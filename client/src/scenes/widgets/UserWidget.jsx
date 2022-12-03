import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, Divider, useTheme, InputBase, TextField } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLinkedin, setTwitter } from "state";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [isTwitter, setIsTwitter] = useState(false);
  const [isLinkedin, setIsLinkedin] = useState(false);
  const [twitterValue, setTwitterValue] = useState();
  const [linkedinValue, setLinkedinValue] = useState();
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.user);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };



  const patchTwitter = async () => {
    const response = await fetch(
      `http://localhost:3001/users/twitter/${_id}/patch`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      body: JSON.stringify({twitterValue:twitterValue})
      },
     
    );
    const data = await response.json();
   
    dispatch(setTwitter({twitterValue:twitterValue}));
    user.twitter=data;
  };




  const patchLinkedin = async () => {
    const response = await fetch(
      `http://localhost:3001/users/linkedin/${_id}/patch`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      body: JSON.stringify({linkedinValue:linkedinValue})
      },
     
    );
    const data = await response.json();
   
    dispatch(setLinkedin({linkedinValue:linkedinValue}));
    user.linkedin=data;
  };




  

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath}  />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter"  onClick/>
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
             {isTwitter? 
               <TextField id="standard-basic" label={currentUser.twitter&&currentUser.twitter} variant="standard" 
               onChange={e=>setTwitterValue(e.target.value)}
               />
             :
             <Typography color={medium}>{currentUser.twitter&&currentUser.twitter}</Typography>
           
            }
            </Box>
          </FlexBetween>
         {isTwitter&&_id==userId?
         (
          <FlexBetween>
          <Box onClick={()=>{ patchTwitter();  setIsTwitter(false)}}>  <CheckIcon/></Box>
          <Box onClick={()=>{setIsTwitter(false)}}>  <CloseIcon/></Box>
          </FlexBetween>
         )
         :
         <Box onClick={()=>setIsTwitter(true)}>  <EditOutlined sx={{ color: main }}  /></Box>}
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
            
             {isLinkedin? 
               <TextField id="standard-basic" label={user.linkedin&&user.linkedin} variant="standard"
               onChange={e=>setLinkedinValue(e.target.value)}
               />
             :
             <Typography color={medium}>{user.linkedin&&user.linkedin}</Typography>
              }
            </Box>
          </FlexBetween>
          {isLinkedin&&_id==userId?
         (
          <FlexBetween>
          <Box onClick={()=>{ patchLinkedin();  setIsLinkedin(false)}}>  <CheckIcon/></Box>
          <Box onClick={()=>{setIsLinkedin(false)}}>  <CloseIcon/></Box>
          </FlexBetween>
         )
         :
         <Box onClick={()=>setIsLinkedin(true)}>  <EditOutlined sx={{ color: main }}  /></Box>}
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
