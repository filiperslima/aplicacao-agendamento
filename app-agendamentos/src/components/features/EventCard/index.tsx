import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function EventCard({
  event,
}: {
  event: {
    id: string;
    duration: number;
    unit: string;
    name: string;
    availability: { [key: string]: { active: boolean; startTime: string; endTime: string } };
  };
}) {
  return (
    <Card className="border-l-4 border-l-emerald-600 gap-1">
      <CardHeader className="text-2xl font-bold m-0">Evento: {event.name}</CardHeader>
      <CardContent className="w-7xl text-muted-foreground flex items-center justify-between">
        <div className="w-5xl">
          <div>
            Duração: {event.duration} {event.unit}
          </div>
          <div>Disponibilidade: {Object.keys(event.availability).join(", ")}</div>
        </div>
        <div>
          <a href="" className="text-emerald-600 hover:underline font-medium">
            Copia link
          </a>
          {/* <a href="">xsds</a> */}
        </div>
      </CardContent>
    </Card>
  );
}
