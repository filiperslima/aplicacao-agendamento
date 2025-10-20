import { EventCard } from "@/components/features/EventCard";
import { EventForm } from "@/components/features/EventForm";

export default function Home() {
  return (
    <div className="w-full">
      <EventCard/>
      <EventForm/>
    </div>
  );
}
