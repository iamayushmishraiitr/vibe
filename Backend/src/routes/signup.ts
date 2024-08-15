import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const router = express.Router();

type UserCreateInput = {
  username: string;
  email: string;
  password: string;
};

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new object with the expected properties
    const userData: UserCreateInput = {
      username,
      email,
      password: hashedPassword,
    };

    const response = await prisma.user.create({
      data: userData,
    });

    console.log(req.body);
    return res.status(200).json({ message: "Received Data successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).send({ message: "Error Occurred" });
  }
});

export default router;
