import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

export default async function addData(
  collection: string,
  file: string,
  data: any
) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, collection, file), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function updateData(collection: string, file: string, data: any) {
  let result = null;
  let error = null;

  try {
    result = await updateDoc(doc(db, collection, file), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}