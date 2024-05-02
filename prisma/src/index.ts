import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateParams {
    firstName: string,
    lastName: string
}

async function getUser(username: string) {
    const res = await prisma.user.findFirst({
        where: { email: username }
    })
    console.log(res)
}

async function updateUser(username: string, { firstName, lastName }: UpdateParams) {
    const user = await prisma.user.update({
        where: { email: username },
        data: {
            firstName,
            lastName
        }
    })
    console.log(user)
}

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
    const res = await prisma.user.create({
        data: {
            email: username,
            password,
            firstName,
            lastName
        }
    })
    console.log(res)
}

// insertUser("admin2", "454545", "Rohit", "Sharma")
// updateUser("admin1", {
//     firstName: "Raj",
//     lastName: "Thombare"
// })
getUser("admin2");


