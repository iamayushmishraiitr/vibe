import axios from "axios"
const baseUrl = "https://vibe-qm37.vercel.app";

const request= axios.create({
    baseURL:baseUrl ,
})


export {request} ;