import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

export async function getDocument(collection: string, company: string) {
  const docRef = doc(db, collection, company);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Documento encontrado!");
    
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}