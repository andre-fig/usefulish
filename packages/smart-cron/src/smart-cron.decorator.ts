import { Cron } from '@nestjs/schedule';
import { applyDecorators } from '@nestjs/common';
import { SmartCronOptions, ALLOWED_MINUTES } from './smart-cron.interface';

export function SmartCron(options: SmartCronOptions) {
  const { minutes, fromHour = 0, toHour = 23, weekdaysOnly = false } = options;

  if (fromHour > toHour) {
    throw new Error(
      `Invalid hours: fromHour = ${fromHour} cannot be greater than toHour = ${toHour}`
    );
  }

  const offset = ALLOWED_MINUTES.indexOf(minutes);

  const minutePart = `${offset}-59/${minutes}`;
  const hourPart = `${fromHour}-${toHour}`;
  const dayOfWeekPart = weekdaysOnly ? '1-5' : '*';

  const cronExpression = `${minutePart} ${hourPart} * * ${dayOfWeekPart}`;

  return applyDecorators(Cron(cronExpression));
}
