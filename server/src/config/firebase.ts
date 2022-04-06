import { Firestore } from "@google-cloud/firestore";

const db = new Firestore({
  projectId: "bar-well-b",
  keyFilename: "keys/key.json",
});

export default db;
