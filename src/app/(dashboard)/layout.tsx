import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar role={session.user.role} userName={session.user.name || session.user.email} />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
