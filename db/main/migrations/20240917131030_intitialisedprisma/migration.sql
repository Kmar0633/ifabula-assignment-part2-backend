-- CreateTable
CREATE TABLE "MasterUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "role" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "bookBorrowedId" INTEGER,

    CONSTRAINT "MasterUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterBook" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "author" TEXT,
    "description" TEXT,
    "borrowedDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "isActive" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "MasterBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MasterUser_email_key" ON "MasterUser"("email");

-- AddForeignKey
ALTER TABLE "MasterUser" ADD CONSTRAINT "MasterUser_bookBorrowedId_fkey" FOREIGN KEY ("bookBorrowedId") REFERENCES "MasterBook"("id") ON DELETE SET NULL ON UPDATE CASCADE;
