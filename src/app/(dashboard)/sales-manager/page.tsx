import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

export default async function SalesManagerPage() {
  const pendingOrders = await prisma.order.findMany({
    where: { status: OrderStatus.SUBMITTED },
    include: {
      client: true,
      booker: { select: { name: true } },
      items: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Order Verification & Batch Allocation</h1>
        <p className="text-xs text-slate-400">Review, approve, and assign batches for distribution</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-4">Order #</th>
              <th>Pharmacy</th>
              <th>Booker</th>
              <th>Items</th>
              <th>Total (PKR)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {pendingOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-800/40">
                <td className="p-4 font-mono text-emerald-400">{order.orderNo}</td>
                <td>{order.client.pharmacyName}</td>
                <td>{order.booker.name}</td>
                <td>{order.items.length} Products</td>
                <td className="font-semibold">Rs. {Number(order.netAmount).toLocaleString()}</td>
                <td>
                  <form
                    action={`/api/orders/${order.id}/status`}
                    method="POST"
                    className="flex gap-2"
                  >
                    <button
                      type="submit"
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-semibold text-[11px]"
                    >
                      Approve & Dispatch
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {pendingOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  No orders currently pending approval.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
