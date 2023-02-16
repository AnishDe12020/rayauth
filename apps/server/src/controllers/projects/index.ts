import { Router } from "express";
import { prisma } from "../../lib/db";

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

  const project = await prisma.project.create({
    data: {
      name,
      slug,
      owner: {
        connect: {
          id: ownerId,
        },
      },
    },
  });

  return res.json({ project: project });
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

export default router;
