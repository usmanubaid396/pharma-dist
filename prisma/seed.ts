import { PrismaClient, UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("Admin@12345", 12);
  const repPassword = await bcrypt.hash("Rep@12345", 12);

  // 1. Create Punjab Region & Vehari / Lahore Territories
  const punjab = await prisma.region.upsert({
    where: { name: "Punjab" },
    update: {},
    create: { name: "Punjab" },
  });

  const vehari = await prisma.territory.upsert({
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

  // 3. Create Sample Products & Batches
  const p1 = await prisma.product.upsert({
    where: { itemCode: "SOL-600" },
    update: {},
    create: {
      itemCode: "SOL-600",
      brandName: "SOLOLID",
      genericName: "Linezolid",
      dosageForm: "Tablet",
      strength: "600mg",
      packSize: "10's",
      tradePrice: 1250.00,
      mrp: 1470.00,
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

  const p2 = await prisma.product.upsert({
    where: { itemCode: "AYA-500" },
    update: {},
    create: {
      itemCode: "AYA-500",
      brandName: "AYACIN",
      genericName: "Ciprofloxacin",
      dosageForm: "Tablet",
      strength: "500mg",
      packSize: "10's",
      tradePrice: 380.00,
      mrp: 450.00,
      batches: {
        create: [
          {
            batchNo: "AYA2409",
            expiryDate: new Date("2026-06-30"),
            quantityInStock: 1200,
          },
        ],
      },
    },
  });

  console.log("Database seeded successfully with initial products, admin, and regions.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
