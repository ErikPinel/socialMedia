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
  TextareaAutosize,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";


import "./overflow.css"
import Prism from "prismjs"
import "../../prism.css"
const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [isAddCode,setIsAddCode]=useState(false)
  const[istypeRegular,setIsTypeRegular]=useState(true)
  const[code,setCode]=useState("")
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    
    const type=istypeRegular?"regular":"question"
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    formData.append("code",code);
    formData.append("type", type);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
    setCode("")
    setIsAddCode(false)

  };



     
useEffect(() => {
  Prism.highlightAll();
}, [code]);


  return (
    <WidgetWrapper sx={{margin:"0 2rem"}}>
     

      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath}  />
        <InputBase
          placeholder={istypeRegular?"What's on your mind...":"ask tech queastion..."}
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}




{
isAddCode&&!istypeRegular
  ?
  (<textarea
    className="overflow"
    aria-label="minimum height"
    rows={40}
    cols={80}
    value={code}
    placeholder="copy your code"
    onChange={e=>setCode(e.target.value)}
  />
  
  
  )
  : 
  ("")


}


{   <FlexBetween className="sss" sx={{justifyContent:"end", m:"15px 20px"}}>
   <FlexBetween justifyContent="end" gap="0.25rem" onClick={()=>setIsAddCode(!isAddCode)}>
            {   istypeRegular
            ? 
             ""
            :  
           (isAddCode?
            <RemoveIcon sx={{  fontSize:"1.5rem",color: mediumMain, "&:hover": { cursor: "pointer", color: "rgb(229 9 20)" } }} />
            :
            <AddIcon sx={{ fontSize:"1.5rem", color: mediumMain, "&:hover": { cursor: "pointer" ,color: "rgb(137 226 25)"} }} />)
            }
             
            </FlexBetween>  </FlexBetween>}




      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>
    <FlexBetween gap="0.25rem" onClick={()=>setIsTypeRegular(!istypeRegular)}>
            {   istypeRegular
            ? 
             <ForwardToInboxIcon sx={{ color: mediumMain, "&:hover": { cursor: "pointer" } }} />
            :  
            <LiveHelpIcon sx={{ color: mediumMain, "&:hover": { cursor: "pointer" } }} />
            }
              <Typography color={mediumMain}>{istypeRegular?"regular":"question"}</Typography>
            </FlexBetween>


        {isNonMobileScreens ? (
          <>
           

            {/* <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween> */}
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
   
    </WidgetWrapper>
  );
};

export default MyPostWidget;
