export const idbConfig = {
  databaseName: "rayauth-db",
  version: 1,
  stores: [
    {
      name: "keyshare",
      id: { keyPath: "id", autoIncrement: true },
      indices: [{ name: "key", keyPath: "key", options: { unique: false } }],
    },
  ],
};
