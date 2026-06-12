import { collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { Brand, ContentIdea } from "../types";

// Types
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Brands API
export const brandsRef = collection(db, "brands");

export async function getBrands(ownerId: string): Promise<Brand[]> {
  try {
    const q = query(brandsRef, where("ownerId", "==", ownerId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Brand));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, "brands");
    return [];
  }
}

export async function createBrand(brand: Omit<Brand, "id">): Promise<string> {
  try {
    const newDocRef = doc(brandsRef);
    await setDoc(newDocRef, brand);
    return newDocRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, "brands");
    return "";
  }
}
