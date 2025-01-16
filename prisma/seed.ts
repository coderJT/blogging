import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    // Delete existing records
    await prisma.blogPost.deleteMany({});

    // Create 10 fake blog posts
    const posts = Array.from({ length: 10 }).map(() => ({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
        published: faker.datatype.boolean(),
        authorId: faker.string.uuid(), // assuming you have user authentication
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
    }));

    for (const post of posts) {
        await prisma.blogPost.create({
            data: post,
        });
    }

    console.log('Seeded database with 10 blog posts');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 