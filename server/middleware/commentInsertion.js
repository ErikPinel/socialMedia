

export const patchCommentByPopularity=(comments,commentIndex,isLike) =>
{
if(!comments[commentIndex-1]&&isLike)
return comments

else if(!comments[commentIndex+1]&&!isLike)
return comments
// stop
console.log("start")

    let temp=comments[commentIndex];
if(comments[commentIndex].likes.length>comments[commentIndex-1]?.likes.length&&isLike)
{
    console.log("s1")
    comments[commentIndex]=comments[commentIndex-1];
    comments[commentIndex-1]=temp
    for(let i = commentIndex;i>0;i--)
{
    if(comments[i].likes.length>comments[i-1].likes.length)
    {
    temp=comments[i];
    comments[i]=comments[i-1];
    comments[i-1]=temp
    }
  //stop loop
}}


//upArray

else if(comments[commentIndex].likes.length<comments[commentIndex+1]?.likes.length&&!isLike)
{
    console.log("s2")
    temp=comments[commentIndex];
    comments[commentIndex]=comments[commentIndex+1];
    comments[commentIndex+1]=temp
    for(let i = commentIndex;i<comments.length-1;i++)
{
    if(comments[i].likes.length<comments[i+1].likes.length)
    {
    temp=comments[i];
    comments[i]=comments[i+1];
    comments[i+1]=temp
    }
  //stop loop
}}







return comments;
}