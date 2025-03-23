export interface SmartCronOptions {
    minutes: 1 | 2 | 3 | 5 | 10 | 15 | 20 | 30 | 60;
    fromHour?: number;
    toHour?: number;
    weekdaysOnly?: boolean;
}
export declare function SmartCron(options: SmartCronOptions): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
