import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();
router.post("/", async (req, res) => {
  const { userid, id }: { userid: string; id: number } = req.body;
  if (!userid || !id) return res.status(404).send("Please send Valid data");
  try {
    const postinfo = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
   // console.log(postinfo);
    if (!postinfo) return res.status(404);
    const newarr = [...postinfo.saved, userid];

    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        saved: {
          set: newarr,
        },
      },
    });

    
    const userinfo = await prisma.user.findUnique({
      where: {
        id: parseInt(userid),
      },
    });
    postinfo.saved= newarr
    if (!userinfo) return res.status(404);
    const newarr2 = [...userinfo.saved, JSON.stringify(id)];
    //console.log(newarr2 ,"here is newarr2 ")
  const x=  await prisma.user.update({
      where: {
        id: parseInt(userid),
      },
      data: {
        saved: 
        { set:newarr2
        }
      },
    });
 //   console.log("saved   " ,x )
    return res.status(200).send("saved ");
  } catch (error) {
    console.log(error);
  }
});

/*=====================================================================Delete Request ============================================*/
router.delete("/", async (req, res) => {
  const { userid, id }: { userid: string; id: number } = req.body;
  if (!userid || !id) res.status(404).send("Please send complete Credentials");
  try {
    const postinfo = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!postinfo) return res.status(404);
    const newar = postinfo.saved.filter((item) => item !== userid);
    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        saved: {
          set: newar,
        },
      },
    });
    const userinfo = await prisma.user.findUnique({
      where: {
        id: parseInt(userid),
      },
    });
    if (!userinfo) return res.status(404);
    const newar2 = userinfo.saved.filter((item) => item !== JSON.stringify(id));
    await prisma.user.update({
      where: {
        id: parseInt(userid),
      },
      data: {
        saved: {
          set: newar2,
        },
      },
    });
    return res.status(200).send("saved ");
  } catch (error) {
    console.log(error);
  }
});

/*============================================================================GET======================================*/
router.get('/',async(req,res)=>{
  const id= req.query.id
  if(!id) return res.status(404).send("Please send valid data")
    const user=  await prisma.user.findUnique({
       where:{id:parseInt(id.toString())} 
    })
    if(!user) return res.status(404).send("No user exists ")
   const arr= (user.saved) 
  let newarr=[]
  for(let i=0 ;i<arr.length ;i++)
    {
        const res= await prisma.post.findUnique({
            where :{id :  parseInt(arr[i]) }
        })
        newarr.push(res)
    }
  res.status(200).send(newarr)
})
export default router;