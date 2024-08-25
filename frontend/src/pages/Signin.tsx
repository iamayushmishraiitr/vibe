import { zodResolver } from "@hookform/resolvers/zod";
import { request } from "@/reqHandler";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Loading from "../components/Loader";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const schema = z.object({
  username: z
    .string()
    .min(2, { message: "The length of username should be more than 2" })
    .max(50),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

const Signin: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const res = await request.post("signin", {
        username: data.username,
        password: data.password,
      });
      localStorage.setItem("userId", res.data.message);
      localStorage.setItem("token", res.data.token);
      setLoading(false);
      toast.success("logged in successfully");
      navigate('/')
      window.location.reload()
    } catch {
      toast.error("Failed to log in");
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] text-white bg-black flex items-center justify-center  ">
      {loading ? (
        <Loading />
      ) : (<div className="flex flex-col items-center justify-center  w-[60%] text-white "> 
        <h1 className="mb-14 text-5xl font-bold text-purple-500 border-2 p-2 rounded-lg bg-slate-700">VibeZone</h1>
      <h2 className="text-center text-purple-500 text-3xl font-bold"> Signin </h2>
        <div className="flex items-center justify-center h-[80%] w-[100vw]">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6 flex flex-col items-center justify-center">
            {/* Username input */}
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                {...register("username")}
                type="text"
                placeholder="Username"
                className="block w-full text-white bg-gray-900 px-4 py-2 rounded-md shadow-sm  border-gray-300"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>
            {/* Password input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                {...register("password")}
                type="password"
                placeholder="Password"
                className="block text-white bg-gray-900 w-full px-4 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Sign in button */}
            <div>
              <button
                type="submit"
                className="w-full flex bg-purple-500 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
            <div>
            <h1>
              Don't have an account{" "}
              <span
                className="text-purple-500 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                SignUp
              </span>{" "}
            </h1>
          </div>
          </form>
        </div>
        </div>)}
    </div>
  );
};

export default Signin;
