import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export default async function SuperAdminDashboard() {
  const [totalOrders, totalClients, activeProducts, pendingApprovals, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.clientProfile.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.order.count({ where: { status: OrderStatus.SUBMITTED } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          client: true,
          booker: { select: { name: true } },
        },
      }),
    ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">National Sales & Distribution Overview</h1>
        <p className="text-xs text-slate-400">Super Admin Central Control Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400">Total Orders</div>
          <div className="text-2xl font-bold text-white mt-1">{totalOrders}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400">Verified Pharmacies</div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{totalClients}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400">Active SKUs / Products</div>
          <div className="text-2xl font-bold text-blue-400 mt-1">{activeProducts}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400">Pending Approvals</div>
          <div className="text-2xl font-bold text-amber-400 mt-1">{pendingApprovals}</div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-sm font-bold text-white mb-4">Recent Nationwide Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-400 border-b border-slate-800 pb-2">
              <tr>
                <th className="py-2">Order #</th>
                <th>Pharmacy</th>
                <th>Booker</th>
                <th>Net Value (PKR)</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="py-2.5">
                  <td className="py-3 font-mono text-emerald-400">{ord.orderNo}</td>
                  <td>{ord.client.pharmacyName}</td>
                  <td>{ord.booker.name}</td>
                  <td className="font-semibold">Rs. {Number(ord.netAmount).toLocaleString()}</td>
                  <td>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      {ord.status}
                    </span>
                  </td>
                  <td className="text-slate-500">{new Date(ord.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
