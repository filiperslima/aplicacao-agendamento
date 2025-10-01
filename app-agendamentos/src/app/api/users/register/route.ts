import { supabase } from "@/lib/databases/supabase";
import { NextRequest, NextResponse } from "next/server";

interface LoginRegister {
  email: string;
  password: string;
  name: string;
}

export async function POST(req: NextRequest) {
  const { email, password, name }: LoginRegister = await req.json();
  if (!email || !password || !name) {
    return NextResponse.json({ status: 400, message: "Dados inválidos" });
  }

  try {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
        },
      },
    });
    if (data.user && data.user.identities && data.user.identities.length == 0) {
      return NextResponse.json({
        status: 400,
        message: "Usuário já existe",
      });
    }
    if (error) {
      return NextResponse.json({ status: 400, message: "Erro ao criar usuário" });
    }
    return NextResponse.json({ status: 200, message: "Usuário criado com sucesso", data: data.user });
  } catch (e) {
    return NextResponse.json({ status: 500, message: "Erro interno do servidor" });
  }
}
