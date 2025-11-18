import { getScheduleByEvent } from "@/app/actions/schedule";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface EventPageProps {
  params: {
    eventId: string;
  };
}

const WeekMap = {
  Domingo: 0,
  Segunda: 1,
  Terça: 2,
  Quarta: 3,
  Quinta: 4,
  Sexta: 5,
  Sábado: 6,
};

export default async function Schedule({ params }: EventPageProps) {
  const { eventId } = params;

  const result = await getScheduleByEvent(eventId);

  const unavailableDays: number[] = result?.schedules
    ? (Object.entries(result.schedules[0].availability)
        .map(([key, value]) => (!value.active ? WeekMap[key as keyof typeof WeekMap] : null))
        .filter((v) => v !== null) as number[])
    : [];
  const hours = result?.schedules?.[0].availability;
  console.log(hours);
  const horarios = new Set<string>();

  for (const key in hours) {
    horarios.add(hours[key].startTime.split(":")[0]);
    horarios.add(hours[key].endTime.split(":")[0]);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#e2e2e2]">
      <Card>
        <CardHeader>Agende seu horário com: FULANO</CardHeader>
        <CardContent className="flex">
          <Calendar
            mode="single"
            numberOfMonths={2}
            classNames={{ months: "flex gap-22 p-8 flex-col md:flex-row relative" }}
            showOutsideDays={false}
            disabled={[{ dayOfWeek: unavailableDays || [] }]}
          />

          <div>
            <span>Horário de atendimento</span>
            {[...horarios].map((item) => (
              <p>{item}:00</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
