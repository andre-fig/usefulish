import { Cron } from '@nestjs/schedule';
import { applyDecorators } from '@nestjs/common';

export interface SmartCronOptions {
  minutes: 1 | 2 | 3 | 5 | 10 | 15 | 20 | 30 | 60;
  fromHour?: number;
  toHour?: number;
  weekdaysOnly?: boolean;
}

export function SmartCron(options: SmartCronOptions) {
  const { minutes, fromHour = 0, toHour = 23, weekdaysOnly = false } = options;

  if (minutes < 1 || minutes > 60 || 60 % minutes !== 0) {
    throw new Error(`Invalid 'minutes': ${minutes}. Must divide 60 evenly.`);
  }

  if (
    fromHour < 0 ||
    fromHour > 23 ||
    toHour < 0 ||
    toHour > 23 ||
    fromHour > toHour
  ) {
    throw new Error(`Invalid hours: fromHour=${fromHour}, toHour=${toHour}`);
  }

  const minutePart = `*/${minutes}`;
  const hourPart = `${fromHour}-${toHour}`;
  const dayOfWeekPart = weekdaysOnly ? '1-5' : '*';

  const cronExpression = `${minutePart} ${hourPart} * * ${dayOfWeekPart}`;

  console.log(`[SmartCron] Gerado cron: "${cronExpression}"`);

  return applyDecorators(Cron(cronExpression));
}
