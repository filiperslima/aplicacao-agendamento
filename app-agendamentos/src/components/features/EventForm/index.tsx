import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export function EventForm() {
  const durations = [15, 30, 45, 60];
  const availability ={
    
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Criar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle> Criar evento</DialogTitle>
        <DialogDescription>Preencha os campos abaixo para criar um novo evento.</DialogDescription>
        <div>
          <h3>Duração</h3>
          <RadioGroup className="flex">
            {durations.map((duration) => {
              return (
                <div className="flex gap-4">
                  <RadioGroupItem key={duration} value={duration.toString()} id={duration.toString()}></RadioGroupItem>
                  <Label htmlFor={duration.toString()}>{duration} min</Label>
                </div>
              );
            })}
            {/* <RadioGroupItem value="personalizado" id="personalizado"></RadioGroupItem>
            <Label htmlFor="personalizado">Personalizado</Label> */}
          </RadioGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
}
