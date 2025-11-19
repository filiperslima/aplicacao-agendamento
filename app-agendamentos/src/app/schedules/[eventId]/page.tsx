import { getScheduleByEvent } from "@/app/actions/schedule";
import  {Schedule}  from "@/components/features/schedule";

interface EventPageProps {
  params: {
    eventId: string;
  };
}
export default async function SchedulePage({ params }: EventPageProps) {
  const { eventId } = ( await params);
  const result = await getScheduleByEvent(eventId);

  return <Schedule result={{...result, id: eventId}} />;
}
