export interface stringRecord extends Record<string, string | string[] | number | undefined | stringRecord> {
}
export type formatterInOutput = string | string[] | number | undefined | stringRecord;
export type FormatterFn = (value: formatterInOutput) => formatterInOutput;
type AtomicFormatterFn = (value: string) => string;
export declare function createFormatter(target: any, key: any, fn: AtomicFormatterFn): void;
export {};
