import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";
import Loader from "./LoaderModal";
import { request } from "@/reqHandler";
import { User } from "@/interface";

const Follower: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);
  const [val, setVal] = useState<User[]>([]);
  const [val2, setVal2] = useState<string[]>([]);

  useEffect(() => {
    request
      .get("getFollowers", {
        params: { id: localStorage.getItem("userId") },
      })
      .then((res) => {
        setVal2(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch followers");
      });
  }, []);

  useEffect(() => {
    setVal(val2.map((it: string) => JSON.parse(it)));
  }, [val2]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Delete = async (id2: string) => {
    setDel(true);
    try {
      await request.delete("getFollowers", {
        data: {
          id2,
          id1: localStorage.getItem("userId"),
        },
      });
      setVal((prevVal) => prevVal.filter((item) => JSON.stringify(item.id) !== id2));
      toast.success("Deleted Successfully");
    } catch (err) {
      toast.error("Error occurred");
    } finally {
      setDel(false);
    }
  };

  return (
    <div>
      <div
        className="flex flex-row bg-slate-800  items-center justify-center w-34 cursor-pointer"
        onClick={handleOpen}
      >
        <h1 className="mr-2 text-xl text-purple-400">{val.length}</h1>
        <h1 className="text-xl">Followers</h1>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {del ? (
          <Loader />
        ) : (
          <div className="bg-slate-800 rounded-lg h-[450px] w-[600px] mx-auto my-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-white text-center p-4">
              <h2 className="text-2xl mb-4">Followers List</h2>
              <div id="modal-description">
                {val.length > 0 ? (
                  <ul>
                    {val.map((it: User, index: number) => (
                      <li key={index}>
                        <div className="flex flex-row items-center mt-4 ml-5">
                          <img
                            src={
                              it.userimage || "../src/assets/fileupload.svg"
                            }
                            className="rounded-full mt-3 w-[6rem] h-[6rem]"
                            alt="User"
                          />
                          <div className="w-[70%] h-auto flex justify-between">
                            <h1 className="ml-6 text-xl font-bold text-purple-700">
                              {it.username}
                            </h1>
                            <button
                              onClick={() => Delete(JSON.stringify(it.id))}
                              className="h-[3rem] w-20 bg-red-500 rounded-lg mt-4 hover:bg-red-200 hover:text-black"
                            >
                              <h1>Delete</h1>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No followers</p>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Follower;
