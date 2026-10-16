-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" SERIAL NOT NULL,
    "license_plate" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,
    "gkm" INTEGER NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "Care" (
    "id" SERIAL NOT NULL,
    "header" TEXT NOT NULL,
    "hkm" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "carID" INTEGER NOT NULL,

    CONSTRAINT "Care_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cars_license_plate_key" ON "Cars"("license_plate");

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Care" ADD CONSTRAINT "Care_carID_fkey" FOREIGN KEY ("carID") REFERENCES "Cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
