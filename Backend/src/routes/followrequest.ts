import express from "express";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();
const route = express.Router();

// Type for user request body
type UserRequest = {
  id: number;
  username: string;
  image: string;
  id1: string;
};

// Helper function to check if user data is complete
const isUserDataComplete = (user: UserRequest): boolean =>
  !!user.id && !!user.username  && !!user.id1;

// POST: Follow request
route.post("/", async (req, res) => {
  const user: UserRequest = {
    id: req.body.id,
    username: req.body.username,
    image: req.body.image,
    id1: req.body.id1,
  };
  if (!isUserDataComplete(user)) {
    return res.status(400).send("Please send complete data");
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(user.id1) },
      data: {
        request: {
          push: user.id.toString(),
        },
      },
    });

    const updatedUser2 = await prisma.user.update({
      where: { id: user.id },
      data: {
        requestrecieve: {
          push: user.id1,
        },
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// DELETE: Cancel follow request
route.delete("/", async (req, res) => {
  const user: UserRequest = {
    id: req.body.id,
    username: req.body.username,
    image: req.body.image,
    id1: req.body.id1,
  };

  if (!isUserDataComplete(user)) {
    return res.status(400).send("Please send complete data");
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(user.id1) },
    });

    if (!existingUser) {
      return res.status(404).send("User not found");
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(user.id1) },
      data: {
        request: {
          set: existingUser.request.filter((item) => item !== user.id.toString()),
        },
      },
    });

    const existingUser2 = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!existingUser2) {
      return res.status(404).send("User not found");
    }

    const updatedUser2 = await prisma.user.update({
      where: { id: user.id },
      data: {
        requestrecieve: {
          set: existingUser2.requestrecieve.filter((item) => item !== user.id1),
        },
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// GET: Retrieve follow requests
route.get("/", async (req, res) => {
  const id = req.query.id as string;
  if (!id) return res.status(400).send("Please send the ID");

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) return res.status(404).send("Invalid user");

    const requests = await Promise.all(
      user.requestrecieve.map(async (reqId) => {
        const requestedUser = await prisma.user.findUnique({
          where: { id: parseInt(reqId) },
        });
        if (!requestedUser) throw new Error("User not found");
        return JSON.stringify(requestedUser);
      })
    );

    return res.status(200).send(requests);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

export default route;
