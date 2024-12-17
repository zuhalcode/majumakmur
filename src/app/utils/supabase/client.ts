import { createBrowserClient } from "@supabase/ssr";
import { headers } from "next/headers";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { origin: "https://vcsh0szz-3000.asse.devtunnels.ms" },
      },
    }
  );
