import Loader from "@/components/Loader";
import Postcards from "@/components/Postcards";
import TopCreators from "@/components/TopCreators";
import axios from "axios";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  caption: string;
  imageUrl: string;
  location: string;
  userId: number;
  liked: string[];
  saved: string[];
  tags: string;
  userimage: string;
  username: string;
};

const Home = () => {
  const [post, setPost] = useState<Post[]>([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/post")
      .then((res) => {
        setPost(res.data);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] bg-slate-900 text-white">
      {loader ? (
        <div className="w-[74%]">
          {" "}
          <Loader />{" "}
        </div>
      ) : (
        <div className="h-[100vh] w-[100%] flex">
          <ul className="flex flex-col w-[800px] gap-9">
            <div className="w-[100%] h-[100%] flex flex-col overflow-auto scrollbar-hide">
              {post.map((item ,index) => (
                <Postcards heading={"post"} post={item} index={index}  key={index}  />
              ))}
            </div>
          </ul>
          <div className="w-[400px] pl-3 bg-black">
            <TopCreators />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
