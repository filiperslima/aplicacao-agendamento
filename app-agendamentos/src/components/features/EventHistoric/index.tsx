"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Item, ItemActions, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CalendarOff } from "lucide-react";
import { useMemo, useState } from "react";

export function EventHistoric({
  schedule = [{ event: "Nome do evento", start: Date.now(), end: Date.now(), duration: "15 min", email: "teste@gmail.com" }],
}: {
  schedule: any[];
}) {
  const [currentPage, setPagination] = useState<number>(0);
  const maxItems = 5;

  const { current, hasPrev, hasNext } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ordened = [...schedule].sort((a, b) => {
      const dateA = new Date(a.start);
      const dateB = new Date(b.start);
      return dateA.getTime() - dateB.getTime();
    });
    const prev = ordened.filter((item) => {
      const date = new Date(item.start);
      return date.getTime() < today.getTime();
    });
    const next = ordened.filter((item) => {
      const date = new Date(item.start);
      return date.getTime() >= today.getTime();
    });
    let items = [];
    if (currentPage < 0) {
      const start = Math.abs(currentPage + 1) * maxItems;
      items = prev.slice(start, start + maxItems);
    } else {
      const start = currentPage * maxItems;
      items = next.slice(start, start + maxItems);
    }
    return {
      current: items,
      hasPrev: currentPage < 0 ? prev.length > Math.abs(currentPage) * maxItems : prev.length > 0,
      hasNext: currentPage < 0 ? true : next.length > (currentPage + 1) * maxItems,
    };
  }, [schedule, currentPage, maxItems]);

  function formatTimeStampToLongDate(date: string) {
    const timestamp = date;
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
          <ToggleGroupItem value="next" onClick={() => setPagination((p) => p + 1)} disabled={!hasNext}>
            Próximos
          </ToggleGroupItem>
          <ToggleGroupItem value="prev" onClick={() => setPagination((p) => p - 1)} disabled={!hasPrev}>
            Anteriores
          </ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent className="p-0">
        {schedule.length === 0 && (
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
        {current.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant={"icon"}>
                <CalendarOff />
              </EmptyMedia>
              <EmptyTitle>Nenhum evento encontrado para hoje!</EmptyTitle>
              <EmptyDescription>Navegue e veja eventos futuros ou anteriores </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

        {current.map((item) => {
          return (
            <>
              <Card className="p-0 rounded-none border-b-0" key={item.id}>
                <CardHeader className="bg-muted w-full p-4">{formatTimeStampToLongDate(item.start)}</CardHeader>
                <CardContent className="p-4 flex justify-between  items-center">
                  <Item>
                    <ItemHeader>
                      {formatTimeStampToTime(item.start)} - {formatTimeStampToTime(item.end)}
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
