import axios from "axios"
const baseUrl = "https://vibe-azure.vercel.app";

const request= axios.create({
    baseURL:baseUrl ,
})


export {request ,baseUrl} ;