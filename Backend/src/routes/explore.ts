import express from "express";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
const route = express.Router();

route.post("/", async (req, res) => {
  const id1 = req.body.id1,
    id2 = req.body.id2,
    data = req.body.data;
  if (!id1 || !id2 || !data) res.status(404).send("please Send complete data");
  const user1 = await prisma.user.findUnique({
    where: { id: parseInt(id1) },
  });
  if (!user1) return res.status(404).send("The User1 Does not exist");
  const arr = user1.requestrecieve.filter((item) => item !== id2.toString());
  const res1 = await prisma.user.update({
    where: { id: parseInt(id1) },
    data: {
      requestrecieve: {
        set: arr,
      },
      followers: {
        push: id2.toString(),
      },
    },
  });
  if (!res1) return res.status(404);
  const user2 = await prisma.user.findUnique({
    where: { id: id2 },
  });
  if (!user2) return res.status(404).send("The User2 Does not exist");
  const arr2 = user2.request.filter((item) => item !== id1.toString());
  const res2 = await prisma.user.update({
    where: { id: id2 },
    data: {
      request: {
        set: arr2,
      },
      following: {
        push: id1.toString(),
      },
    },
  });
  if (!res2) return res.status(404);
  return res.status(200).send("Data Updated");
});

/*=========================================================DELETE==================================================================*/
route.delete("/", async (req, res) => {
  const id1 = req.body.id1,
    id2 = req.body.id2;
  if (!id1 || !id2) return res.status(404).send("Send Complete data");
  const user1 = await prisma.user.findUnique({
    where: { id: parseInt(id1) },
  });
  if (!user1) return res.status(404).send("The User1 Does not exist");
  const arr = user1.requestrecieve.filter((item) => item != id2.toString());
  const res1 = await prisma.user.update({
    where: { id: parseInt(id1) },
    data: {
      requestrecieve: {
        set: arr,
      },
    },
  });
  if (!res1) return res.status(404);
  const user2 = await prisma.user.findUnique({
    where: { id: id2 },
  });
  if (!user2) return res.status(404).send("The User2 Does not exist");
  const arr2 = user2.request.filter((item) => item != id1.toString());
  const res2 = await prisma.user.update({
    where: { id: id2 },
    data: {
      request: {
        set: arr2,
      },
    },
  });
  if (!res2) return res.status(404);
  return res.status(200).send("Data Updated");
});
export default route;
