-- CreateTable
CREATE TABLE "Astrologer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Astrologer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flow" (
    "id" SERIAL NOT NULL,
    "astrologerId" INTEGER NOT NULL,

    CONSTRAINT "Flow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flow" ADD CONSTRAINT "Flow_astrologerId_fkey" FOREIGN KEY ("astrologerId") REFERENCES "Astrologer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
