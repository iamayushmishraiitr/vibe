import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { setSocket } from '../Redux/slice/socketSlice'
import { addMessages  } from '../Redux/slice/messages';


const socketConnect = () => {
   const dispatch = useDispatch();
   const userId: string|null = localStorage.getItem("userId") 
   const id= localStorage.getItem("userId") 
   useEffect(() => {
      let socket: Socket | undefined;
      if (userId) {
         socket = io("https://vibe-azure.vercel.app", {
            query: {
               userId: userId,
            },
            withCredentials: true,
            reconnectionDelayMax: 5000,
         });
         socket.on("getOnline",(data :any)=>[
                console.log('socket  ujij ' ,data) 
         ])
         socket.on("message" ,(data:string)=>{
            console.log("data found  " ,data)
            dispatch(addMessages(data))
         })
         console.log("inside socket ") ;
         dispatch(setSocket(socket)) ;
         return () => {
            if (socket) {
               dispatch(setSocket(null))
               socket.close();
            }
         };
      } else {
         if (socket) {
            socket.close();
            dispatch(setSocket(null)); 
         }
      }
   }, [id]);

};

export default socketConnect;
