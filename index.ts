import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    // await prisma.user.create({
    //     data: {
    //         name: 'Raj',
    //         email: 'raj@prisma.io',
    //         posts: {
    //             create: { title: 'Nyc Ones!' },
    //         },
    //         profile: {
    //             create: { bio: 'I like chokers' },
    //         },
    //     },
    // })

    // const post = await prisma.user.update({
    //     where: { id: 2 },
    //     data: {
    //         posts: {
    //             deleteMany: [{ id: 2 }]
    //         }
    //     },
    //     include: {
    //         posts: true
    //     }
    // })

    // console.log(post)

    // const result = await prisma.post.update({
    //     where: {
    //         id: 1,
    //     },
    //     data: {
    //         author: {
    //             upsert: {
    //                 create: {
    //                     email: 'bob@prisma.io',
    //                     name: 'Bob the New User',
    //                 },
    //                 update: {
    //                     email: 'bob@prisma.io',
    //                     name: 'Bob the existing user',
    //                 },
    //             },
    //         },
    //     },
    //     include: {
    //         author: true,
    //     },
    // })

    const result = await prisma.user.update({
        where: {
            id: 2,
        },
        data: {
            profile: {
                update: {
                    bio: "Ind vs Aus, BGT 2024"
                }
            }
        },
        include: {
            profile: true,
        }
    })

    console.log(result)

    // const allUsers = await prisma.user.findMany({
    //     include: {
    //         posts: true,
    //         profile: true
    //     }
    // })
    // console.log(allUsers)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })