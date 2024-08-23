import { useSelector } from "react-redux";
import { getMessages } from "../Redux/slice/messages";
import { message } from "@/interface";
import Message from "./Message";
import { useEffect, useRef } from "react";

const Chat = () => {
  const data = useSelector(getMessages);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  const newarr = data.map((it: any) => JSON.parse(it));

  return (
    <div className="overflow-auto x scrollbar-hide">
      {newarr &&
        newarr.map((it: message, index: number) => {
          return (
            <div
              key={index}
              ref={lastMessageRef} 
            >
              <Message message={it} />
            </div>
          );
        })}
    </div>
  );
};

export default Chat;
