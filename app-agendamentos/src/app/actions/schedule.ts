"use server";

import { addMinutes, format, parse } from "date-fns";

export interface ScheduleResult {
  start: string;
  end: string;
  availability: Record<string, { active: boolean; startTime: string; endTime: string }>;
  duration: number;
}
export async function getScheduleByEvent(event: string) {
  if (!event) return { error: "Evento não encontrado" };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedules/${event}`);
    const data = await response.json();
    return {
      schedules: (data.schedules as ScheduleResult[]) || [],
      message: "Agendamentos carregados com sucesso.",
    };
  } catch (e) {
    console.log(e);
  }
}

export async function createSchedule(formData: FormData) {
  const event_id = formData.get("eventId")?.toString();
  const date = formData.get("date")?.toString();
  const duration = formData.get("duration")?.toString();
  const time = formData.get("time")?.toString();
  const nome = formData.get("nome")?.toString();
  const email = formData.get("email")?.toString();

  console.log(event_id, date, duration, time, nome, email);

  if (!event_id || !date || !duration || !time || !nome || !email) {
    return { error: "Por favor, preencha todos os campos necessários para o registro" };
  }
  try {
    const handleStart = `${date} ${time}`;

    const start = parse(handleStart, "yyyy-MM-dd HH:mm", new Date());

    const end = addMinutes(start, parseInt(duration));
    console.log(start, end);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedules`, {
      method: "POST",
      body: JSON.stringify({
        start: format(start, "yyyy-MM-dd HH:mm:ss"),
        end: format(end, "yyyy-MM-dd HH:mm:ss"),
        event_id: event_id,
        name: nome,
        email: email,
      }),
    });

    const data = await response.json();
    console.log("ADASDA", data);

    if (data.status != 200) {
      return { error: data.message };
    }
    console.log(data);

    return {
      status: 200,
      message: "Agendamento criado com sucesso",
    };
  } catch (e) {}
}

export async function getSchedules(userId: string) {
  if (!userId) return { error: "User não logado" };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedules?id=${userId}`);
    const data = await response.json();
    return {
      schedules: (data.schedules as ScheduleResult[]) || [],
      message: "Agendamentos carregados com sucesso.",
    };
  } catch (e) {
    console.log(e);
  }
}
