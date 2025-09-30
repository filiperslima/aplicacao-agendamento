import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let { data, error } = await supabase.auth.signUp({
      email: "filipe@ateltelecom.com.br",
      password: "123456789",
    });
  } catch (e) {
    return new NextResponse();
  }
}
