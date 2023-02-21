import { atomWithStorage } from "jotai/utils";
// import { get, set, del, createStore } from "idb-keyval";

// export const deviceShareAtom = atomWithStorage("deviceShare", "checking", {
//   getItem: async (key) => {
//     const v = await get(key);

//     if (v === undefined) {
//       return "not-set";
//     }

//     return v;
//   },
//   setItem: async (key, value) => {
//     await set(key, value);
//   },
//   removeItem: async (key) => {
//     await del(key);
//   },
// });

export const deviceShareAtom = atomWithStorage<string | undefined>(
  "deviceShare",
  undefined
);
