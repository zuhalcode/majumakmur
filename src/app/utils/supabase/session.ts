import { createClient } from "./client";

export const getAccessToken = async (): Promise<string | null> => {
  const supabase = createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) return null;

  return session.access_token ?? null;
};
