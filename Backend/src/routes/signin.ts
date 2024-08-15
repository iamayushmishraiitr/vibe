import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import generateToken from "../JWT/generateToken";

const prisma = new PrismaClient();
const route = express.Router();

route.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send("Send Full credentials");

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).send("Invalid Password");
    }

    const token = generateToken(username, password);
    res.status(200).json({ message: user.id, token: token });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

export default route;
