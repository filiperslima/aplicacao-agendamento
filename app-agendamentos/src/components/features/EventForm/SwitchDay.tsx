import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

type ChangeHandler = (field: "active" | "startTime" | "endTime", value: string | boolean) => void;

export function SwitchDay({
  day,
  active,
  startTime,
  endTime,
  onChange,
}: {
  day: string;
  active: boolean;
  startTime: string;
  endTime: string;
  onChange: ChangeHandler;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
      <div className="flex gap-3 min-w-[100px] sm:min-w-0">
        <Switch id={day} checked={active} onCheckedChange={(checked) => onChange("active", checked)} />
        <Label htmlFor={day}> {day}</Label>
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Input
          type="time"
          value={startTime}
          onChange={(e) => onChange("startTime", e.target.value)}
          disabled={!active}
          className="w-1/2 sm:w-[120px]"
        />
        <span>até</span>
        <Input
          type="time"
          value={endTime}
          onChange={(e) => onChange("endTime", e.target.value)}
          disabled={!active}
          className="w-1/2 sm:w-[120px]"
        />
      </div>
    </div>
  );
}
