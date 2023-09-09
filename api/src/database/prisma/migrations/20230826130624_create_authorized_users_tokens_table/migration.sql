-- CreateTable
CREATE TABLE "authorized_users_tokens" (
    "id" TEXT NOT NULL,
    "authorized_user_id" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "refresh" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authorized_users_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authorized_users_tokens_access_key" ON "authorized_users_tokens"("access");

-- CreateIndex
CREATE UNIQUE INDEX "authorized_users_tokens_refresh_key" ON "authorized_users_tokens"("refresh");

-- AddForeignKey
ALTER TABLE "authorized_users_tokens" ADD CONSTRAINT "authorized_users_tokens_authorized_user_id_fkey" FOREIGN KEY ("authorized_user_id") REFERENCES "authorized_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
