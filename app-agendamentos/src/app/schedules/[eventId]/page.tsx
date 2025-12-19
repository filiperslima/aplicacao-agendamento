import { getEventById } from "@/app/actions/event";
import { getScheduleByEvent } from "@/app/actions/schedule";
import { Schedule } from "@/components/features/schedule";
import { SidebarProvider } from "@/components/ui/sidebar";
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

    return (
      <SidebarProvider>
        <Schedule schedules={result?.schedules || []} event={event.event} />
      </SidebarProvider>
    );
  } catch (e) {
    console.error("Erro ao buscar dados", e);
    notFound();
  }
}
