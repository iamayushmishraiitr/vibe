import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import PostUploader from "@/components/PostUploader";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";

const PostValidation = z.object({
  Bio: z.string().optional(),
  file: z.custom<File[]>(),
});

type Data = {
  bio: string;
  email: string;
  id: number;
  image: string;
  saved: string[];
  username: string;
};

export default function EditProfile() {
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [data, setData] = useState<Data | null>(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const res = await axios.get("http://localhost:3000/editprofile", {
          params: { id: localStorage.getItem("userId") },
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      Bio: data?.bio,
      file: []
    }
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    try {
      setLoader(true);
      await axios.put("http://localhost:3000/editprofile", {
        values,
        imgUrl,
        id: localStorage.getItem("userId"),
      });
       toast.success("Profile Edited ");
    } catch (error) {
      toast.error("Profile could not be edited");
    } finally {
      setLoader(false);
    }
  }

  const handleDataFromChild = (data: string[]) => {
    setImgUrl(data);
  };
const navigate= useNavigate() ;
const user= localStorage.getItem("userId") ;
  return (
    <div className="text-white bg-black w-full pt-4 overflow-auto hide hide-scrollbar ">
      <div className="flex flex-row justify-center">
        <EditIcon  sx={{ color: "white", fontSize: "34px" }}/>
        <h1 className="text-3xl ml-2">Edit Profile</h1>
      </div>
      {loader && <Loader />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold">Add Picture</FormLabel>
                <FormControl>
                  <PostUploader
                    fieldChange={field.onChange}
                    imgaeToparent={handleDataFromChild}
                    imageurl={data && data.image}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className="w-[600px] h-[80px] md:w-99 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <div className="flex gap-2 ">
            <Button className="bg-purple-400" type="submit">
              Submit
            </Button>
            <Button type="button" onClick={() =>  navigate(`/people/${user}`)}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
