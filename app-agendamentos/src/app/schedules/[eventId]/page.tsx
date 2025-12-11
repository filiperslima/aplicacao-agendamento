import { getEventById } from "@/app/actions/event";
import { getScheduleByEvent } from "@/app/actions/schedule";
import { Schedule } from "@/components/features/schedule";
import { notFound } from "next/navigation";

interface EventPageProps {
  params: {
    eventId: string;
  };
}
export default async function SchedulePage({ params }: EventPageProps) {
  const { eventId } = await params;

  try {
    const result = await getScheduleByEvent(eventId);
    const event = await getEventById(eventId);
    console.log(event);

    if (!event) {
      notFound();
    }

    return <Schedule schedules={result?.schedules || []} event={event.event} />;
  } catch (e) {
    console.error("Erro ao buscar dados", e);
    notFound();
  }
}
