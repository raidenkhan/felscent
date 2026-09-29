import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

/** Current session, or null when signed out / Supabase not configured. */
export async function getSession(): Promise<Session | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/** Subscribes to sign-in/out so the admin gate reacts without a reload. */
export function useSession(): Session | null | "loading" {
  const [session, setSession] = useState<Session | null | "loading">("loading");

  useEffect(() => {
    if (!supabase) {
      setSession(null);
      return;
    }

    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (active) setSession(data.session);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return session;
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}
