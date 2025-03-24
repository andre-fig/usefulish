import { Cron } from '@nestjs/schedule';
import { applyDecorators } from '@nestjs/common';
import { SmartCronOptions, ALLOWED_MINUTES } from './smart-cron.interface';

/**
 * Applies a CRON-based task scheduler with smart defaults.
 *
 * Generates a CRON expression based on a validated minute interval, optional hour range,
 * weekday restrictions, and a UTC offset-based timezone.
 *
 * @example
 * ```ts
 * @SmartCron({
 *   intervalInMinutes: 15,
 *   fromHour: 9,
 *   toHour: 17,
 *   weekdaysOnly: true,
 *   timezone: -3
 * })
 * handleTask() {
 *   // Executes every 15 minutes from 09:00 to 17:00, Mon–Fri, in UTC-3
 * }
 * ```
 *
 * @param options - Scheduling configuration.
 * @param options.intervalInMinutes - Minute interval for execution. Must be included in `ALLOWED_MINUTES`.
 * @param options.fromHour - Start hour (inclusive), 0–23. Defaults to 0.
 * @param options.fromMinute - Start minute (inclusive), 0–59. Defaults to 0.
 * @param options.toHour - End hour (inclusive), 0–23. Defaults to 23.
 * @param options.toMinute - End minute (inclusive), 0–59. Defaults to 59.
 * @param options.weekdaysOnly - If true, limits execution to weekdays (Monday to Friday). Defaults to false.
 * @param options.timezone - UTC offset applied to scheduling (e.g. `-3` for UTC-3, `0` for UTC). Range: -12 to +14. Defaults to 0 (UTC).
 *
 * @returns A method decorator that schedules the task using the generated CRON expression(s).
 *
 * @throws Error if `intervalInMinutes` is not allowed.
 */

export function SmartCron(options: SmartCronOptions) {
  const {
    intervalInMinutes,
    fromHour = 0,
    fromMinute = 0,
    toHour = 23, // <-- Agora o default é 23
    toMinute = 59,
    weekdaysOnly = false,
    timezone = 0,
  } = options;

  if (!ALLOWED_MINUTES.includes(intervalInMinutes)) {
    throw new Error(
      `Invalid interval: ${intervalInMinutes} not in allowed values.`
    );
  }

  const dayOfWeekPart = weekdaysOnly ? '1-5' : '*';

  const tzString =
    timezone === 0
      ? 'Etc/UTC'
      : `Etc/GMT${timezone > 0 ? `-${timezone}` : `+${Math.abs(timezone)}`}`;

  const cronExpressions: string[] = [];

  // Execução única se exatamente o mesmo horário
  if (fromHour === toHour && fromMinute === toMinute) {
    cronExpressions.push(`${fromMinute} ${fromHour} * * ${dayOfWeekPart}`);
  } else {
    const crossesMidnight =
      toHour < fromHour || (toHour === fromHour && toMinute < fromMinute);

    const generateCronRange = (
      startHour: number,
      startMinute: number,
      endHour: number,
      endMinute: number
    ) => {
      for (let hour = startHour; hour <= endHour; hour++) {
        const minuteStart = hour === startHour ? startMinute : 0;
        const minuteEnd = hour === endHour ? endMinute : 59;

        if (minuteStart <= minuteEnd) {
          cronExpressions.push(
            `${minuteStart}-${minuteEnd}/${intervalInMinutes} ${hour} * * ${dayOfWeekPart}`
          );
        }
      }
    };

    if (crossesMidnight) {
      generateCronRange(fromHour, fromMinute, 23, 59);
      generateCronRange(0, 0, toHour, toMinute);
    } else {
      generateCronRange(fromHour, fromMinute, toHour, toMinute);
    }
  }

  const decorators = cronExpressions.map((expression) =>
    Cron(expression, { timeZone: tzString })
  );

  return applyDecorators(...decorators);
}
