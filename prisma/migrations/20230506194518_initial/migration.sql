-- CreateTable
CREATE TABLE "GuildMember" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" TEXT,
    "username" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GuildMember_id_key" ON "GuildMember"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GuildMember_discordId_key" ON "GuildMember"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "GuildMember_username_key" ON "GuildMember"("username");
