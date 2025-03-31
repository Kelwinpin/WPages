import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./config";

export interface FirestoreDocument {
  id: string;
  [key: string]: any;
}

const db = getFirestore(app);

async function getAllDocuments(): Promise<FirestoreDocument[]> {
  const collectionName = "landing_pages";
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);

  if (snapshot.empty) {
    console.log("Nenhum documento encontrado.");
    return [];
  }

  const documents: FirestoreDocument[] = [];
  snapshot.forEach(doc => {
    documents.push({ id: doc.id, ...doc.data() });
  });

  return documents;
}

export default getAllDocuments;