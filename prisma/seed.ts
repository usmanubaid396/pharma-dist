import { PrismaClient, UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("Admin@12345", 12);

  // 1. Create Region & Territory
  const punjab = await prisma.region.upsert({
    where: { name: "Punjab" },
    update: {},
    create: { name: "Punjab" },
  });

  await prisma.territory.upsert({
    where: { id: "terr-vehari" },
    update: {},
    create: {
      id: "terr-vehari",
      name: "Vehari City",
      regionId: punjab.id,
    },
  });

  // 2. Create Super Admin Account
  await prisma.user.upsert({
    where: { email: "admin@healthcarepk.online" },
    update: {},
    create: {
      email: "admin@healthcarepk.online",
      name: "National Sales Admin",
      phone: "+923001234567",
      passwordHash: adminPassword,
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  // 3. Create Sample Products
  await prisma.product.upsert({
    where: { itemCode: "SOL-600" },
    update: {},
    create: {
      itemCode: "SOL-600",
      brandName: "SOLOLID",
      genericName: "Linezolid",
      dosageForm: "Tablet",
      strength: "600mg",
      packSize: "10's",
      tradePrice: 1250.0,
      mrp: 1470.0,
      batches: {
        create: [
          {
            batchNo: "SOL2401",
            expiryDate: new Date("2026-12-31"),
            quantityInStock: 500,
          },
        ],
      },
    },
  });

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
