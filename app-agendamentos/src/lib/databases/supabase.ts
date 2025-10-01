import { createClient, SupabaseClient } from "@supabase/supabase-js";

class SupabaseClientSingleton {
  private static instance: SupabaseClient;

  constructor() {}

  static getInstance(): SupabaseClient {
    if (!SupabaseClientSingleton.instance) {
      SupabaseClientSingleton.instance = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!
      );
    }
    return SupabaseClientSingleton.instance;
  }
}

export const supabase = SupabaseClientSingleton.getInstance();
