import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const createdPost = await prisma.post.create({
    data: {
      title: "Prisma Post",
      body: "....",
      published: false,
    },
  });

  console.log(createdPost);
}

main().catch((err) => prisma.$disconnect());
