import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type User = {
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


const Followers = ({ user }: { user: User }) => {
  const [user1, setUser1] = useState<User | null>(null);
  const [state, setState] = useState<number>(1); // Default state is 1 (Follow)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/editprofile", {
          params: { id: localStorage.getItem("userId") },
        });
        if(response)
        setUser1(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (user1) {
      const { request, following } = user1;

      const isRequested = request?.includes(user.id.toString());
      const isFollowing = following?.includes(user.id.toString());

      if (isRequested) setState(2);
      if (isFollowing) setState(3);
    }
  }, [user1, user.id]);

  const handleRequest = async () => {
    try {
      if (state === 1) {
        setState(2);
        await axios.post("http://localhost:3000/followrequest", {
          id1: localStorage.getItem("userId"),
          id: user.id,
          username: user.username,
          image: user.userimage,
        });
        toast.success("Follow request sent.");
      } else if (state === 2) {
        setState(1);
        await axios.delete("http://localhost:3000/followrequest", {
          data: {
            id1: localStorage.getItem("userId"),
            id: user.id,
            username: user.username,
            image: user.userimage,
          },
        });
        toast.success("Follow request cancelled.");
      }
    } catch (err) {
      console.error("Error requesting follow:", err);
      toast.error("Error requesting follow. Please try again later.");
    }
  };

  return (
    <button
      onClick={handleRequest}
      className={`bg-purple-700 rounded-lg flex justify-center mt-2 items-center h-10 w-[80px] ${
        state === 3 ? "bg-green-700" : ""
      }`}
    >
      <h1 className="text-[14px]"> {state === 1 ? "Follow" : state === 2 ? "Requested" : "Following"}</h1>
     </button>
  );
};

export default Followers;
