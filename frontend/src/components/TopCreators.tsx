import { useState, useEffect } from "react";
import { request } from "@/reqHandler";
import UserCard from "./UserCard";
import Loader from "./Loader";
import { User } from "@/interface";
const TopCreators = () => {
  const [creators, setCreators] = useState<User[]>([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    request
      .get("user")
      .then((res) => setCreators(res.data))
      .catch((err) => console.log(err));
    setLoader(false);
  }, []);
  const id = localStorage.getItem("userId");
  let creators2: User[] = [];
  if (id) creators2 = creators.filter((item) => item.id !== parseInt(id));
  return (
    <div className=" h-full w-full overflow-auto  ">
      <div className="flex justify-center items-center h-16 w-full mr-15">
        <h3 className="h3-bold text-3xl font-bold">Top Creators</h3>
      </div>
      {loader ? (
        <div className="w-[40%] pl-3 bg-black">
          <Loader />
        </div>
      ) : (
        <ul className="grid xl:grid-cols-2 gap-2 overflow-auto ml-12 w-full ">
          {creators2?.map((creator, index) => (
            <li
              key={creator?.id}
              className={`flex w-[100%] mt-8  ${
                index % 2 === 0 ? "items-start" : "items-end"
              }`}
            >
              <UserCard user={creator} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopCreators;
