export const safe = <T extends (...args: any) => any>(fn: T, value?: ReturnType<T>) => {
  try {
    return fn();
  } catch {
    return value;
  }
};
