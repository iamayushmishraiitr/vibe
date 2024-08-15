import { Server, Socket } from "socket.io";
import http from "http";
import express from "express";
import Redis, { RedisOptions } from "ioredis";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import manager from "./socketManager"
const prisma = new PrismaClient();
dotenv.config();

const app = express();
const server = http.createServer(app);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

// Redis configuration
const redisConfig: RedisOptions = {
  port: parseInt(process.env.REDIS_PORT ?? "6379", 10),
  host: process.env.REDIS_URL ?? "localhost",
  password: process.env.REDIS_PASSWORD ?? undefined,
};

// Initialize Redis client
const pub = new Redis(redisConfig);
const sub = new Redis(redisConfig);
const userData = new Redis(redisConfig);

pub.on("error", (err: Error) => {
  console.error("Redis error:", err);
});
sub.on("error", (err: Error) => {
  console.error("Redis error:", err);
});

// Interface for user mapping
interface userdata {
  [key: string]: string;
}

// Handle connection
io.on("connection", async (socket: Socket) => {
  const userId = socket.handshake.query.userId as string;
  console.log("The User is connected with sockert id" ,userId ,"  ",socket.id , )
  manager.setUsers(userId,socket.id) ;
  sub.subscribe(`${socket.id}`);
  socket.on('heartbeat', (userId) => {
      const curdate= new Date().toISOString();
      const obj= {userId,curdate} ;
         userData.set("LastSeen",JSON.stringify(obj)) ;
  });
   let data= await userData.get("online") ;
   if(!data) data=""
   const obj = JSON.parse(data);
    io.emit("getOnline" ,data)
    if (sub.listenerCount("message") === 0) {
      sub.on("message", (channel, messages) => {
          io.to(channel).emit("message", messages);
      });
    }

  // GROUPS MESSAGES
  // socket.on("group", async (it) => {
  //   const groupId: string = it.group;
  //   const senderId: string = it.senderId;
  //   const content: string = it.val;
  //   try {
  //     const groupData: any = await userData.get("groups");
  //     if (!groupData) {
  //       const response = await prisma.group.findUnique({
  //         where: { id: groupId },
  //         include: {
  //           users: {
  //             select: {
  //               id: true,
  //             },
  //           },
  //         },
  //       });
  //       if (response) {
  //         let obj2 = {
  //           groupId: response?.users,
  //         };
  //         userData.set("groups", JSON.stringify(obj2));
  //       }
  //     }
  //     const userIds = JSON.parse(groupData);
  //     if (!userIds[groupId]) {
  //       const response = await prisma.group.findUnique({
  //         where: { id: groupId },
  //         include: {
  //           users: {
  //             select: {
  //               id: true,
  //             },
  //           },
  //         },
  //       });
  //       const obj2 = {
  //         groupId: response?.users,
  //       };
  //       userData.set("groups", JSON.stringify(obj2));
  //     }

  //     const arr = userIds[groupId];
  //     for (let it in arr) {
  //       pub.publish("GROUP_MESSAGE", JSON.stringify({val:content,receiverId:it}));
  //     }
  //   } catch (err) {
  //     console.error("Error handling user disconnection:", err);
  //   }
  // });
  // EMIT MESSAGE TO SUBSCRIBER
  // sub.on("message", (channel, message) => {
  //   if (channel === "PRIVATE_MESSAGE") {
  //     const {val,receiverId}:{val:string,receiverId:string}= JSON.parse(message) ;
  //     const socketID=obj[receiverId] ;
  //     if(socketID)
  //      io.to(socketID).emit("message", val);
  //   } 
  // });
 
  socket.on("disconnect", async  () => {
    console.log("User disconnected:", socket.id);
      sub.unsubscribe(userId);
      manager.deleteUser(userId) ;
  });
});

export { app, io, server, sub, pub, userData };
