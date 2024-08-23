import { useEffect, useState } from "react";
import { request } from "@/reqHandler";
import { User } from "@/interface";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUsers } from "@/components/Redux/slice/messageUsers";
import TopCreators from "@/components/TopCreators";

const Message = () => {
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const set = new Set<string>();
  let arr: User[] 
  const navigate= useNavigate() ;
  const dispatch= useDispatch() ;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID is missing");

        const [followersRes, followingRes] = await Promise.all([
          request.get("getFollowers", { params: { id: userId } }),
          request.get("getFollowing", { params: { id: userId } }),
        ]);

        setFollowers(followersRes.data);
        setFollowing(followingRes.data);
      } catch (err) {
        toast.error("An error occured while fetching Data");
        window.location.reload;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex pt-[300px] justify-center h-[100vh]  bg-slate-800  text-4xl  w-[100%] text-white">
        Loading...
      </div>
    );
  for (const it of followers) set.add(it);
  for (const it of following) set.add(it);

  arr= [...set].map((it: string) => JSON.parse(it));
  dispatch(setUsers(arr)) ;
  return (
    <div className="flex h-[100vh] w-[100%] text-white  ">
      <div className="bg-slate-900 pl-[10px]  h-[100%] w-[65%] overflow-auto hide-scrollbar">
        {arr?.map((user, index) => (
          <div key={index} className="flex flex-row text-2xl text-white cursor-pointer mb-[14px] mt-2 mr-2 border-b-2 " onClick={()=>navigate(`${user.id}`)}>
            <img
              src={
                user.userimage === ""
                  ? "../src/assets/fileupload.svg"
                  : user.userimage
              }
              className="rounded-full mt-3 w-[6rem] ml-5 h-[6rem]"
              alt="User"
            />
            <h1 className="text-purple-600 font-bold text-2xl ml-[20px] mt-[20px]" >{user.username}</h1>
          </div>
        ))}
      </div>
      <div className="h-full w-[35%] bg-black">
      <TopCreators/>
      </div>
    </div>
  );
};

export default Message;
