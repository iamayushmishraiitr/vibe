
import { Link, Outlet, useLocation, useNavigate  } from 'react-router-dom';
import {
    Home,
    AddPhotoAlternateOutlined,
    GroupOutlined,
    FavoriteBorder
  } from "@mui/icons-material"; 
import { Button } from '@/components/ui/button';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import MessageIcon from '@mui/icons-material/Message';
import socketConnect from '@/components/socket/socketConnect';

 const sidebarLinks = [
    {
      icon: <Home sx={{ color: "white", fontSize: "26px" }} />,
      route: "/",
      label: "Home",
    },
    {
      icon: <AddPhotoAlternateOutlined sx={{ color: "white", fontSize: "26px" }} />,
      route: "/post",
      label: "Create Post",
    },
    {
      icon: <GroupOutlined sx={{ color: "white", fontSize: "26px" }} />,
      route: `/people/${localStorage.getItem("userId")}`,
      label: "Profile",
    },
    {
      icon: <FavoriteBorder sx={{ color: "white", fontSize: "26px" }} />,
      route: "/like",
      label: "Liked Posts",
    },
    {
     icon:  <TravelExploreIcon />,
      route: "/explore",
      label: "Explore"
    },
    {  
      icon: <BookmarkAddIcon/> ,
      route: "/saved",
       label: "Saved"
    }  ,
    {  
      icon: <MessageIcon/> ,
      route: "/message",
       label: "Message"
    }  ,
  ];
  
const Front = () => {
  const navigate= useNavigate() ;
  socketConnect() 
  console.log("Teriu adasdsad")
  const  handleSignOut = async()=>{
         alert("Do you Want To SignOut")
              localStorage.removeItem("userId")
              localStorage.removeItem("token")
              navigate('/')
              window.location.reload()            
  }
  const {pathname}= useLocation() ;
  return (
    <div className='flex flex-row h-full w-full '>
    <div className=" text-white bg-black h-screen left-0 top-0 sticky overflow-auto hide-scrollbar px-6 py-2 flex flex-col gap-6 max-md:hidden w-[330px] pl-5  hide-scrollbar">
    <Link to="/">
      <h1 className="w-[200px] h-auto text-4xl text-purple-700 font-bold pl-5 mb-5"> Vibezone</h1>
    </Link>
    <div className="flex flex-col gap-2">

      {sidebarLinks.map((link:any) => {
const isActive= pathname === link.route
        return (
          <Link
            key={link.label}
            to={link.route}
            className={`flex  gap-4 justify-start rounded-lg hover:bg-purple-100 hover:text-black py-2 px-4 ${
              isActive && "bg-purple-500"
            }`}
          >
            {link.icon} <p className="text-light-1">{link.label}</p>
          </Link>
        );
      })}
    </div>
    <Button
        variant="ghost"
        className="shad-button_ghost mt-60 border-t-2"
        onClick={() => handleSignOut()}>
        <img src="../src/assets/logout.svg" alt="logout" />
        <p className="small-medium  lg:base-medium ">Logout</p>
      </Button>
    </div>
    {<Outlet/>}
    </div>
    
  )
}

export default Front