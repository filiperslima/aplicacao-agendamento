"use server";

interface ScheduleResult {
  start: string;
  end: string;
  availability: Record<string, { active: boolean; startTime: string; endTime: string }>;
}
export async function getScheduleByEvent(event: string) {
  if (!event) return { error: "Evento não encontrado" };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedules/${event}`);
    const data = await response.json();
    return {
      schedules: data.schedules as ScheduleResult[],
      message: "Agendamentos carregados com sucesso.",
    };
  } catch (e) {
    console.log(e);
  }
}
