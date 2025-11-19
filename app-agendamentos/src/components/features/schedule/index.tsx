"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { getHours } from "@/lib/utils";
import { format, parse, isSameDay } from "date-fns";

import { useState } from "react";
import { ScheduleForm } from "../scheduleForm";

const WeekMap = {
  Domingo: 0,
  Segunda: 1,
  Terça: 2,
  Quarta: 3,
  Quinta: 4,
  Sexta: 5,
  Sábado: 6,
};

const WeekDayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export function Schedule({ result }: any) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  const unavailableDays: number[] = result?.schedules
    ? (Object.entries(result.schedules[0].availability)
        .map(([key, value]) => (!value.active ? WeekMap[key as keyof typeof WeekMap] : null))
        .filter((v) => v !== null) as number[])
    : [];

  const availability = result?.schedules?.[0].availability;
  const duration = result?.schedules?.[0].duration || 30;

  const schedules = result?.schedules || [];

  const isTimeBooked = (date: Date, timeStr: string): boolean => {
    const [hours, minutes] = timeStr.split(":").map(Number);

    const checkDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0, 0));

    const isBooked = schedules.some((schedule: any) => {
      const scheduleStart = new Date(schedule.start);
      const scheduleEnd = new Date(schedule.end);

      return checkDate.getTime() >= scheduleStart.getTime() && checkDate.getTime() < scheduleEnd.getTime();
    });

    return isBooked;
  };

  const getAvailableHours = (date: Date | undefined): string[] => {
    if (!date || !availability) {
      return [];
    }

    const dayOfWeek = date.getDay();
    const dayName = WeekDayNames[dayOfWeek];
    const dayAvailability = availability[dayName as keyof typeof availability];

    if (!dayAvailability?.active) {
      return [];
    }

    const hours = getHours(dayAvailability.startTime, dayAvailability.endTime, duration);

    return hours.map((h) => format(h, "HH:mm"));
  };

  const availableHours = getAvailableHours(selectedDate);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card>
        <CardContent className="flex">
          <div className="flex flex-col gap-6 items-center">
            <span className="w-full text-center">Agende seu horário</span>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              numberOfMonths={2}
              classNames={{ months: "flex gap-22 p-8 flex-col md:flex-row relative" }}
              showOutsideDays={false}
              disabled={[{ dayOfWeek: unavailableDays || [] }, { before: new Date() }]}
            />
          </div>
          <div className="flex flex-col min-w-26 gap-6">
            <span>{selectedDate ? `Horários para ${format(selectedDate, "dd/MM/yyyy")}` : "Selecione uma data"}</span>
            <div className="max-h-[400px] flex flex-col overflow-auto gap-6">
              {availableHours.length > 0 ? (
                availableHours.map((timeStr) => {
                  const isBooked = isTimeBooked(selectedDate!, timeStr);
                  return (
                    <ScheduleForm
                      key={timeStr}
                      disabled={isBooked}
                      variant={isBooked ? "outline" : "default"}
                      eventId={result.id}
                      time={`${timeStr} ${isBooked ? "(Ocupado)" : ''}`}
                      date={format(selectedDate!, "yyyy-MM-dd")}
                      duration={duration}
                    ></ScheduleForm>
                  );
                })
              ) : (
                <span className="text-sm text-muted-foreground">
                  {selectedDate ? "Sem horários disponíveis" : "Selecione uma data para ver os horários"}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
