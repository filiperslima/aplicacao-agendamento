"use client";
import { getSchedules } from "@/app/actions/schedule";
import { EventHistoric } from "@/components/features/EventHistoric";
import { useEffect, useState, useTransition } from "react";

export default function meets() {
  // const [isPending, startTransition] = useTransition();
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const id = sessionStorage.getItem("id");
      if (!id) {
        console.log("Nâo encontradp");
        return;
      }
      const data = await getSchedules(id);
      console.log(data);
      setSchedules(data?.schedules || []);
    };
    fetch();
  }, []);

  return (
    <div className="md:w-full p-8 flex flex-col gap-4 max-h-full">
      <div className="w-full flex  flex-col justify-evenly self-end h-1/4">
        <span className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-extrabold">Seus agendamentos</h1>
        </span>
      </div>
      <div className="max-h-[50%] flex flex-col w-7xl overflow-y-auto">
        <div className="w-full flex justify-between p-4 mb-4">
          <p>Eventos de Filipe Rodrigues</p>
          {/* <a href="">Ver página de destino</a> */}
        </div>

        <EventHistoric schedule={schedules} />
      </div>
    </div>
  );
}
