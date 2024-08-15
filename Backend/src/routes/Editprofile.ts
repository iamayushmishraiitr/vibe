import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.get('/',async(req,res)=>{
  const id= req.query.id
  if(!id) return res.status(404).send("Please send valid data")
    const user=  await prisma.user.findUnique({
       where:{id:parseInt(id.toString())} 
    })
  if(user?.password) user.password=""
  res.status(200).send(user)
})

router.put("/", async (req: Request, res: Response) => {
  const id = parseInt(req.body.id);
  try {
 const response = await  prisma.user.update({
      where: {
        id: id,
      },
      data:{
          username:req.body.values.username,
          bio: req.body.values.bio,
          userimage: req.body.imgUrl[0] ,
      }
    });
    const responsepost= await prisma.post.findMany({
      where :{
        userId:id
      }
    })
    if (responsepost.length > 0) {
      const updatedPosts = responsepost.map(post => ({
        ...post,
        userimage: req.body.imgUrl[0],
        username: req.body.username
      }));
    
      //console.log("Updated Posyt    " , updatedPosts)
      await Promise.all(updatedPosts.map(updatedPost =>
        prisma.post.update({
          where: { id: updatedPost.id },
          data: {
            userimage: updatedPost.userimage,
            username: updatedPost.username
          }
        })
      ));
    }
    return res.status(200).send("Updates successfully ")
  } catch (error) {
    return res.status(404);
  }
});

export default router;
