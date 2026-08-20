import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const isAccessingAdmin = request.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = request.nextUrl.pathname.startsWith("/admin-login");

  // Skip auth check for public storefront routes (/, /shop, /products, /collections, etc.)
  if (!isAccessingAdmin && !isLoginRoute) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Check fallback admin session cookie
  const hasAdminCookie = request.cookies.get("admin_session")?.value === "authenticated";

  // If Supabase credentials are not configured yet, check cookie or allow in dev
  if (!supabaseUrl || !supabaseAnonKey) {
    if (isAccessingAdmin && !isLoginRoute && !hasAdminCookie) {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
    if (isLoginRoute && hasAdminCookie) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isAuthenticated = !!user || hasAdminCookie;

    // 1. If accessing admin and not logged in -> redirect to login
    if (isAccessingAdmin && !isLoginRoute && !isAuthenticated) {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }

    // 2. If logged in and accessing login page -> redirect to dashboard
    if (isLoginRoute && isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  } catch (error) {
    console.error("Middleware Auth check error:", error);
    if (isAccessingAdmin && !isLoginRoute && !hasAdminCookie) {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"],
};
