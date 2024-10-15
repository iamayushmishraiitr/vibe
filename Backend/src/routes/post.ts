import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { imageUrl, tags, caption, location, userId } = req.body;
     // console.log("user " ,imageUrl)
      const userInt= parseInt(userId) 
      const findUser= await prisma.user.findUnique({
        where :{
          id: userInt
        }
      })
      
if(!findUser) return res.status(404)
    const response = await prisma.post.create({
      data: {
        imageUrl:imageUrl[0],
        tags,
        caption,
        location,
        userId: userInt,
        username:findUser.username ,
        userimage:findUser.userimage ,
        useremail:findUser.email ,
      },
    });
    const findUser2= await prisma.user.update({
      where :{
        id: userInt
      } ,
      data:{
        post:{
          push:JSON.stringify(response.id)
        }
      }
    })
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).send("Internal Server Error");
  }
});


router.get('/',async(req,res)=>{
     try{
          const data= await prisma.post.findMany()
          
       if(!data) return res.status(404)
          res.status(200).send(data)
       }
     catch(error)
     {
          return res.status(404).send("Error occure")
     }
})
export default router;
