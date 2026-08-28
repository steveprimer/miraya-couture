"use server";

import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
  const email = (formData.get("email") as string)?.trim() || "";
  const password = (formData.get("password") as string)?.trim() || "";

  if (!email || !password) {
    return { success: false, error: "Please provide both email and password." };
  }

  // 1. Check default credentials or universal admin access
  const isDefaultAdmin =
    (email.toLowerCase() === "admin@miraya.com" && (password === "miraya2026" || password === "miraya" || password === "admin")) ||
    (email.toLowerCase() === "admin@mishru.com" && (password === "mishru2026" || password === "mishru" || password === "admin")) ||
    password === "miraya2026" ||
    password === "miraya" ||
    password === "admin" ||
    password === "mishru2026" ||
    password === "mishru";

  if (isDefaultAdmin) {
    try {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    } catch (cookieErr) {
      console.error("Cookie set error:", cookieErr);
    }
    return { success: true, redirectUrl: "/admin" };
  }

  // 2. Try signing in with Supabase Auth if credentials differ
  try {
    const supabase = await createClient();
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Auto-provision if user doesn't exist
    if (error) {
      try {
        const adminSupabase = createAdminClient();
        await adminSupabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });

        const retry = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        error = retry.error;
      } catch (e) {
        console.error("Auto-provision error:", e);
      }
    }

    if (!error) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      });
      return { success: true, redirectUrl: "/admin" };
    }

    return { success: false, error: error?.message || "Invalid credentials. Please use admin@miraya.com / miraya2026." };
  } catch (err: any) {
    console.error("Supabase signin error:", err);
    return { success: false, error: "Authentication failed. Please check credentials." };
  }
}

export async function logoutAdmin() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (e) {
    console.error("Logout error:", e);
  }

  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin-login");
}
