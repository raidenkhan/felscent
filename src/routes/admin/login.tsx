import { useEffect, useState, type FormEvent } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type LoginSearch = { expired?: boolean };

export const Route = createFileRoute("/admin/login")({
  // Only present in the URL when actually expired — otherwise TanStack Router
  // would 307 every /admin/login visit to /admin/login?expired=false.
  validateSearch: (search: Record<string, unknown>): LoginSearch =>
    search.expired === "1" || search.expired === "true" ? { expired: true } : {},
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const { expired } = Route.useSearch();
  const session = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Already signed in? Go straight to the panel.
  useEffect(() => {
    if (session && session !== "loading") {
      void navigate({ to: "/admin/products", replace: true });
    }
  }, [session, navigate]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;

    setBusy(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setBusy(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    await navigate({ to: "/admin/products" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <Link to="/" className="font-serif text-2xl tracking-[0.32em]">
          FELSCENT
        </Link>
        <p className="eyebrow mt-10">Studio access</p>
        <h1 className="text-title mt-4">Sign in to manage the collection.</h1>

        {expired && (
          <p role="status" className="mt-8 border border-border p-4 text-sm text-muted-foreground">
            Your session ended. Please sign in again.
          </p>
        )}

        {!isSupabaseConfigured ? (
          <div className="mt-10 border border-border p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Supabase is not connected yet. Add{" "}
              <code className="text-foreground">VITE_SUPABASE_URL</code> and{" "}
              <code className="text-foreground">VITE_SUPABASE_ANON_KEY</code> to <code>.env</code>,
              restart the dev server, then create your admin user in the Supabase dashboard under
              Authentication → Users.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 space-y-6">
            <div>
              <label htmlFor="email" className="eyebrow">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-3 w-full border-b border-input bg-transparent py-2 text-sm focus:border-foreground focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="eyebrow">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-3 w-full border-b border-input bg-transparent py-2 text-sm focus:border-foreground focus:outline-none"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        )}

        <Link to="/" className="link-hairline mt-10 inline-block">
          Back to the store
        </Link>
      </div>
    </div>
  );
}
