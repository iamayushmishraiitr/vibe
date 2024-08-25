import { request } from "@/reqHandler";
import { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
const Poststats = (props: any) => {
  const data = props.info;
  const find = data.liked.find((item: any) =>  item === localStorage.getItem("userId") );
 // console.log("find  " ,find)
  let initial = false;
  if (find) initial = true;
  let initialsave = false;
  const find2 = data.saved.find((item: any) => item === localStorage.getItem("userId"));
  if (find2) initialsave = true;
  const [likes, setLikes] = useState(initial);
  const [save, setSave] = useState(initialsave);
  const [number, setNumber] = useState(data.liked.length);
  const like = async () => {
    setLikes((prev: boolean) => !prev);
    if (likes) setNumber((prev: number) => prev - 1);
    else setNumber(number + 1);
    try {
      if (!likes) {
        await request.post("like", {
          userid: localStorage.getItem("userId"),
          id: data.id,
        });
      } else {
        await request.delete("like", {
          data: { userid: localStorage.getItem("userId"), id: data.id },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const savefunction = async () => {
    setSave((prev: boolean) => !prev);
    try {
      if (!save) {
       await request.post("saved", {
          userid: localStorage.getItem("userId"),
          id: data.id,
        });
         
      } else {
       await request.delete("saved", {
          data: { userid: localStorage.getItem("userId"), id: data.id },
        });
      
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="flex  justify-between w-[100%] pl- pr-[1.3] mt-2">
      <div onClick={() => like()} className="flex">
        {likes ? (
         <FavoriteIcon className="text-red-500"/>
        ) : (
           <FavoriteBorderIcon/>
        )}
        <h1 className="ml-0.5 text-xl mb-1">{number}</h1>
      </div>
      <div onClick={savefunction} className="flex">
        {save ? (
           <BookmarkAddedIcon/>
        ) : (
            <BookmarkAddIcon/>
        )}

      </div>
    </div>
  );
};

export default Poststats;
