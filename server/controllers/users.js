import User from "../models/User.js";


import { createConversation } from "../middleware/createConvo.js";
import Conversation from "../models/Conversation.js";
import { userSearch } from "../middleware/userSearch.js";
/* READ */

export const getConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId);
 
   if(conversation)
    {
    res.status(200).json(conversation);
   }
    else res.status(404).json("conversation dose not exist");


    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}





export const searchUserByName = async (req, res) => {
  try {
    const { searchValue, userId } = req.params;
    console.log("sd")
    console.log(userId)
 
    
   if(searchValue)
    {
      const users = await User.find({});
     
     const matchingUsers= userSearch(users,searchValue,userId)
    res.status(200).json(matchingUsers);
   }
    else res.status(404).json("no filter value found");


    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}






export const allUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.find({});
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};



export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    let friends = await Promise.all(
      user.friends.map((friend) => User.findById(friend.friendId))
    );
  console.log("www"+  user.friends[0].conversationId)
  friends= friends.map((e,i)=>
    { return {_id:e._id, firstName:e.firstName, 
      lastName: e.lastName, occupation:e.occupation, location:e.location, picturePath:e.picturePath,
      conversationId:user.friends[i].conversationId}}
    )
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath,conversationId }) => {
        return { _id, firstName, lastName, occupation, location, picturePath,conversationId };
      }
     
    );
    console.log("www"+ formattedFriends[0].conversationId)
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
   const friendIndex= user.friends.findIndex((friend)=>friend.friendId==friendId)
    if (friendIndex!==-1) {
      console.log("conversationId"+user.friends[friendIndex].conversationId)
     await Conversation.findOneAndDelete({_id:user.friends[friendIndex].conversationId}).then("deleted")
      user.friends = user.friends.filter((friend) => friend.friendId !== friendId);
      friend.friends = friend.friends.filter((friend) => friend.friendId !== id);
    } else if (friendId!=id) {
      const conversation=  await createConversation(id,friendId)

      user.friends.push({friendId:friendId,conversationId:conversation._id });
      friend.friends.push({friendId:id,conversationId:conversation._id });
    }
    await user.save();
    await friend.save();

    console.log("fine")
    const friends = await Promise.all(
      user.friends.map((friend) => User.findById(friend.friendId))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const patchConversation = async (req, res) => {
  console.log("patchConvo!!!!!!!!!!!!!!!")
  try {
   
    const { conversationId } = req.params;
    const {room,
      author,
      message,
      time} = req.body;
    console.log("tititit"+req.body.room)
    const conversation = await Conversation.findById(conversationId);


   if(conversation&&room)
    {
      conversation.messages.push({room, author, message, time})
      await conversation.save()
    res.status(200).json(conversation);
   }
    else res.status(404).json("conversation dose not exist");


    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}



export const patchTwitter = async (req, res) => {
  try {
    console.log("!!!1")
    const { userId } = req.params;
    const {twitterValue} = req.body;
console.log("2")
    const user = await User.findOne({_id:userId});


   if(user&&twitterValue)
    {
      console.log("3")
      user.twitter=twitterValue;
      console.log("4")
      await user.save()
      console.log(user.twitter)
    res.status(200).json(user.twitter);
   }
    else res.status(404).json("users twitter could not be updated");


    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}




export const patchLinkedin = async (req, res) => {
  try {
    console.log("!!!1")
    const { userId } = req.params;
    const {linkedinValue} = req.body;
console.log("2")
    const user = await User.findOne({_id:userId});


   if(user&&linkedinValue)
    {
      console.log("3")
      user.linkedin=linkedinValue;
      console.log("4")
      await user.save()
      console.log(user.linkedin)
    res.status(200).json(user.linkedin);
   }
    else res.status(404).json("users linkedin could not be updated");


    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}



