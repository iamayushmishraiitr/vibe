import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
   const arr=  await prisma.user.findMany()
   if(!arr) res.status(404)
  
   res.status(200).send(arr)
}
)
export default router;
