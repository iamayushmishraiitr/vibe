import jwt  from "jsonwebtoken"
import dontenv from "dotenv"
dontenv.config() 
const SecretKey = process.env.SECRETKEY || "asd"
const generateToken = (username:string, password:string) :string => {
  const token = jwt.sign(
    {
     username: username,
      password: password,
    },
    SecretKey,
    { expiresIn: '3d' }
  );
  return token;
};

export default generateToken