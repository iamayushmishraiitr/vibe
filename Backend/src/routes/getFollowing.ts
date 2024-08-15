import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

router.delete("/", async (req, res) => {
    const { id1, id2 } = req.body;
  
    if (!id1 || !id2) {
      return res.status(400).send("Send complete data");
    }
  
    try {
      const user1 = await prisma.user.findUnique({
        where: { id: parseInt(id1) },
      });
  
      if (!user1) {
        return res.status(404).send("User1 does not exist");
      }
  
      const updatedFollowing = user1.following.filter((item) => item !== id2.toString());
      await prisma.user.update({
        where: { id: parseInt(id1) },
        data: {
          following: {
            set: updatedFollowing,
          },
        },
      });
  
      const user2 = await prisma.user.findUnique({
        where: { id: parseInt(id2) },
      });
  
      if (!user2) {
        return res.status(404).send("User2 does not exist");
      }
  
      const updatedFollowers = user2.followers.filter((item) => item !== id1.toString());
      await prisma.user.update({
        where: { id: parseInt(id2) },
        data: {
          followers: {
            set: updatedFollowers,
          },
        },
      });
  
      return res.status(200).send("Data updated");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal server error");
    }
  });
  
  /*==========================================================================GET=================================*/
  router.get('/', async(req,res)=>{
     const id = req.query.id 
     if(!id) return  res.status(404).send("Please send The id ")
       const data= await prisma.user.findUnique({
        where :{
          id: parseInt(id.toString())
        }
       })
       if(!data) return res.status(404).send("You valid User")
      const arr= data.following
       let newarr :string[]=[] ;
       for(let i=0 ;i<arr.length ;i++)
        {
            const curid= arr[i] ;
            const res1=   await prisma.user.findUnique({ 
              where :{
                id: parseInt(curid.toString())
              }
             })
             //console.log("Here is New Arr   ",res1)
             if(!res1) return res.status(404)
              const newdata= {username: res1.username  , userimage:res1.userimage, id:res1.id}
             newarr.push(JSON.stringify(newdata))
        }
        return res.status(200).send(newarr) 
        
  })
  export default router;
  