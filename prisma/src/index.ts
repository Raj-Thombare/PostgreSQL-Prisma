import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateParams {
    firstName: string,
    lastName: string
}

async function getTodosAndUserDetails(userId: number) {
    const todos = await prisma.todo.findMany({
        where: {
            userId: userId,
        },
        select: {
            title: true,
            description: true,
            done: true,
            user: {
                select: {
                    email: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
    console.log(todos);
}

getTodosAndUserDetails(1);
getTodosAndUserDetails(2);

async function getTodos(userId: number) {
    const todos = await prisma.todo.findMany({
        where: {
            userId: userId,
        },
    });
    console.log(todos);
}

// getTodos(1);

async function createTodo(userId: number, title: string, description: string) {
    const todo = await prisma.todo.create({
        data: {
            title,
            description,
            userId
        },
    });
    console.log(todo);
}

// createTodo(1, "go to gym", "go to gym and do 10 pushups");
// createTodo(2, "learn prisma", "learn prisma with ts");

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
// getUser("admin2");


