import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const todosState = atom({
  key: "todos",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const sortState = atom({
  key: "sort",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const searchState = atom({
  key: "search",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const selectState = atom({
  key: "select",
  default: "",
  effects_UNSTABLE: [persistAtom],
})
