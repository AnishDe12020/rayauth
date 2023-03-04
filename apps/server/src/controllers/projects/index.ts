import { Keypair } from "@solana/web3.js";
import base58 from "bs58";
import { randomUUID } from "crypto";
import { Router } from "express";
import { prisma, Project } from "../../../lib/db";

const router = Router();

router.get("/", async (_req, res) => {
  const projects = await prisma.project.findMany();

  return res.json({ projects: projects });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Invalid id" });

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  return res.json({ project: project });
});

router.post("/", async (req, res) => {
  const { name, slug, ownerId } = req.body;

  if (!name || !slug || !ownerId) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const project = (await prisma.project.create({
      data: {
        name,
        slug,
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    })) as Project;

    await prisma.clientSecret.create({
      data: {
        key: randomUUID(),
        project: {
          connect: {
            id: project.id,
          },
        },
        CreatedBy: {
          connect: {
            id: ownerId,
          },
        },
      },
    });

    return res.json({ project: project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Invalid id" });

  const { name, slug } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const project = await prisma.project.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
    },
  });

  return res.json({ project: project });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Invalid id" });

  const project = await prisma.project.delete({
    where: {
      id,
    },
  });

  return res.json({ project: project });
});

router.get("/:id/client-secret", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Invalid id" });

  const clientSecret = await prisma.clientSecret.findUnique({
    where: {
      projectId: id,
    },
  });

  return res.json({ clientSecret: clientSecret });
});

router.post("/:id/rotate-client-secret", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Invalid id" });

  await prisma.clientSecret.update({
    where: {
      projectId: id,
    },
    data: {
      key: randomUUID(),
    },
  });

  return res.json({ success: true });
});

router.post("/:id/create-gas-tank", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Invalid id" });

  const tankKeypair = Keypair.generate();

  const gasTank = await prisma.gasTank.create({
    data: {
      project: {
        connect: {
          id,
        },
      },
      address: tankKeypair.publicKey.toBase58(),
      privateKey: base58.encode(tankKeypair.secretKey),
    },
  });

  return res.json({ gasTank: gasTank });
});


router.post("/delegate", async (req, res) => {
  const { address, projectId, userId, projectAddress } = req.body;
  if (!address || !projectId || !userId) {
    return res.status(400).json({ message: "Invalid data" });
  }
  try {
   const delegate = prisma.delegate.create({
    data: {
       address: address,
       userId: userId,
       user :{
        connect: {
          id: userId
        }
       },
       projectId: projectId,
       project: {
        connect: {
          id: projectId
        }
       },
       projectAddress: projectAddress
    }
   })
  return res.json({ delegate: delegate });
} catch (error) {
  console.log(error);
  return res.status(500).json({ message: "Internal server error" });
}
})

router.get("/delegate/:userid", async (req, res) => { 
  if(!req.params.userid) {
     res.status(400).json({message: "Bad request"})
     return;
  }
  const user = prisma.user.findUnique({
    where: {
      id: req.params.userid
    }
  })

  if(!user){  res.status(400).json({messafe: "User not found"}); return}
  res.status(200).json({delegates: user.DelegatedAccount})
})

export default router;
