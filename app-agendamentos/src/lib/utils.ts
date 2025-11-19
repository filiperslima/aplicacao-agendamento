import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHours(start: string, end: string, duration: number) {
  const result = [];
  const startTime = toMinutes(start);
  const endTime = toMinutes(end);
  let currentTime = startTime;

  while (currentTime <= endTime) {
    const time = new Date();
    time.setHours(Math.floor(currentTime / 60));
    time.setMinutes(currentTime % 60);
    result.push(time);
    currentTime += duration;
  }
  return result;
}

export function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
