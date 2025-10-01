import { supabase } from "@/lib/databases/supabase";
import { NextRequest, NextResponse } from "next/server";

interface ResetPassword {
  email: string;
}

interface NewPassword {
  newPassword: string;
  token: string;
  refreshToken: string;
}

export async function POST(req: NextRequest) {
  const { email }: ResetPassword = await req.json();

  if (!email) {
    return NextResponse.json({ status: 400, message: "Email inválido" });
  }
  try {
    let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset`,
    });
    console.log(data, error);
    if (error) {
      return NextResponse.json({ status: 400, message: "Erro ao enviar email" });
    }
    return NextResponse.json({ status: 200, message: "Email enviado com sucesso. Verifique sua caixa de entrada ou spam." });
  } catch (e) {
    return NextResponse.json({ status: 500, message: "Erro interno do servidor" });
  }
}

export async function PATCH(req: NextRequest) {
  const { newPassword, token, refreshToken }: NewPassword = await req.json();

  if (!token || !refreshToken) return NextResponse.json({ status: 400, message: "Token inválido" });

  if (!newPassword) {
    return NextResponse.json({ status: 400, message: "Nova senha inválida" });
  }
  try {
    let { error: sessionError } = await supabase.auth.setSession({
      access_token: token,
      refresh_token: refreshToken,
    });

    if (sessionError) {
      return NextResponse.json({ status: 401, message: "Token inválido ou expirado" });
    }

    let { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    console.log(data, error);

    if (error) {
      return NextResponse.json({ status: 400, message: "Erro ao atualizar senha" });
    }
    return NextResponse.json({ status: 200, message: "Senha atualizada com sucesso" });
  } catch (e) {
    return NextResponse.json({ status: 500, message: "Erro interno do servidor" });
  }
}
