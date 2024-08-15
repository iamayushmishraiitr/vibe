import { getMessageUsers } from "@/components/Redux/slice/messageUsers";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { User } from "@/interface";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Chat from "@/components/Messages/chat";
import Input from "@/components/Messages/messageInput";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { request } from "@/reqHandler";
import {setMessages} from "../components/Redux/slice/messages";

const MessageDisplay = () => {
  const { id } = useParams(); 
  const arr = useSelector(getMessageUsers);
  const [state, setState] = useState(true);
  const sId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const curUser = arr.find((user: User) => JSON.stringify(user.id) === id);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await request.get("/getMessages", {
          params: {
            sId: sId,
            rId: id,
          },
        });
        dispatch(setMessages(res.data));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    fetchMessages();
  
    return () => {dispatch(setMessages([]))};
  }, [id]);
  
  
  return (
    <div className="bg-slate-900 h-[100vh] w-[100%] text-white">
      <div className="flex flex-col bg-slate-900 h-[91%] w-[100%] overflow-auto hide-scrollbar">
        <div className="flex items-center h-[60px] w-[100%] bg-slate-800 px-4">
          {curUser?.userimage && curUser.userimage !== "" ? (
            <img
              src={curUser.userimage}
              alt="User"
              className="rounded-full h-[60px] w-[60px] mr-1"
            />
          ) : (
            <AccountBoxIcon
              sx={{
                fontSize: "55px",
                borderRadius: "50%",
                backgroundColor: "gray",
                padding: "8px",
                color: "Amber",
              }}
            />
          )}
          <h1 className="text-white ml-4 font-bold mt-1">
            {curUser?.username || "Unknown User"}
          </h1>
        </div>
        <Chat />
      </div>
      <div className="flex flex-row pl-[3px] gap-4 pr-[6px] pt-[10px] relative h-[9%] w-full bg-slate-800">
        <div
          className="h-auto w-auto cursor-pointer"
          onClick={() => setState((prev) => !prev)}
        >
          {state ? (
            <AddIcon
              sx={{
                fontSize: "40px",
                borderRadius: "50%",
                padding: "8px",
                color: "Amber",
              }}
            />
          ) : (
            <CloseIcon
              sx={{
                fontSize: "40px",
                borderRadius: "50%",
                backgroundColor: "gray",
                padding: "8px",
                color: "Amber",
              }}
            />
          )}
        </div>
        <Input />
      </div>
    </div>
  );
};

export default MessageDisplay;
