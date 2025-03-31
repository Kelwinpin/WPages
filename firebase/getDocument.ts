import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "./config";
import { ILandingPage } from "@/tools/interfaces/ILandingPage";

const db = getFirestore(app);

export async function getDocument(collection: string, company: string) {
  const docRef = doc(db, collection, company);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as ILandingPage;
  } else {
    console.log("No such document!");
  }
}