import { Event } from "@/app/actions/event";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="border-l-4 border-l-emerald-600 gap-1">
      <CardHeader className="text-2xl font-bold m-0">Evento: {event.name}</CardHeader>
      <CardContent className="w-full md:w-7xl text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-screen md:w-5xl py-2">
          <div className="py-4 font-bold">
            Duração: {event.duration} {event.unit}
          </div>
          <div>Disponibilidade: {Object.keys(event.availability).join(", ")}</div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`http://localhost:3000/schedules/${event.id}`}
            className="text-emerald-600  hover:text-emerald-700 hover:underline font-medium transition-colors"
          >
            Ver agenda de evento
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(`http://localhost:3000/schedules/${event.id}`);
              toast.success("Link copiado!");
            }}
            className="text-emerald-600 flex-1 hover:text-emerald-700 hover:underline font-medium cursor-pointer transition-colors"
          >
            Copiar link
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
