import { Task, TaskPriority, TaskStatus } from "@/types/Task";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase/index";

export async function addDocument(col: string, obj: Task) {
  try {
    const { id, ...objWithoutId } = obj;
    const collectionRef = collection(db, col);
    const docRef = await addDoc(collectionRef, objWithoutId);

    return docRef.id;
  } catch (e) {
    throw e;
  }
}

export async function updateDocument(col: string, obj: Task) {
  try {
    const docRef = doc(db, col, obj.id);
    await updateDoc(docRef, { ...obj });
    return docRef.id;
  } catch (e) {
    throw e;
  }
}

export async function deleteDocument(col: string, objId: string) {
  try {
    const docRef = doc(db, col, objId);
    await deleteDoc(docRef);
  } catch (e) {
    throw e;
  }
}

export async function getDocuments(col: string, uid: string): Promise<Task[]> {
  try {
    const collectionRef = collection(db, col);
    // const q = query(collectionRef, where("uid", "==", uid));

    const docsSnap = await getDocs(collectionRef);

    return docsSnap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title as string,
        status: data.status as TaskStatus,
        priority: data.priority as TaskPriority,
        inicialDate: data.inicialDate.toDate(),
        days: data.days as string[],
        description: data.description as string,
      } as Task;
    });
  } catch (e) {
    console.log(e);
    return [];
  }
}
