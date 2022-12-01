import  Conversation from "../models/Conversation.js";


export const  createConversation= async (userId,friendId) =>
{
    let savedConvo;
    try{
    const newConvo = new Conversation({
        members: [{userId:userId},{userId:friendId}],
        messages: [],
      });
       savedConvo = await newConvo.save();

    } catch(e){
        console.log("createConversation--"+e.messages+"--createConversation--")
    }
      return savedConvo
}