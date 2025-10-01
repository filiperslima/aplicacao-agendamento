import { supabase } from "@/lib/databases/supabase";
import { NextRequest, NextResponse } from "next/server";

interface UserLogin {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const { email, password }: UserLogin = await req.json();
  if (!email || !password) {
    return NextResponse.json({ status: 400, message: "Usuário ou senha inválidos" });
  }
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data, error);
    if (error) {
      return NextResponse.json({ status: 400, message: "Usuário ou senha inválidos" });
    }
    return NextResponse.json({
      role: data.session?.user.role,
      email: data.session?.user.email,
      id: data.session?.user.id,
      status: 200,
      message: "Usuário logado com sucesso",
      token: data.session?.access_token,
    });
  } catch (e) {
    return NextResponse.json({ status: 500, message: "Erro interno do servidor" });
  }
}
