

export const patchCommentByPopularity=(comments,commentIndex) =>
{
if(!comments[commentIndex-1])
return comments


    let temp=comments[commentIndex];
if(comments[commentIndex].likes.length>comments[commentIndex-1].likes.length)
{
    comments[commentIndex]=comments[commentIndex-1];
    comments[commentIndex-1]=temp
    for(let i = comments[commentIndex].likes.length-1;i=>0;i--)
{
    if(comments[commentIndex].likes.length>comments[commentIndex-1].likes.length)
    {
    comments[commentIndex]=comments[commentIndex-1];
    comments[commentIndex-1]=temp
    }
}}

return comments;
}