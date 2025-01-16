/*
  Warnings:

  - The primary key for the `BlogPost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_userId_fkey";

-- AlterTable
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_pkey",
DROP COLUMN "description",
DROP COLUMN "userId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BlogPost_id_seq";

-- DropTable
DROP TABLE "User";
