-- CreateTable
CREATE TABLE "MasterApiView" (
    "id" SERIAL NOT NULL,
    "viewName" TEXT,
    "fieldNamesSelected" TEXT[],

    CONSTRAINT "MasterApiView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterApiTable" (
    "id" SERIAL NOT NULL,
    "tableName" TEXT,
    "fieldNamesSelected" TEXT[],

    CONSTRAINT "MasterApiTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MasterApiView_viewName_key" ON "MasterApiView"("viewName");

-- CreateIndex
CREATE UNIQUE INDEX "MasterApiTable_tableName_key" ON "MasterApiTable"("tableName");
