import axios from "axios";
import { useState } from "react";
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
        await axios.post("http://localhost:3000/like", {
          userid: localStorage.getItem("userId"),
          id: data.id,
        });
      } else {
        await axios.delete("http://localhost:3000/like", {
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
       await axios.post("http://localhost:3000/saved", {
          userid: localStorage.getItem("userId"),
          id: data.id,
        });
         
      } else {
      const res=  await axios.delete("http://localhost:3000/saved", {
          data: { userid: localStorage.getItem("userId"), id: data.id },
        });
        if(res) window.location.reload() ;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="flex  justify-between w-[100%] pl- pr-[1.3] mt-2">
      <div onClick={() => like()} className="flex">
        {likes ? (
          <img src="../src/assets/liked.svg" />
        ) : (
          <img src="../src/assets/like.svg" />
        )}
        <h1 className="ml-0.5 text-xl mb-1">{number}</h1>
      </div>
      <div onClick={savefunction} className="flex">
        {save ? (
          <img src="../src/assets/saved.svg" />
        ) : (
          <img src="../src/assets/save.svg" />
        )}

      </div>
    </div>
  );
};

export default Poststats;
