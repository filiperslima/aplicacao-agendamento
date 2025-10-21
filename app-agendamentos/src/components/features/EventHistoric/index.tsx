import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Item, ItemActions, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CalendarOff } from "lucide-react";

export function EventHistoric({
  events = [{ event: "Nome do evento", init: Date.now(), end: Date.now(), duration: "15 min", email: "teste@gmail.com" }],
}: {
  events: any[];
}) {
  function formatTimeStampToLongDate(date: string) {
    const timestamp = Date.now();
    const data = new Date(timestamp);

    const opcoes: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return data.toLocaleDateString("pt-BR", opcoes);
  }

  function formatTimeStampToTime(date: string) {
    const data = new Date(date);
    return data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <ToggleGroup type="single">
          <ToggleGroupItem value="next">Próximos</ToggleGroupItem>
          <ToggleGroupItem value="prev">Anteriores</ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent className="p-0">
        {events.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant={"icon"}>
                <CalendarOff />
              </EmptyMedia>
              <EmptyTitle>Nenhum evento encontrado</EmptyTitle>
              <EmptyDescription>Crie um evento e compartilhe sua agenda com seus clientes.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
        {events.map((item) => {
          return (
            <>
              <Card className="p-0 rounded-none border-b-0">
                <CardHeader className="bg-muted w-full p-4">{formatTimeStampToLongDate(item.init)}</CardHeader>
                <CardContent className="p-4 flex justify-between  items-center">
                  <Item>
                    <ItemHeader>
                      {formatTimeStampToTime(item.init)} - {formatTimeStampToTime(item.end)}
                    </ItemHeader>
                  </Item>
                  <Item>
                    <ItemContent>{item.event}</ItemContent>
                    <ItemTitle>{item.email}</ItemTitle>
                  </Item>
                  <Item>
                    <ItemContent>{item.event}</ItemContent>
                    <ItemTitle>{item.email}</ItemTitle>
                    <ItemActions>
                      <Button variant="outline" size="sm">
                        Contactar usuário
                      </Button>
                    </ItemActions>
                  </Item>
                </CardContent>
              </Card>
            </>
          );
        })}
      </CardContent>
    </Card>
  );
}
