"use server";
interface Availability {
  [daty: string]: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
}

export interface FormState {
  message: string;
  success: boolean;
}

export async function createEvent(prevState: FormState, formData: FormData): Promise<FormState> {
  const eventName = formData.get("eventName") as string;
  const selectedDuration = formData.get("selectedDuration") as string;
  const handleAvailability = formData.get("avaliability") as string;
  const customValue = formData.get("customValue") as string;
  const customUnit = formData.get("customUnit") as string;
  const userId = formData.get("userId") as string;
  let availability: Availability;

  console.log("aqui:",userId)
  try {
    availability = JSON.parse(handleAvailability);
  } catch (error) {
    return { message: "Erro ao formatar disponibilidade", success: false };
  }

  if (!eventName || !handleAvailability) {
    return { message: "Preencha todos os campos", success: false };
  }
  if (!selectedDuration && !customValue) {
    return { message: "Preencha a duração do evento", success: false };
  }

  const usedDuration = selectedDuration ?? customValue;
  const usedUnit = customValue ?? "minutos";

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event`, {
    method: "POST",
    body: JSON.stringify({
      name: eventName,
      duration: usedDuration,
      unit: usedUnit,
      avaliability: availability,
      userId,
    }),
  });
  const data = await response.json();
  if (data.status != 200) {
    return { message: data.message, success: false };
  }
  return {
    message: "Evento criado com sucesso",
    success: true,
  };
}
