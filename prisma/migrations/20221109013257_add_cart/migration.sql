/*
  Warnings:

  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "userId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CardItem" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "shopperId" TEXT NOT NULL,

    CONSTRAINT "CardItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardItem" ADD CONSTRAINT "CardItem_shopperId_fkey" FOREIGN KEY ("shopperId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;