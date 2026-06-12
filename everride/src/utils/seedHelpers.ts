import { from } from "node:stream/iter";

// Tilfældig pris mellem min og max
export const randomPrice = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Tilfældig årstal mellem to år
export const randomYear = (from: number, to: number): number => {
  return Math.floor(Math.random() * (to - from + 1)) + from;
};
