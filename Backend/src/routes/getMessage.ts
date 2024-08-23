import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
  try{
  const { rId, sId } = req.query as { rId: string; sId: string };
  let conversation = await prisma.conversation.findFirst({
    where: {
      users: {
        some: {
          id: parseInt(rId),
        },
      },
      AND: {
        users: {
          some: {
            id: parseInt(sId),
          },
        },
      },
    },
    include: {
      messages: {
        select: {
          senderId:true ,
          content: true,
          type: true,
          createdAt: true,
          receiverId:true
        },
      },
    },
  });

 const arr= conversation?.messages
 const arr2= arr?.map((it:any)=> JSON.stringify(it)) ;

  if (!conversation) return res.status(200).send([]);
  return res.status(200).send(arr2) ;
}
catch(err)
{
  res.status(500).send("Error occured while geting message")
  console.log(err)
}
});
export default router;
