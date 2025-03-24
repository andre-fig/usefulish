export const ALLOWED_MINUTES = [7, 11, 13, 17, 19, 23, 29, 31, 37, 41] as const;

type NumberRange<
  Start extends number,
  End extends number,
  Acc extends number[] = []
> = Acc['length'] extends End
  ? Exclude<Acc[number], Start> | Start
  : NumberRange<Start, End, [...Acc, Acc['length']]>;

export type AllowedMinutes = 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 | 41;

export type Hour0To23 = NumberRange<0, 24>;
export type Hour1To23 = Exclude<Hour0To23, 0>;

export interface SmartCronOptions {
  intervalInMinutes: AllowedMinutes;
  fromHour?: Hour0To23;
  toHour?: Hour1To23;
  weekdaysOnly?: boolean;
}
