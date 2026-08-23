"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  ShieldCheck,
  MapPin,
  ClipboardList,
  Stethoscope,
  LogOut,
  Building2,
} from "lucide-react";

interface SidebarProps {
  role: string;
  userName: string;
}

export function Sidebar({ role, userName }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { name: "Super Admin", href: "/admin", roles: ["SUPER_ADMIN"], icon: LayoutDashboard },
    { name: "Live Audit Log", href: "/admin/audit", roles: ["SUPER_ADMIN"], icon: ShieldCheck },
    { name: "Regional Hub", href: "/regional-manager", roles: ["SUPER_ADMIN", "REGIONAL_MANAGER"], icon: MapPin },
    { name: "Sales Approvals", href: "/sales-manager", roles: ["SUPER_ADMIN", "SALES_MANAGER"], icon: ClipboardList },
    { name: "Order Booker", href: "/booker", roles: ["SUPER_ADMIN", "ORDER_BOOKER"], icon: Building2 },
    { name: "Med Rep / DCR", href: "/med-rep", roles: ["SUPER_ADMIN", "MEDICAL_REP"], icon: Stethoscope },
  ];

  const visibleLinks = links.filter((l) => l.roles.includes(role));

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 h-screen sticky top-0">
      <div>
        <div className="flex items-center gap-2 px-3 py-4 border-b border-slate-800 mb-6">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white">
            P
          </div>
          <div>
            <div className="font-bold text-sm text-white">PHARMA-DIST</div>
            <div className="text-[10px] text-slate-400">National Distribution</div>
          </div>
        </div>

        <nav className="space-y-1">
          {visibleLinks.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                  active
                    ? "bg-emerald-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800">
        <div className="px-3 py-2 mb-2">
          <div className="text-xs font-semibold text-slate-200 truncate">{userName}</div>
          <div className="text-[10px] text-emerald-400 font-mono">{role}</div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
