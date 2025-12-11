import { createClient } from "@/lib/databases/userSupabase";
import { NextRequest, NextResponse } from "next/server";

interface Availability {
  [daty: string]: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
}

interface Body {
  name: string;
  duration: string;
  unit: string;
  avaliability: Availability;
  userId: string;
}

export async function POST(req: NextRequest) {
  const body: Body = await req.json();
  try {
    const supabase = await createClient();

    const { data, error: dbError } = await supabase.from("tb_event").insert({
      name: body.name,
      duration: body.duration,
      unit: body.unit,
      availability: body.avaliability,
      user_id: body.userId,
    });
    console.log(data, dbError);

    return NextResponse.json({ message: "Evento criado com sucesso", status: 300 });
  } catch (error) {
    console.log(error);
  }
}
