import prisma from "database";

export async function createUser(email: string, password: string) {
  return await prisma.user.create({
    data: {
      email,
      password,
    },
  });
}
