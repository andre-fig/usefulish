# @usefulish/smartcron

[![npm version](https://img.shields.io/npm/v/@usefulish/smartcron.svg)](https://www.npmjs.com/package/@usefulish/smartcron)
[![npm downloads](https://img.shields.io/npm/dm/@usefulish/smartcron.svg)](https://www.npmjs.com/package/@usefulish/smartcron)
[![License](https://img.shields.io/npm/l/@usefulish/smartcron.svg)](./LICENSE)

> A lightweight, declarative cron decorator for NestJS with runtime validation, safe intervals, and built-in UTC offset support.

---

## Installation

```bash
npm install @usefulish/smartcron
```

or

```bash
yarn add @usefulish/smartcron
```

---

## Usage

```ts
import { SmartCron } from '@usefulish/smartcron';

@SmartCron({
  intervalInMinutes: 13,
  fromHour: 8,
  toHour: 18,
  weekdaysOnly: true,
  timezone: -3,
})
handleJob() {
  // Runs every 13 minutes from 08:00 to 18:59, Monday to Friday, in UTC-3
}
```

---

## Available Options

| Option              | Type             | Required | Default | Description                                                         |
| ------------------- | ---------------- | -------- | ------- | ------------------------------------------------------------------- |
| `intervalInMinutes` | `AllowedMinutes` | ✅       | —       | Interval in minutes. Must be one of the allowed values.             |
| `fromHour`          | `Hour`           | ❌       | `0`     | Start hour (inclusive).                                             |
| `toHour`            | `Hour`           | ❌       | `23`    | End hour (inclusive).                                               |
| `weekdaysOnly`      | `boolean`        | ❌       | `false` | Limits execution to weekdays (Mon–Fri) if true.                     |
| `timezone`          | `UTCOffset`      | ❌       | `0`     | UTC offset (e.g., `-3` for UTC-3). Affects CRON scheduling context. |

---

## Allowed Intervals

The following minute intervals are supported:

```ts
[7, 11, 13, 17, 19, 23, 29, 31, 37, 41];
```

These are intentionally non-standard (mostly primes) to minimize cron collision in shared environments.

---

## Timezone Support

You can configure the execution timezone using a UTC offset:

- Positive values (e.g., `3`) represent UTC+3
- Negative values (e.g., `-5`) represent UTC-5
- Default is `0` (UTC)

Internally, the offset is converted to an IANA-compatible timezone (e.g., `Etc/GMT+3` for UTC-3).

---

## Type Exports

This package also exports the following types for use in your codebase:

```ts
import {
  SmartCronOptions,
  AllowedMinutes,
  Hour,
  UTCOffset,
} from '@usefulish/smartcron';
```

---

## License

MIT
