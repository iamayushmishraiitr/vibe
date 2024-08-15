import { useSelector } from "react-redux"
import { getMessages } from "../Redux/slice/messages"
import {message} from "@/interface"
const chat = () => {
  const data= useSelector(getMessages) ;
  console.log("data2     ",data)
   const newarr = data.map((it:any)=>JSON.parse(it))  ;
  return (
    <div>
    {newarr && newarr.map((it: message ,index) => 
    (
      <div key={index}> 
        <h1>{it.content}</h1>
        <h1>{it.senderId}</h1>
      </div>
    ))}
  </div>
  
  )
}

export default chat