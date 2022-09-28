export abstract class LocalStorage {
  readonly length!: number;

  [key: string]: any;

  [index: number]: string;

  abstract clear(): void;
  abstract getItem(key: string): string | null;
  abstract key(index: number): string | null;
  abstract removeItem(key: string): void;
  abstract setItem(key: string, data: string): void;
}
