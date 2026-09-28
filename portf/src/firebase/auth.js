import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import app, { ADMIN_EMAIL } from "./config";

// The "firebase/auth" SDK is only ever imported here, and this module is
// only ever imported by the lazy-loaded admin area (see AdminArea.js) — so
// visitors who never open /admin never download Firebase Auth at all.
const auth = getAuth(app);

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOut() {
  return firebaseSignOut(auth);
}

export function subscribeToAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export function isOwner(user) {
  return Boolean(user && ADMIN_EMAIL && user.email === ADMIN_EMAIL);
}
