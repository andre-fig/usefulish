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
 *   // Executes every 15 minutes from 09:00 to 17:59, Mon–Fri, in UTC-3
 * }
 * ```
 *
 * @param options - Scheduling configuration.
 * @param options.intervalInMinutes - Minute interval for execution. Must be included in `ALLOWED_MINUTES`.
 * @param options.fromHour - Start hour (inclusive), 0–23. Defaults to 0.
 * @param options.toHour - End hour (inclusive), 0–23. Defaults to 23.
 * @param options.weekdaysOnly - If true, limits execution to weekdays (Monday to Friday). Defaults to false.
 * @param options.timezone - UTC offset applied to scheduling (e.g. `-3` for UTC-3, `0` for UTC). Range: -12 to +14. Defaults to 0 (UTC).
 *
 * @returns A method decorator that schedules the task using the generated CRON expression.
 *
 * @throws Error if `fromHour` is greater than `toHour`.
 * @throws Error if `intervalInMinutes` is not allowed.
 */
export function SmartCron(options: SmartCronOptions) {
  const {
    intervalInMinutes,
    fromHour = 0,
    toHour = 23,
    weekdaysOnly = false,
    timezone = 0,
  } = options;

  if (fromHour > toHour) {
    throw new Error(
      `Invalid hours: fromHour = ${fromHour} cannot be greater than toHour = ${toHour}`
    );
  }

  const offset = ALLOWED_MINUTES.indexOf(intervalInMinutes);

  const minutePart = `${offset}-59/${intervalInMinutes}`;
  const hourPart = `${fromHour}-${toHour}`;
  const dayOfWeekPart = weekdaysOnly ? '1-5' : '*';

  const cronExpression = `${minutePart} ${hourPart} * * ${dayOfWeekPart}`;

  const tzString =
    timezone === 0
      ? 'Etc/UTC'
      : `Etc/GMT${timezone > 0 ? `-${timezone}` : `+${Math.abs(timezone)}`}`;

  return applyDecorators(Cron(cronExpression, { timeZone: tzString }));
}
