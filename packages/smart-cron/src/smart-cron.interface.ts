/**
 * List of allowed execution intervals in minutes.
 *
 * These values are intentionally prime or uncommon to reduce overlap
 * with typical system cron schedules and avoid collisions in shared environments.
 *
 * Must be referenced via `AllowedMinutes` for type safety.
 */
export const ALLOWED_MINUTES = [7, 11, 13, 17, 19, 23, 29, 31, 37, 41] as const;

/**
 * Minute values allowed for interval-based execution.
 * Derived from the `ALLOWED_MINUTES` constant.
 */
export type AllowedMinutes = (typeof ALLOWED_MINUTES)[number];

/**
 * Represents a valid UTC offset (in hours) for timezone configuration.
 *
 * Range: from UTC-12 to UTC+14.
 *
 * These values are based on the official IANA time zone database and are
 * used to control the time context in which cron expressions are evaluated.
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
 * Options for the SmartCron decorator.
 */
export interface SmartCronOptions {
  /**
   * Interval between executions, in minutes.
   * Must be one of the predefined allowed values.
   */
  intervalInMinutes: AllowedMinutes;

  /**
   * Starting hour (inclusive), from 0 (midnight) to 23.
   * Defaults to 0 if omitted.
   */
  fromHour?: Hour;

  /**
   * Ending hour (inclusive), from 0 to 23.
   * Defaults to 23 if omitted.
   */
  toHour?: Hour;

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
   */
  timezone?: UTCOffset;

  // TODO: Use offset (bool)
}
