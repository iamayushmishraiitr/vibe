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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PostUploader from "@/components/PostUploader";
import { useState } from "react";
import { request } from "@/reqHandler";
import Loader from "@/components/Loader";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router";
const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: "Minimum 5 characters." })
    .max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z.string(),
  tags: z.string(),
});

export default function Post() {
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [loader, setLoader] = useState(false);
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
  });
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    setLoader(true);
    try {
      const res = await request.post("post", {
        imageUrl: imgUrl,
        tags: values.tags,
        location: values.location,
        caption: values.caption,
        userId: localStorage.getItem("userId"),
      });
      setLoader(true);
      if(res) toast.success("posted Succesfully");
      setTimeout(()=>window.location.reload() ,1000)
      
    } catch (error) {
      console.log(error);
      setLoader(true);
     toast.error("Could Not Post");
      window.location.reload();
    }
  }
  const handleDataFromChild = (data: string[]) => {
    setImgUrl(data);
  };
  const navigate= useNavigate() ;
  return (
  
    <div className="h-[100vh] w-[100vw] bg-black pt-4 pl-4">
      {loader ? (
        <div className="w-[74%]">
          {" "}
          <Loader />{" "}
        </div>
      ) : (
        <div className="text-white bg-black w-full h-full overflow-auto hide-scrollbar ">
          <div className="w-full h-auto  flex flex-row  justify-center">
          <AddPhotoAlternateOutlined
              sx={{ color: "white", fontSize: "36px" }}
            />
            <h1 className="text-4xl mb-4 ">Create Post</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-bold">
                      Add Picture
                    </FormLabel>
                    <FormControl>
                      <PostUploader
                        fieldChange={field.onChange}
                        imgaeToparent={handleDataFromChild}
                        imageurl={null}
                      />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-bold">
                      Caption
                    </FormLabel>
                    <FormControl className="w-1000">
                      <Textarea
                        className="w-[500px] md:w-99 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-bold">
                      Add Tags
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="w-[500px] text-white h-[50px] md:w-99"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="shad-form_message" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-bold">
                      Add Location
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" flex gap-2 items-center justify-center">
                <Button className="bg-purple-400" type="submit">
                  Submit
                </Button> 
                <Button type="button"  onClick={()=> (navigate('/'))}>Cancel</Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
