import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase";

/**
 * Pathless layout route guarding everything under /_authenticated.
 *
 * The session lives in Supabase's browser storage, so this gate is client-side
 * only. RLS is the real boundary — these reads/writes only succeed with a
 * valid admin JWT. Before real stock/price data goes live, move the session to
 * a cookie so the server can evaluate it too.
 */
export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    // "loading" is undefined-safe: the layout renders children only once the
    // session is known, so the panel never flashes for signed-out visitors.
    if (session === "loading") return;
    if (!session) {
      void navigate({ to: "/admin/login", search: { expired: true } });
    }
  }, [session, navigate]);

  if (session === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="eyebrow" role="status">
          Checking your session…
        </p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <>
      <Outlet />
      {isSupabaseConfigured && (
        <div className="fixed bottom-5 right-5 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              void signOut().then(() => navigate({ to: "/admin/login" }));
            }}
          >
            Sign out
          </Button>
        </div>
      )}
    </>
  );
}
