import axios from "axios"
const baseUrl = "http://localhost:3000";

const request= axios.create({
    baseURL:baseUrl ,
})


export {request} ;