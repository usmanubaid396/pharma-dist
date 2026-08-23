import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const role = token?.role;

    if (path.startsWith("/admin") && role !== UserRole.SUPER_ADMIN) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (
      path.startsWith("/regional-manager") &&
      !([UserRole.SUPER_ADMIN, UserRole.REGIONAL_MANAGER] as string[]).includes(role as string)
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (
      path.startsWith("/sales-manager") &&
      !([UserRole.SUPER_ADMIN, UserRole.SALES_MANAGER, UserRole.REGIONAL_MANAGER] as string[]).includes(role as string)
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (
      path.startsWith("/booker") &&
      !([UserRole.SUPER_ADMIN, UserRole.ORDER_BOOKER] as string[]).includes(role as string)
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (
      path.startsWith("/med-rep") &&
      !([UserRole.SUPER_ADMIN, UserRole.MEDICAL_REP] as string[]).includes(role as string)
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/regional-manager/:path*",
    "/sales-manager/:path*",
    "/booker/:path*",
    "/med-rep/:path*",
  ],
};
