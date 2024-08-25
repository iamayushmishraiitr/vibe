import axios from "axios"
const baseUrl = "https://vercel.com/ayushs-projects-630e27d6/vibe";

const request= axios.create({
    baseURL:baseUrl ,
})


export {request} ;