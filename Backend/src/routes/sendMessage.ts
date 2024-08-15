import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { io, sub, userData, pub } from "../socket/socket";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const {
    rId,
    sId,
    content,
    type,
  }: { rId: string; sId: string; content: string; type: string } = req.body;
// njfnj
  try {
    const data: string | null = await userData.get("online");
    if (!data) return;
    const obj = JSON.parse(data);
    const socketId = obj[rId];

    if (socketId) {
      const obj = { content, type, createdAt: "asds", senderId: sId };
      pub.publish(`${socketId}`, JSON.stringify(obj));
    }

    // Ensure the listener is only added once
    
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
        messages: true,
        users: true,
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          users: {
            connect: [{ id: parseInt(rId) }, { id: parseInt(sId) }],
          },
        },
        include: {
          messages: true,
          users: true,
        },
      });
    }

    await prisma.message.create({
      data: {
        content: content,
        type: "text",
        read: false,
        conversation: {
          connect: { id: conversation.id },
        },
        receiver: {
          connect: { id: parseInt(rId) },
        },
        sender: {
          connect: { id: parseInt(sId) },
        },
      },
    });

    res.status(200).send("Message saved successfully");

  } catch (err) {
    console.error("Error", err);
    res.status(500).json({
      error: "An error occurred while fetching or creating the conversation",
    });
  }
});

export default router;
