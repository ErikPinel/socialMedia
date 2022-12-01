import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import { useSelector } from "react-redux";

// const socket = io.connect("http://localhost:3001");

function AppChat() {
  const [username, setUsername] = useState("1");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  let friend = useSelector((state) => state.currentFriendChat);
  let {_id} = useSelector((state) => state.user);

// useEffect(()=>{
//   setUsername(_id)
//   setRoom(friend.conversationId)
//   socket.emit("join_room", friend.conversationId);
//   setShowChat(true);
// },[])

  // const joinRoom = () => {
  //   if (username !== "" && room !== "") {
  //     socket.emit("join_room", room);
  //     setShowChat(true);
  //   }
  // };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          {/* <h3>Join A Chat</h3> */}
          {/* <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }} */}
          {/* /> */}
          {/* <button >Join A Room</button> */}
        </div>
      ) : (
        ""
        // <Chat socket={socket} username={username} room={room} />""
      )}
    </div>
  );
}

export default AppChat;
