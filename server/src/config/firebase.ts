import { Firestore } from "@google-cloud/firestore";

const db = new Firestore({
  projectId: "bar-well-b",
  keyFilename: "keys/bar-well-b-31f0a6b55eb6.json",
});

export default db;
