import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line import/prefer-default-export
export const loadingState = atom<boolean>({
  key: `lading/${uuidv4()}`,
  default: false
});
