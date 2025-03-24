/**
 * List of allowed execution intervals in minutes.
 *
 * These values are intentionally prime or uncommon to reduce overlap
 * with typical system cron schedules and avoid collisions in shared environments.
 *
 * Must be referenced via `AllowedIntervals` for type safety.
 */
export const ALLOWED_MINUTES = [7, 11, 13, 17, 19, 23, 29, 31, 37, 41] as const;

/**
 * Minute values allowed for interval-based execution.
 * Derived from the `ALLOWED_MINUTES` constant.
 */
export type AllowedIntervals = (typeof ALLOWED_MINUTES)[number];

/**
 * Represents a valid UTC offset (in hours) for timezone configuration.
 *
 * Range: from UTC-12 to UTC+14.
 */
export type UTCOffset =
  | -12
  | -11
  | -10
  | -9
  | -8
  | -7
  | -6
  | -5
  | -4
  | -3
  | -2
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14;

/**
 * Represents any hour between 0 and 23 inclusive.
 */
export type Hour =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23;

/**
 * Represents any minute between 0 and 59 inclusive.
 */
export type Minute =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59;

/**
 * Options for the SmartCron decorator.
 */
export interface SmartCronOptions {
  /**
   * Interval between executions, in minutes.
   * Must be one of the predefined allowed values.
   */
  intervalInMinutes: AllowedIntervals;

  /**
   * Starting hour (inclusive), from 0 (midnight) to 23.
   * Defaults to 0 if omitted.
   */
  fromHour?: Hour;

  /**
   * Starting minute (inclusive), from 0 to 59.
   * Defaults to 0 if omitted.
   */
  fromMinute?: Minute;

  /**
   * Ending hour (inclusive), from 0 to 23.
   * Defaults to 23 if omitted.
   * If less than `fromHour`, it is considered to cross midnight.
   * Example: fromHour: 22, toHour: 3 → runs from 22:00 to 03:00
   */
  toHour?: Hour;

  /**
   * Ending minute (inclusive), from 0 to 59.
   * Defaults to 59 if omitted.
   */
  toMinute?: Minute;

  /**
   * If true, limits execution to weekdays (Monday to Friday).
   * Defaults to false.
   */
  weekdaysOnly?: boolean;

  /**
   * Optional UTC offset for timezone control.
   *
   * Examples:
   * - `-3` → UTC-3 (e.g., São Paulo)
   * - `0`  → UTC
   * - `5`  → UTC+5 (e.g., Pakistan Standard Time)
   *
   * Range: -12 to +14.
   * Defaults to 0 (UTC).
   */
  timezone?: UTCOffset;
}
