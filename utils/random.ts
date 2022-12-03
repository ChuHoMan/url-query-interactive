export const generateId = (): string => {
  return Math.random().toString(36).split('.')[1];
};
