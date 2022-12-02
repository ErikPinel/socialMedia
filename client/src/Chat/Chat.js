
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFriendChat } from "state";
import RemoveIcon from '@mui/icons-material/Remove';
import FlexBetween from "components/FlexBetween";
import "./App.css"
import { ElectricalServicesSharp } from "@mui/icons-material";

const socket = io.connect("http://localhost:3001");

function Chat() {

 const dispatch = useDispatch();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [username, setUsername] = useState("1");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const token = useSelector((state) => state.token);

  let friend = useSelector((state) => state.currentFriendChat);
  let {_id} = useSelector((state) => state.user);



  const getConversation = async () => {
    
    const response = await fetch(
      `http://localhost:3001/users/getConversation/${friend.conversationId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
      },
     
    );
    const conversationData = await response.json();
     if( conversationData.messages)
     setMessageList(conversationData.messages)
      else  {setMessageList([])
 }
   
  };







  const patchConversation = async (messageData) => {
    

    
    const response = await fetch(
      
      `http://localhost:3001/users/patchConversation/${friend.conversationId}/patch`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body:  JSON.stringify({room:messageData.room,
          author:messageData.author,
          message:messageData.message,
          time:messageData.time})

      
      },
     
    );
   
    const data = await response.json();
   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+data.message)
   
  };



  
useEffect(()=>{
getConversation()

},[friend])

useEffect(()=>{
  setUsername(_id)
  setRoom(friend.conversationId)
  socket.emit("join_room", friend.conversationId);
  setShowChat(true);
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });

},[friend])
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      patchConversation(messageData)// db update
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("000000")
      if(data.author!==_id)
      setMessageList((list) => [...list, data])
    

      socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
      });
    });
  }, []);

  return (
    <div className="chat-window">
      <div className="chat-header">
      <FlexBetween>
          <p>Live Chat -  {friend.occupation}</p>
        <RemoveIcon sx={{marginRight:"5px"}} onClick={()=> dispatch(
        setCurrentFriendChat({ currentFriendChat: null }))} />
        </FlexBetween>
      </div>
      
      <div className="chat-body">
     
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent,i) => {
            return (
              <div
              key={i}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message&&messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time&&messageContent.time}</p>
                    <p id="author">{""}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
