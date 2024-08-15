import Postcards from "@/components/Postcards";
import { request } from "@/reqHandler";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import Followers from "@/components/Modals/Follower";
import Followings from "@/components/Modals/Following";

const Profile = () => {
  const [data, setData] = useState<any>([]);  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    request
      .get("profile", {
        params: { id: id },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);


  const editProfile = async () => {
    navigate("/EditProfile");
  };
 
  const val = data.val;
  const arr = data.arr3;
  console.log("Assaasdsacsa a", val);

  return (
    <div className="bg-black text-white h-[100vh] w-[100vw] items-center justify-center">
      <div className="flex justify-between w-[100%] h-[20%] mt-[2%]">
        <div className="flex w-[100%] h-[70%]">
          <div className="flex flex-row w-[16%]">
            <img
              src={
                val?.userimage === ""
                  ? "../../src/assets/fileupload.svg"
                  : val?.userimage
              }
              alt="Profile image"
              className="rounded-full h-[120px] w-[120px]"
            />
          </div>
          <div className="flex flex-col ml-5 w-[90%]">
            <h1 className="text-3xl mb-3">{val && val.username}</h1>
            <div className="flex gap-8 mt-3 items-center justify-center xl:justify-start flex-wrap z-20">
              <div className="flex flex-row gap-7">
                <div className="flex flex-row bg-slate-800 items-center justify-center w-20">
                  <h1 className="mr-2 text-xl text-purple-400">
                    {arr && arr.length}
                  </h1>
                  <h1 className="text-xl">Posts</h1>
                </div>
                {localStorage.getItem("userId") === id ? (
                  <>
                    <Followers />
                    <Followings />
                  </>
                ) : (
                  <>
                    <div className="flex flex-row bg-slate-800 items-center justify-center w-34">
                      <h1 className="mr-2 text-xl text-purple-400">
                        {val && val?.followers?.length}
                      </h1>
                      <h1 className="text-xl">Followers</h1>
                    </div>
                    <div className="flex flex-row bg-slate-800 items-center justify-center w-34">
                      <h1 className="mr-2 text-xl text-purple-400">
                        {val && val?.following?.length}
                      </h1>
                      <h1 className="text-xl">Following</h1>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {localStorage.getItem("userId") === id && (
          <div className="mr-[2%] w-[15%] mt-[2%]" onClick={editProfile}>
            <h1 className="text-xl ml-2">
              {" "}
              <EditIcon sx={{ color: "white", fontSize: "20px" }} />
              Edit Profile
            </h1>
          </div>
        )}
      </div> 
      <div className="w-[95%] h-[60%] bg-slate-800 overflow-auto hide-scrollbar flex flex-row gap-[10px] flex-wrap">
          <>
            {data && data.length === 0 ? (
              <h1 className="text-2xl">Post Section is empty</h1>
            ) : (
              arr.map((item: any, index:any) => (
                <div className="w-[30%] !h-[10%] webkit-scrollbar transition-transform duration-300 ease-in-out hover:scale-110">
                  <Postcards heading={"profile"} post={item}  index={index} />
                </div>
              ))
            )}
          </>
      </div>
    </div>
  );
};

export default Profile;
