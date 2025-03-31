import {
    deleteDoc,
    doc,
    getDoc,
    getFirestore,
    setDoc,
} from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

export async function reactivateDocument(
  collection: string,
  oldFileName: string
) {
  let result = null;
  let error = null;

  try {
    const docRef = doc(db, collection, `block_${oldFileName}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      await setDoc(doc(db, collection, oldFileName), data);
      await deleteDoc(doc(db, collection, `block_${oldFileName}`));
      result = { message: "Document renamed successfully" };
    } else {
      error = { message: "Document does not exist" };
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
}