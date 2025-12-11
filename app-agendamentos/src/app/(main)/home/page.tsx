"use client";
import { EventCard } from "@/components/features/EventCard";
import { EventForm } from "@/components/features/EventForm";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createEvent, Event, fetchData } from "../../actions/event";
import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const userId = sessionStorage.getItem("id");
    if (!userId) return; //DEPOIS EU PRECIS OREDIRECIONAR PARA O LOGIN CASO N TENHA USER ID

    const fetch = async () => {
      const data = await fetchData(userId);
      if (data.success) setEvents(data.event);
      console.log(data.event);
    };
    fetch();
  }, []);

  return (
    <div className="w-full p-8 flex flex-col gap-4 h-full">
      <div className="w-full flex  flex-col justify-evenly self-end h-1/4">
        <span className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-extrabold">Seus eventos</h1>
          <EventForm onSubmit={createEvent} />
        </span>
        <span className="flex flex-col gap-4">
          <Label>Pesquisar por eventos</Label>
          <Input
            className="w-1/5"
            type="text"
            placeholder="Pesquisar"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </span>
      </div>
      <div className="h-1/2 flex flex-col w-7xl">
        <div className="w-full flex justify-between p-4 mb-4">
          <p>Eventos de Filipe Rodrigues</p>
          <a href="">Ver página de destino</a>
        </div>
        {events &&
          events?.length > 0 &&
          events
            .filter((event: Event) => {
              return event.name.toLowerCase().includes(filter.toLowerCase());
            })
            .map((event: Event) => {
              return <EventCard event={event} />;
            })}
      </div>
    </div>
  );
}
