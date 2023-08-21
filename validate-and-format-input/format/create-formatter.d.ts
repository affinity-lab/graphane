export interface stringRecord extends Record<string, string | string[] | number | undefined | stringRecord> {
}
export declare type formatterInOutput = string | string[] | number | undefined | stringRecord;
export declare type FormatterFn = (value: formatterInOutput) => formatterInOutput;
declare type AtomicFormatterFn = (value: string) => string;
export default function createFormatter(target: any, key: any, fn: AtomicFormatterFn): void;
export {};
