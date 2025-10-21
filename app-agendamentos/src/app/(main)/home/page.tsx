import { EventCard } from "@/components/features/EventCard";
import { EventForm } from "@/components/features/EventForm";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createEvent } from "../../actions/event";

const fetchData = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event/29ff9ccd-0bfd-4f63-83c1-878f14d81541`, {
    method: "GET",
  });
  if (!response.ok) {
    console.log(response);
  }
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default async function Home() {
  const {events} = await fetchData();
  console.log(events);

  return (
    <div className="w-full p-8 flex flex-col gap-4 h-full">
      <div className="w-full flex  flex-col justify-evenly self-end h-1/4">
        <span className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-extrabold">Seus eventos</h1>
          <EventForm onSubmit={createEvent} />
        </span>
        <span className="flex flex-col gap-4">
          <Label>Pesquisar por eventos</Label>
          <Input className="w-1/5" type="text" placeholder="Pesquisar" />
        </span>
      </div>
      <div className="h-1/2 flex flex-col w-7xl">
        <div className="w-full flex justify-between p-4 mb-4">
          <p>Eventos de Filipe Rodrigues</p>
          <a href="">Ver página de destino</a>
        </div>
        {events?.length > 0 && events.map((event: {id: string, duration: number, unit: string, name: string}) => {
          return <EventCard event={event}/>;
        })}
        
      </div>
    </div>
  );
}
