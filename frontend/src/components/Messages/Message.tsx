import { message } from "@/interface";
import { useSelector } from "react-redux";
import { getCurUser } from "../Redux/slice/curUsers";
import { getMessageUsers } from "../Redux/slice/messageUsers";
import { useParams } from "react-router";
import { extractTime } from "./getTime";

const Message = ({ message }: { message: message }) => {
  const curUser = localStorage.getItem("userId");
  const { id } = useParams();
  const flag = message.senderId == curUser;
  const chatClassName = flag ? "chat-end" : "chat-start";
  const bubbleBgColor = flag ? "bg-purple-700" : "";
  const curUserData: { name: string; img: string } = useSelector(getCurUser);
  const receiverarr = useSelector(getMessageUsers);
  const Time = extractTime(message.createdAt);
  const receiverData = receiverarr.find((it) => JSON.stringify(it.id) == id);
  return (
    <div
      className={`chat ${chatClassName} text-white  mt-[5px] ml-[10px] mr-[13px] `}
    >
      {message.type === "text" && (
        <div className="chat-image avatar text-white ">
          <div className="rounded-full h-[50px] w-[50px] ">
            {flag ? (
              curUserData.img === "" ? (
                <img src="../../assets/fileupload.svg" />
              ) : (
                <img src={curUserData.img} />
              )
            ) : receiverData?.userimage === "" ? (
              <img src="../../assets/fileupload.svg" />
            ) : (
              <img src={receiverData?.userimage} />
            )}
          </div>
        </div>
      )}
      {message.type === "text" ? (
        <>
          <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>
            {message.content}
          </div>
          {Time!="NaN:NaN" && (
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
              {Time}
            </div>
          )}
        </>
      ) : (
        <div className="h-[300px] w-[400px] flex flex-row gap-2 mt-[5px] ">
          <div className=" w-[90%] h-[400px] ">
            <img src={message.content} />
            <div className="flex flex-row w-[100%] items-end chat-footer opacity-50 text-xs gap-1 ">
              {Time}
            </div>
          </div>
          <div className="flex items-end rounded-full h-[75%] w-[50px] ">
            {flag ? (
              curUserData.img === "" ? (
                <img
                  src="../../assets/fileupload.svg"
                  className="rounded-full h-[50px] w-[50px]"
                />
              ) : (
                <img
                  src={curUserData?.img}
                  className="rounded-full h-[50px] w-[50px]"
                />
              )
            ) : receiverData?.userimage === "" ? (
              <img
                src="../../assets/fileupload.svg"
                className="rounded-full h-[50px] w-[50px]"
              />
            ) : (
              <img
                src={receiverData?.userimage}
                className="rounded-full h-[50px] w-[50px]"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
