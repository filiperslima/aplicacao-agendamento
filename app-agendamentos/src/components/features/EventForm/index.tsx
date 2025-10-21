"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { SwitchDay } from "./SwitchDay";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { FormState } from "@/app/actions/event";

interface EventFormProps {
  onSubmit: (prevState: any, formData: FormData) => Promise<FormState>;
}

export function EventForm({ onSubmit }: EventFormProps) {
  const [state, formAction] = useActionState(onSubmit, null);
  const [userId, setUserId] = useState<string | null>(null);

  const durations = [15, 30, 45, 60];
  const [selectedDuration, setSelectedDuration] = useState("30");

  const [eventName, setEventName] = useState("");
  const [customValues, setCustomValues] = useState({
    value: "",
    unit: "",
  });
  const [avaliability, setAvaliability] = useState({
    Segunda: { active: true, startTime: "09:00", endTime: "18:00" },
    Terça: { active: true, startTime: "09:00", endTime: "18:00" },
    Quarta: { active: true, startTime: "09:00", endTime: "18:00" },
    Quinta: { active: false, startTime: "09:00", endTime: "18:00" },
    Sexta: { active: false, startTime: "09:00", endTime: "18:00" },
    Sábado: { active: false, startTime: "09:00", endTime: "12:00" },
    Domingo: { active: false, startTime: "00:00", endTime: "00:00" },
  });
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (!id) {
      console.log("Erro, redirecionar para login");
    }
    setUserId(id);
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <PlusCircle /> Adicionar um evento
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-8 !max-w-4xl max-h-[95vh] overflow-y-auto">
        <form action={formAction} className="gap-4 flex flex-col">
          <DialogTitle className="font-bold text-center text-3xl"> Criar evento</DialogTitle>
          <DialogDescription>Preencha os campos abaixo para criar um novo evento.</DialogDescription>
          <div className="flex flex-col gap-6">
            <Label htmlFor="event-name">Nome do evento</Label>
            <Input
              id="event-name"
              placeholder="Digite o nome do evento"
              name="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <h3>Duração</h3>
            <Input type="hidden" name="userId" value={userId ?? ""} />

            <Input type="hidden" name="selectedDuration" value={selectedDuration} />
            <RadioGroup className="flex" onValueChange={(value) => setSelectedDuration(value)}>
              {durations.map((duration) => {
                return (
                  <div className="flex gap-4">
                    <RadioGroupItem key={duration} value={duration.toString()} id={duration.toString()}></RadioGroupItem>
                    <Label htmlFor={duration.toString()}>{duration} min</Label>
                  </div>
                );
              })}
              <RadioGroupItem value="personalizado" id="personalizado"></RadioGroupItem>
              <Label htmlFor="personalizado">Personalizado</Label>
            </RadioGroup>
            {selectedDuration === "personalizado" && (
              <div className="flex flex-col gap-4">
                <Label htmlFor="custom-value">Valor</Label>
                <Input
                  id="custom-value"
                  placeholder="Digite o valor"
                  name="customValue"
                  value={customValues.value}
                  onChange={(e) => setCustomValues({ ...customValues, value: e.target.value })}
                />
                <Label htmlFor="custom-unit">Unidade</Label>
                <Input
                  id="custom-unit"
                  name="customUnit"
                  placeholder="Digite a unidade"
                  value={customValues.unit}
                  onChange={(e) => setCustomValues({ ...customValues, unit: e.target.value })}
                />
              </div>
            )}
          </div>
          <Input type="hidden" name="avaliability" value={JSON.stringify(avaliability)} />
          {Object.keys(avaliability).map((day: string) => (
            <SwitchDay
              day={day}
              active={avaliability[day as keyof typeof avaliability].active}
              startTime={avaliability[day as keyof typeof avaliability].startTime}
              endTime={avaliability[day as keyof typeof avaliability].endTime}
              onChange={(field, value) =>
                setAvaliability({
                  ...avaliability,
                  [day]: { ...avaliability[day as keyof typeof avaliability], [field]: value },
                })
              }
            />
          ))}
          <Button variant="outline">Salvar</Button>
        </form>
        {state?.message && <p>{state.message}</p>}
      </DialogContent>
    </Dialog>
  );
}
