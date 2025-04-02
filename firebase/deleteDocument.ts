import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

export default async function deleteDocument(collection: string, documentId: string) {
    let result = null;
    let error = null;

    try {
        await deleteDoc(doc(db, collection, documentId));
        result = { message: "Document deleted successfully" };
    } catch (e) {
        error = e;
    }

    return { result, error };
}
