import Poststats from "./Poststats";

const Postcards = ({ post, heading ,index }: { post: any; heading: string|null;index:number }) => {
  return (
    <div className={`h-[100%] w-[100%] cursor-pointer ${heading !== "profile" && "border-b-2 mt-2"} `} key={index}>
      {post && (
        <div className="p-2 pl-3 mb-3  ">
          {heading != "profile" && (
            <div className=" flex justify-between">
              <div className="flex flex-row w-[100%] h-[100%]">
                <div className="flex flex-row  w-[70px] h-[70px]">
                  <img
                    src={
                      post?.userimage === ""
                        ? "../src/assets/fileupload.svg"
                        : post?.userimage
                    }
                    className="w-[full] h-[full] rounded-full "
                    alt="Profile"
                  />
                </div>
                <div className="flex flex-col ml-5 pt-3">
                  <p className="text-[16px] mb-1">{post?.username}</p>
                  <p className="text-[14px]"> {post?.location}</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col w-[100%] h-[50%] gap-1 mt-4 ">
            {heading != "profile" && (
              <>
                <div>{post?.caption}</div>
                <div>{post?.tags}</div>
              </>
            )}
            <img
              src={post?.imageUrl}
              className={`${
                heading === "profile"
                  ? "h-[15rem] w-[23rem] rounded-lg mx-[2%]"
                  : "h-[30rem] w-[43rem] rounded-lg mx-[5%]"
              }`}
            />
          </div>
          {heading !== "profile" && <Poststats info={post} />}
        </div>
      )}
    </div>
  );
};
export default Postcards;
