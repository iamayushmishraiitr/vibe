import { Link } from "react-router-dom";
import Followers from "./Followers";
import { User } from "@/interface";

const UserCard = ({user}:{user:User}) => {
  return (
    <div className='flex flex-col w-full'>
    <Link to={`/people/${user.id}`} >
      
    <img
      src={user?.userimage===""? "../src/assets/fileupload.svg" : user?.userimage}
      alt="creator"
      className="rounded-full w-[60px] h-[60px]"
    />

    <div className="flex-center flex-col ">
      <p className="text-[16px]">
        {user.username}
      </p>
      <p className="text-[16px] text-slate-500 mt-3">
        @{user.username}
      </p>
    </div>
  </Link>
    <Followers  user={user}/>
    </div>
  )
}

export default UserCard