import { Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { addMessages } from "../Redux/slice/messages";
import { request } from "@/reqHandler";
import DropBox from "./dropBox";
import SendIcon from "@mui/icons-material/Send";
const userImage = () => {
  const [flag, setFlag] = useState(true);
  const handleClose = () => setFlag(false);
  const handleDataFromChild = () => setFlag(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const sId = localStorage.getItem("userId");
  const [url,setUrl]= useState("") ;
  const handleImageUrl=(url:string)=>{
      setUrl(url) ; 
  }
  const handleSubmit = () => {
    try {
      const obj = {
        senderId: sId,
        receiverId: id,
        type: "image",
        content:url,
        createAt: new Date(),
      };
      const string = JSON.stringify(obj);
      dispatch(addMessages(string));
      request.post("/sendMessage", {
        rId: id,
        content: url,
        sId,
        type: "image",
      });
    } catch (error) {
      toast.error("Error occurred");
      console.error("Failed to send message:", error);
    }
  };
  return (
    <Modal
      open={flag}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="flex  justify-between gap-2 h-[280px] w-[400px] absolute left-1/3 top-2/3 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-gray-800 rounded-lg">
      <DropBox onImageUpload={handleImageUrl} /> 
      <button
        type="submit"
        className="ml-2.5"
        onClick={handleSubmit}
      >
        <SendIcon />
      </button>
      </div>
    </Modal>
  );
};

export default userImage;
