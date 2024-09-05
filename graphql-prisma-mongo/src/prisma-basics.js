import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();

  const allPosts = await prisma.post.findMany();

  console.log(allPosts);

  //   const allPosts = await prisma.post.findMany({
  //     // orderBy: { title: "asc" },
  //     //   where: { published: true },
  //     take: 1,
  //     skip: 1,
  //   });

  //   console.log(allPosts);

  //   const createdPost = await prisma.post.create({
  //     data: {
  //       title: "GraphQL 101",
  //       body: "....",
  //       published: true,
  //     },
  //   });

  //   console.log(createdPost);
}

main().catch((err) => {
  console.log(err);
  prisma.$disconnect();
});
