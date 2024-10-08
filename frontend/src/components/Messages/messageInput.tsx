import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import { request } from "@/reqHandler";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addMessages } from "../Redux/slice/messages";

const MessageInput = () => {
  const [val, setVal] = useState<string>("");
  const { id } = useParams();
  const sId: string | null = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const sendMessage  =() => {
    if (val !== "") {
      try {
        const obj = {
          senderId: sId,
          receiverId: id,
          type: "text",
          content: val,
          createAt: new Date(),
        };
        const string = JSON.stringify(obj);
        dispatch(addMessages(string));
        request.post("/sendMessage", {
          rId: id,
          content: val,
          sId,
          type: "text",
        });
        setVal("");
      } catch (error) {
        toast.error("Error occurred");
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-row w-[94%] h-[80%] mt-[1px]">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Send a message"
        className="border text-sm rounded-lg block relative text-[17px] w-full p-2 mb-1 bg-gray-700 border-gray-600 text-white"
        onKeyDown={handleKeyPress} 
      />
      <button
        type="submit"
        className="ml-2.5"
        onClick={sendMessage} // No need for onKeyDown here
      >
        <SendIcon />
      </button>
    </div>
  );
};

export default MessageInput;
