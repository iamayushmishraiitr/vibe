import axios from "axios"
const baseUrl = "https://vibe-azure.vercel.app";

//http://ec2-65-0-93-152.ap-south-1.compute.amazonaws.com:3000
const request= axios.create({
    baseURL:baseUrl ,
})


export {request ,baseUrl} ;