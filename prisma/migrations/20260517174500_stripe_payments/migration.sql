-- AlterTable
ALTER TABLE "users" ADD COLUMN "stripeCustomerId" TEXT;

-- AlterTable
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_modelId_fkey";
ALTER TABLE "transactions" ALTER COLUMN "modelId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_modelId_fkey";
ALTER TABLE "subscriptions" ADD COLUMN "currentPeriodEnd" TIMESTAMP(3);
ALTER TABLE "subscriptions" ADD COLUMN "stripeCustomerId" TEXT;
ALTER TABLE "subscriptions" ADD COLUMN "stripePriceId" TEXT;
ALTER TABLE "subscriptions" ADD COLUMN "stripeSubscriptionId" TEXT;
ALTER TABLE "subscriptions" ALTER COLUMN "modelId" DROP NOT NULL;
ALTER TABLE "subscriptions" ALTER COLUMN "monthlyPrice" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "users_stripeCustomerId_key" ON "users"("stripeCustomerId");
CREATE UNIQUE INDEX "transactions_stripePaymentId_key" ON "transactions"("stripePaymentId");
CREATE UNIQUE INDEX "subscriptions_stripeSubscriptionId_key" ON "subscriptions"("stripeSubscriptionId");
CREATE INDEX "subscriptions_stripeCustomerId_idx" ON "subscriptions"("stripeCustomerId");
CREATE INDEX "subscriptions_stripePriceId_idx" ON "subscriptions"("stripePriceId");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "models"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "models"("id") ON DELETE SET NULL ON UPDATE CASCADE;
