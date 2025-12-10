import { createClient } from "@/lib/databases/userSupabase";
import { NextRequest, NextResponse } from "next/server";

interface Schedule {
  start: Date;
  end: Date;
  event_id: string;
  email: string;
  name: string;
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const { start, end, event_id, email, name }: Schedule = body;

    if (!start || !end || !event_id || !email || !name) {
      return NextResponse.json({ error: "Dados incompletos", status: 400 }, { status: 400 });
    }

    const { data, error } = await supabase.from("tb_schedule").insert({
      start,
      end,
      event_id,
      email,
      name,
    });

    console.log(data, error);
    if (error) {
      return NextResponse.json({ error: error.message, status: 500 }, { status: 500 });
    }

    return NextResponse.json({ message: "Agendamento criado com sucesso", status: 200 }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno", status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("id");

  try {
    if (!userId) return NextResponse.json({ error: "Id não encontrado", status: 400 }, { status: 400 });

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("tb_schedule")
      .select(
        `*,
         tb_event!inner (user_id)
  `
      )
      .eq("tb_event.user_id", userId);
    console.log(data);
    return NextResponse.json({ schedules: data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erro interno", status: 500 }, { status: 500 });
  }
}
