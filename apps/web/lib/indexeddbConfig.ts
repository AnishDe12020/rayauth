import { IndexedDBConfig } from "use-indexeddb/dist/interfaces";

export const idbConfig = {
  databaseName: "rayauth-db",
  version: 1,
  stores: [
    {
      name: "keyshare",
      id: { keyPath: "id", autoIncrement: false },
      indices: [{ name: "key", keyPath: "key", options: { unique: false } }],
    },
  ],
} as IndexedDBConfig;
