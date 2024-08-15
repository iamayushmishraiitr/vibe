 export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    bio: string;
    userimage: string;
    liked: string[];
    saved: string[];
    request: string[];
    requestrecieve: string[];
    followers: string[];
    following: string[];
    post: string[];
  };
  export interface message{
     senderId:string ,
     createdAt:string,
     content:string ,
     type:string
  }