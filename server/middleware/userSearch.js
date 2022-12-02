

export const userSearch = (users,filterValue,id,margin)=>
{

const sorted=users.filter((e)=>((e.firstName+e.lastName).includes(filterValue)&&e._id!=id));
const sort =sorted.filter((e,i)=>i<5);

return sort;
}

