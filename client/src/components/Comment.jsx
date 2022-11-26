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
  import FlexBetween from "components/FlexBetween";
  import Dropzone from "react-dropzone";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { styled } from "@mui/system";

  const Comment = ({ picturePath, commentText, occupation ,firstName, lastName}) => {

    const { palette } = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
  


  
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
      </Box>
      </WidgetWrapper>
    );
  };
  
  export default Comment;
  