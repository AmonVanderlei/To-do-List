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
    // Get tasks from db
    const collectionRef = collection(db, col);
    const q = query(collectionRef, where("uid", "==", uid));
    const docsSnap = await getDocs(q);

    // Get last update from db
    const updatesSnap = await getDocs(
      query(collection(db, "updates"), where("uid", "==", uid))
    );
    const update = updatesSnap.docs[0];
    const lastUpdate = update ? update.data().lastUpdate.toDate() : null;

    // Get the current time
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    let allTasks: Task[] = [];

    if (!lastUpdate || lastUpdate < currentDate) {
      // Get all tasks and update completed ones
      const updatePromises = docsSnap.docs.map(async (doc) => {
        const data = doc.data();
        const task: Task = {
          id: doc.id,
          title: data.title as string,
          status: "To-do",
          priority: data.priority as TaskPriority,
          inicialDate: data.inicialDate.toDate(),
          days: data.days as string[],
          description: data.description as string,
          uid: data.uid,
        };

        if (data.status === "Completed") {
          await updateDoc(doc.ref, { status: "To-do" });
        }

        return task;
      });

      allTasks = await Promise.all(updatePromises);
    } else {
      // Get all the tasks as they are
      allTasks = docsSnap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title as string,
          status: data.status as TaskStatus,
          priority: data.priority as TaskPriority,
          inicialDate: data.inicialDate.toDate(),
          days: data.days as string[],
          description: data.description as string,
          uid: data.uid,
        } as Task;
      });
    }

    // Create/Update lastUpdate
    if (update) {
      await updateDoc(update.ref, { lastUpdate: currentDate });
    } else {
      await addDoc(collection(db, "updates"), {
        lastUpdate: currentDate,
        uid: uid,
      });
    }

    return allTasks;
  } catch (e) {
    return [];
  }
}
