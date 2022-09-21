/*
  Warnings:

  - You are about to drop the `Deliveries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Deliveries" DROP CONSTRAINT "Deliveries_id_client_fkey";

-- DropForeignKey
ALTER TABLE "Deliveries" DROP CONSTRAINT "Deliveries_id_deliveryman_fkey";

-- DropTable
DROP TABLE "Deliveries";

-- CreateTable
CREATE TABLE "deliveries" (
    "id" SERIAL NOT NULL,
    "id_client" INTEGER NOT NULL,
    "id_deliveryman" INTEGER NOT NULL,
    "item_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_id_deliveryman_fkey" FOREIGN KEY ("id_deliveryman") REFERENCES "deliveryman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;