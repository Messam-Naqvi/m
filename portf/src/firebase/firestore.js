import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "./config";

// ---------- Categories ----------

export function subscribeToCategories(callback, onError) {
  const q = query(collection(db, "categories"), orderBy("order", "asc"));
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  );
}

export function addCategory(data) {
  return addDoc(collection(db, "categories"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export function updateCategory(id, data) {
  return updateDoc(doc(db, "categories", id), data);
}

export function deleteCategory(id) {
  return deleteDoc(doc(db, "categories", id));
}

// ---------- Resources ----------

// Public, real-time subscription to published resources, optionally scoped to a category.
export function subscribeToPublishedResources(categorySlug, callback, onError) {
  const clauses = [where("published", "==", true)];
  if (categorySlug) clauses.push(where("categorySlug", "==", categorySlug));
  const q = query(collection(db, "resources"), ...clauses, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  );
}

// Owner-only: every resource (published + drafts), for the admin dashboard.
export function subscribeToAllResources(callback, onError) {
  const q = query(collection(db, "resources"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  );
}

export function addResource(data) {
  return addDoc(collection(db, "resources"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export function updateResource(id, data) {
  return updateDoc(doc(db, "resources", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export function deleteResource(id) {
  return deleteDoc(doc(db, "resources", id));
}

// ---------- Messages (contact form) ----------

export function submitMessage({ name, email, message }) {
  return addDoc(collection(db, "messages"), {
    name,
    email,
    message,
    read: false,
    createdAt: serverTimestamp(),
  });
}

export function subscribeToMessages(callback, onError) {
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  );
}

export function markMessageRead(id, read = true) {
  return updateDoc(doc(db, "messages", id), { read });
}

export function deleteMessage(id) {
  return deleteDoc(doc(db, "messages", id));
}

// ---------- Aggregation helper (used by analytics) ----------

export async function countCollection(collectionRef) {
  const snapshot = await getCountFromServer(collectionRef);
  return snapshot.data().count;
}
