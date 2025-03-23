"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartCron = void 0;
const schedule_1 = require("@nestjs/schedule");
const common_1 = require("@nestjs/common");
function SmartCron(options) {
    const { minutes, fromHour = 0, toHour = 23, weekdaysOnly = false } = options;
    if (minutes < 1 || minutes > 60 || 60 % minutes !== 0) {
        throw new Error(`Invalid 'minutes': ${minutes}. Must divide 60 evenly.`);
    }
    if (fromHour < 0 ||
        fromHour > 23 ||
        toHour < 0 ||
        toHour > 23 ||
        fromHour > toHour) {
        throw new Error(`Invalid hours: fromHour=${fromHour}, toHour=${toHour}`);
    }
    const minutePart = `*/${minutes}`;
    const hourPart = `${fromHour}-${toHour}`;
    const dayOfWeekPart = weekdaysOnly ? '1-5' : '*';
    const cronExpression = `${minutePart} ${hourPart} * * ${dayOfWeekPart}`;
    console.log(`[SmartCron] Gerado cron: "${cronExpression}"`);
    return (0, common_1.applyDecorators)((0, schedule_1.Cron)(cronExpression));
}
exports.SmartCron = SmartCron;
