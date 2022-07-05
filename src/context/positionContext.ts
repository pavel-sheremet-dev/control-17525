import { createContext } from "react";

interface IPositionContext {
  isRightHand: boolean;
  toggleHand(value: boolean): void;
}

const PositionContext = createContext<IPositionContext>({
  isRightHand: false,
  toggleHand: () => {},
});

export { PositionContext };
