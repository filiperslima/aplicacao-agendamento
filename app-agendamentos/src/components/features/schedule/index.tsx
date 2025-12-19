"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { getHours } from "@/lib/utils";
import { format } from "date-fns";

import { useState } from "react";
import { ScheduleForm } from "../scheduleForm";
import { ScheduleResult } from "@/app/actions/schedule";
import { useSidebar } from "@/components/ui/sidebar";

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

interface ScheduleProps {
  schedules: ScheduleResult[];
  event: {
    created_at: string;
    duration: number;
    id: string;
    name: string;
    unit: string;
    user_id: string;
    availability?: Record<
      string,
      {
        active: boolean;
        startTime: string;
        endTime: string;
      }
    >;
  };
}

export function Schedule({ schedules, event }: ScheduleProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { isMobile } = useSidebar();
  const schedule = schedules[0];
  const availability = event.availability;
  const duration = schedule.duration || 30;
  const schedulesData = schedules || [];
  console.log(schedulesData);

  const unavailableDays: number[] = availability
    ? Object.entries(availability)
        .map(([key, value]) => (!value?.active ? WeekMap[key as keyof typeof WeekMap] : null))
        .filter((v): v is number => v !== null)
    : [];

  const isTimeBooked = (date: Date, timeStr: string): boolean => {
    if (!date) return false;

    const [hours, minutes] = timeStr.split(":").map(Number);

    const checkDate = new Date(date);
    checkDate.setHours(hours, minutes, 0, 0);

    return schedulesData.some((schedule: { start: string; end: string }) => {
      const scheduleStart = new Date(schedule.start);
      const scheduleEnd = new Date(schedule.end);
      scheduleStart.setHours(scheduleStart.getHours() + 3);
      scheduleEnd.setHours(scheduleEnd.getHours() + 3);
      console.log("AQUI", scheduleStart, scheduleEnd, checkDate);

      return checkDate >= scheduleStart && checkDate < scheduleEnd;
    });
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

    return hours.map((hour) => format(hour, "HH:mm"));
  };

  const availableHours = getAvailableHours(selectedDate);
  console.log(availableHours);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:p-24">
      <Card>
        <CardContent className="flex flex-col md:flex-row justify-between items-center md:justify-start md:items-stretch gap-6">
          <div className="flex flex-col gap-6 items-center">
            <span className="w-full text-center font-bold text-2xl">Agende seu horário</span>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              numberOfMonths={isMobile ? 1 : 2}
              classNames={{ months: "flex gap-22 p-8 flex-col md:flex-row relative" }}
              showOutsideDays={false}
              disabled={[...(unavailableDays.length > 0 ? [{ dayOfWeek: unavailableDays }] : []), { before: new Date() }]}
            />
          </div>
          <div className="flex flex-col min-w-26 gap-6">
            <span>{selectedDate ? `Horários para ${format(selectedDate, "dd/MM/yyyy")}` : "Selecione uma data"}</span>
            <div className="max-h-[400px] flex flex-col overflow-auto gap-6">
              {availableHours.length > 0 ? (
                availableHours.map((timeStr) => {
                  const isBooked = isTimeBooked(selectedDate!, timeStr);
                  console.log(isBooked);
                  return (
                    <ScheduleForm
                      key={timeStr}
                      disabled={isBooked}
                      variant={isBooked ? "outline" : "default"}
                      eventId={event.id}
                      time={`${timeStr} ${isBooked ? "(Ocupado)" : ""}`}
                      date={format(selectedDate!, "yyyy-MM-dd")}
                      duration={duration}
                    />
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
