import bcryptjs from "bcryptjs";

import db from "../config/firebase";

export const getUserDB = async (userId: string) => {
  const userRef = await db.collection("users").doc(userId).get();
  const user = userRef.data();
  return user;
};

export const getUserByUsernameDB = async (username: string) => {
  const userRef = await db
    .collection("users")
    .where("username", "==", username)
    .get();

  if (userRef.docs.length === 0) {
    return null;
  }

  const user = userRef.docs[0].data();
  return user;
};

export const isUserExistDB = async (username: string) => {
  const user = await getUserByUsernameDB(username);

  return user !== null;
};

export const addUserDB = async (user: {
  username: string;
  password: string;
}) => {
  const isExist = await isUserExistDB(user.username);

  if (isExist) throw new Error("User already exist.");

  const salt = bcryptjs.genSaltSync(10);
  const hashPassword = bcryptjs.hashSync(user.password, salt);
  user.password = hashPassword;

  const users = db.collection("users");
  const userDB = await users.add(user);

  const res = {
    ...user,
    id: userDB.id,
    password: hashPassword,
  };
  return res;
};

export const deleteUserDB = async (userId: string) => {
  const users = db.collection("users");
  await users.doc(userId).delete();
  return userId;
};
