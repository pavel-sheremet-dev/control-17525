export const timeout = (cssDelay: number, multiplier: number = 1) =>
  new Promise((res) => setTimeout(res, cssDelay * multiplier));
