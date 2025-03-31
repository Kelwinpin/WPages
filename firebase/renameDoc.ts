import {
    deleteDoc,
    doc,
    getDoc,
    getFirestore,
    setDoc,
} from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

export async function renameDocument(collection: string, oldFileName: string) {
  let result = null;
  let error = null;

  try {
    const docRef = doc(db, collection, oldFileName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      await setDoc(doc(db, collection, `block_${oldFileName}`), data);
      await deleteDoc(doc(db, collection, oldFileName));
      result = { message: "Document renamed successfully" };
    } else {
      error = { message: "Document does not exist" };
    }
  } catch (e) {
    error = e;
  }
}