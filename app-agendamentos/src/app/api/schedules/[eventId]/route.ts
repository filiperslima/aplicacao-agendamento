import { createClient } from "@/lib/databases/userSupabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { eventId: string } }) {
  try {
    const supabase = await createClient();
    const eventId = (await Promise.resolve(params)).eventId;
    const { data, error } = await supabase
      .from("tb_schedule")
      .select("start, end, availability:event_id(availability),duration:event_id(duration)")
      .eq("event_id", eventId);
      console.log(data)
    if (error) {
      console.log(error);
    }
    return NextResponse.json({
      schedules: data?.map((item) => ({ start: item.start, end: item.end, availability: item.availability.availability, duration: item.duration.duration})) || [],
    });
  } catch (e) {
    console.log(e);
  }
}
