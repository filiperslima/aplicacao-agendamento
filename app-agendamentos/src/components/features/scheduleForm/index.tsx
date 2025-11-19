"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { createSchedule } from "@/app/actions/schedule";
import { toast } from "sonner";
import { useTransition } from "react";

interface ScheduleFormProps {
  eventId: string;
  time: string;
  date: string;
  disabled?: boolean;
  variant?: "default" | "outline";
  duration?: number;
}

export function ScheduleForm({ eventId, time, date, disabled, variant, duration }: ScheduleFormProps) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const response = await createSchedule(formData);
      console.log("ARESPONSEAQUI", response);
      toast(response.message);

      if (response?.status === 200) {
        window.location.reload();
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger
        disabled={disabled}
        className={cn(variant === "default" ? "bg-primary text-accent" : "bg-destructive text-accent", "rounded-sm p-2")}
      >
        {time}
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-center m-4">Solicitação de agendamento</DialogTitle>
        <DialogHeader className="p-2">Informe seu nome e e-mail para que possamos enviar sua solicitação.</DialogHeader>
        <form action={handleSubmit} className="flex flex-col gap-2">
          <Input type="hidden" name="eventId" defaultValue={eventId} />
          <Input type="hidden" name="date" defaultValue={date} />
          <Input type="hidden" name="time" defaultValue={time} />
          <Input type="hidden" name="duration" defaultValue={duration} />

          <Label>Nome</Label>
          <Input name="nome" required />

          <Label>Email</Label>
          <Input name="email" type="email" required />

          <Button type="submit">Agendar</Button>
        </form>
        <DialogDescription>*O agendamento está sujeito a aprovação do administrador da agenda.</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
