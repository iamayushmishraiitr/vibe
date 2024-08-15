import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
  try {
    const val = req.query.id;
  if(!val)  return res.status(404)
   const val2= parseInt(val.toString())
   const arr=  await prisma.user.findUnique({
    where:{
      id:val2
    },
   }
  )
if(!arr) return res.status(404)
     let arr2= arr?.post 
   if(!arr2) return res.status(404)
    let arr3= [] ;
    for(let i=0 ;i<arr2.length;i++)
      {
           const resp= await prisma.post.findUnique({
            where:{id: parseInt(arr2[i])}
           })
           arr3.push(resp)
      }
    
   res.status(200).send({arr3 : arr3 , val:arr})
  } catch (error) {
    res.status(404).send("error occured")
  }
  
}
)
export default router;
