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
    const newarr = [...postinfo.liked, userid];

    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        liked: {
          set: newarr,
        },
      },
    });

    
    const userinfo = await prisma.user.findUnique({
      where: {
        id: parseInt(userid),
      },
    });
    postinfo.liked= newarr
    if (!userinfo) return res.status(404);
    const newarr2 = [...userinfo.liked, JSON.stringify(id)];
    //console.log(newarr2 ,"here is newarr2 ")
  const x=  await prisma.user.update({
      where: {
        id: parseInt(userid),
      },
      data: {
        liked: 
        { set:newarr2
        }
      },
    });
 //   console.log("liked   " ,x )
    return res.status(200).send("liked ");
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
    const newar = postinfo.liked.filter((item) => item !== userid);
    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        liked: {
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
    const newar2 = userinfo.liked.filter((item) => item !== JSON.stringify(id));
    await prisma.user.update({
      where: {
        id: parseInt(userid),
      },
      data: {
        liked: {
          set: newar2,
        },
      },
    });
    return res.status(200).send("liked ");
  } catch (error) {
    console.log(error);
  }
});
export default router;




// import express from "express";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// const router = express.Router();
// router.post("/", async (req, res) => {
//   const { userid, id }: { userid: string; id: number } = req.body;
//   if (!userid || !id) return res.status(404).send("Please send Valid data");
//   try {
//     const postinfo = await prisma.post.findUnique({
//       where: {
//         id: id,
//       },
//     });
//     console.log(postinfo);
//     if (!postinfo) return res.status(404);
//     const newarr = [...postinfo.liked, userid];

//     await prisma.post.update({
//       where: {
//         id: id,
//       },
//       data: {
//         liked: {
//           set: newarr,
//         },
//       },
//     });

    
//     const userinfo = await prisma.user.findUnique({
//       where: {
//         id: parseInt(userid),
//       },
//     });
//     postinfo.liked= newarr
//     if (!userinfo) return res.status(404);
//     const newarr2 = [...userinfo.liked, JSON.stringify(postinfo)];
//     //console.log(newarr2 ,"here is newarr2 ")
//   const x=  await prisma.user.update({
//       where: {
//         id: parseInt(userid),
//       },
//       data: {
//         liked: 
//         { set:newarr2
//         }
//       },
//     });
//  //   console.log("liked   " ,x )
//     return res.status(200).send("liked ");
//   } catch (error) {
//     console.log(error);
//   }
// });

// /*=====================================================================Delete Request ============================================*/
// router.delete("/", async (req, res) => {
//   const { userid, id }: { userid: string; id: number } = req.body;
//   if (!userid || !id) res.status(404).send("Please send complete Credentials");
//   try {
//     const postinfo = await prisma.post.findUnique({
//       where: {
//         id: id,
//       },
//     });
//     if (!postinfo) return res.status(404);
//     const newar = postinfo.liked.filter((item) => item != userid);
//     await prisma.post.update({
//       where: {
//         id: id,
//       },
//       data: {
//         liked: {
//           set: newar,
//         },
//       },
//     });
//     const userinfo = await prisma.user.findUnique({
//       where: {
//         id: parseInt(userid),
//       },
//     });
//     if (!userinfo) return res.status(404);
//     const newar2 = userinfo.liked
//       .map((item) => JSON.parse(item))
//       .filter((item) => item.id != id.toString())
//       .map((item) => JSON.stringify(item));
//     await prisma.user.update({
//       where: {
//         id: parseInt(userid),
//       },
//       data: {
//         liked: {
//           set: newar2,
//         },
//       },
//     });
//     return res.status(200).send("liked ");
//   } catch (error) {
//     console.log(error);
//   }
// });
// export default router;
