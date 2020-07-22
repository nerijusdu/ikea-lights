export const sleep = (miliseconds) => new Promise(
  (resolve) => setTimeout(() => resolve(), miliseconds)
);
