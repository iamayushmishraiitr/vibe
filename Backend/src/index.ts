import express from "express";
import cors from 'cors';
import postRoute from './routes/post';
import signupRoute from './routes/signup';
import signinRoute from './routes/signin';
import  profileRoute from './routes/profile';
import likeRoute from "./routes/like"
import likedPostRoute from "./routes/likedPost"
import savedRoute from  "./routes/saved"
import editProfile from "./routes/Editprofile"
import userRoute from "./routes/user"
import followrequest from "./routes/followrequest"
import explore from "./routes/explore"
import  getFollowing from "./routes/getFollowing"
import getFollowers from "./routes/getFollwers"
import getMessages  from  "./routes/getMessage"
import sendMessages from "./routes/sendMessage"
import dotenv from "dotenv"
import {app,server} from "./socket/socket"
dotenv.config() ;
app.use(cors()); 
app.use(express.json());
app.use('/post', postRoute);
app.use('/signup', signupRoute) ;
app.use('/signin', signinRoute) ;
app.use('/profile', profileRoute) ;
app.use('/like', likeRoute) ;
app.use('/likedPost', likedPostRoute) ;
app.use('/saved', savedRoute) ;
app.use('/editprofile', editProfile) ;
app.use('/user' ,userRoute)
app.use('/followrequest' ,followrequest)
app.use('/explore' ,explore)
app.use('/getFollowers', getFollowers)
app.use('/getFollowing' , getFollowing)
app.use('/getMessages',getMessages)
app.use('/sendMessage',sendMessages)
const port = process.env.PORT 
server.listen(port, () => {
    console.log(`Connected to port ${port}`);
});

