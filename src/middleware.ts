import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const isOwlPage = req.nextUrl.pathname.startsWith("/owl") && !req.nextUrl.pathname.startsWith("/owl/login");
    const isOwlApi = req.nextUrl.pathname.startsWith("/api/owl");

    if ((isOwlPage || isOwlApi) && !req.nextauth.token) {
      if (isOwlApi) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      return NextResponse.redirect(new URL("/owl/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: () => true, // Let the middleware function handle the logic
    },
  }
);

export const config = {
  matcher: ["/owl/:path*", "/api/owl/:path*"],
};
