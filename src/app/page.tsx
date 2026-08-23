import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  switch (session.user.role) {
    case UserRole.SUPER_ADMIN:
      redirect("/admin");
    case UserRole.REGIONAL_MANAGER:
      redirect("/regional-manager");
    case UserRole.SALES_MANAGER:
      redirect("/sales-manager");
    case UserRole.ORDER_BOOKER:
      redirect("/booker");
    case UserRole.MEDICAL_REP:
      redirect("/med-rep");
    default:
      redirect("/login");
  }
}
