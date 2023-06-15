export interface UseCaseInterface<T> {
  execute(...args: any[]): T | Promise<T>;
}
