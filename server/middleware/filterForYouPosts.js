
// export const filterForYouPosts = (posts,user) =>{
//     let filtered=[posts[0]];
//     for(let i=1; i<posts.length;i++)
//     {
//         if(user.UserPostsLikes[posts[i].userId]>user.UserPostsLikes[posts[i-1].userId])
//           {
//             for(let j=i;j>=0;j--)
//             {
//                 if(user.UserPostsLikes[posts[j].userId]>user.UserPostsLikes[posts[j-1].userId])
//                 {
//                     let tempPost= posts[j]
//                     posts[j]=posts[j-1];
//                     posts[j-1]=tempPost;

//                 }
//             }
//           }
//     }
//     return posts;

// } To do