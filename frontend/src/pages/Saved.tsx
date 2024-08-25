import Loader from "@/components/Loader";
import Postcards from "@/components/Postcards";
import TopCreators from "@/components/TopCreators";
import { request } from "@/reqHandler";
import { useEffect, useState } from "react";

const Saved = () => {
  const [data, setData] = useState<any[]>([]);
  const [loader, setLoader] = useState(true);
  const id = localStorage.getItem("userId");
  useEffect(() => {
   request
      .get("saved", {
        params: { id: id },
      })
      .then((res) => {
        setData(res.data);
        setLoader(false) ;
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="flex h-[100vh] w-[100%] text-white">
      <div className="bg-slate-800 h-[100%] w-[66%] overflow-auto hide-scrollbar">
        {loader ? (
          <Loader />
        ) : data.length === 0 ? (
          <p>No Post Has Been Liked</p>
        ) : (
          data?.map((item ,index) => <Postcards heading={"like"} index={index} post={item} />)
        )}
      </div>
      <div className="w-[34%] pl-3 bg-black hide-scrollbar">
        <TopCreators />
      </div>
    </div>
  );
};

export default Saved;
