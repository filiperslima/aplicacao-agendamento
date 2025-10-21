import { EventHistoric } from "@/components/features/EventHistoric";

export default function meets() {
  return (
    <div className="w-full p-8 flex flex-col gap-4 h-full">
      <div className="w-full flex  flex-col justify-evenly self-end h-1/4">
        <span className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-extrabold">Seus agendamentos</h1>
        </span>
      </div>
      <div className="h-1/2 flex flex-col w-7xl">
        <div className="w-full flex justify-between p-4 mb-4">
          <p>Eventos de Filipe Rodrigues</p>
          <a href="">Ver página de destino</a>
        </div>

        <EventHistoric />
      </div>
    </div>
  );
}
