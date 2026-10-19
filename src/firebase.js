import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import {
  getFirestore, doc, getDoc, setDoc, collection,
  getDocs, deleteDoc, writeBatch,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAOOCGUYXmvGv-pOPt5e8l1ZXGZ6C89c74",
  authDomain: "gainss-fitness-tracker.firebaseapp.com",
  projectId: "gainss-fitness-tracker",
  storageBucket: "gainss-fitness-tracker.firebasestorage.app",
  messagingSenderId: "877231769347",
  appId: "1:877231769347:web:ac1f4c0db674af222a8b36",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

// ── Auth ─────────────────────────────────────────────────────────────────────

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)
export const signOutUser = () => signOut(auth)

// ── Firestore helpers ────────────────────────────────────────────────────────
// Data layout:
//   users/{uid}/entries/{date}   → one document per fitness entry (keyed by date)
//   users/{uid}/meta/profile     → { unitSystem, customSupplements }

const entriesCol = (uid) => collection(db, "users", uid, "entries")
const metaDoc    = (uid) => doc(db, "users", uid, "meta", "profile")

/** Load all entries for a user, sorted descending by date. */
export async function loadEntries(uid) {
  const snap = await getDocs(entriesCol(uid))
  const entries = snap.docs.map((d) => d.data())
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date))
}

/** Save (upsert) a single entry. The date string is the document ID. */
export async function saveEntry(uid, entry) {
  await setDoc(doc(db, "users", uid, "entries", entry.date), entry)
}

/** Delete a single entry by date. */
export async function deleteEntry(uid, date) {
  await deleteDoc(doc(db, "users", uid, "entries", date))
}

/** Replace ALL entries at once (used for import / clear). */
export async function replaceAllEntries(uid, entries) {
  const col = entriesCol(uid)
  // Delete existing
  const snap = await getDocs(col)
  const batch = writeBatch(db)
  snap.docs.forEach((d) => batch.delete(d.ref))
  // Write new
  entries.forEach((e) => batch.set(doc(col, e.date), e))
  await batch.commit()
}

/** Load user profile (unitSystem, customSupplements). */
export async function loadProfile(uid) {
  const snap = await getDoc(metaDoc(uid))
  return snap.exists() ? snap.data() : null
}

/** Save user profile. */
export async function saveProfile(uid, profile) {
  await setDoc(metaDoc(uid), profile, { merge: true })
}

// ── Workout plans & custom workouts ─────────────────────────────────────────

const workoutPlansDoc  = (uid) => doc(db, "users", uid, "meta", "workoutPlans")
const customWorkoutsDoc = (uid) => doc(db, "users", uid, "meta", "customWorkouts")

export async function loadWorkoutPlans(uid) {
  const snap = await getDoc(workoutPlansDoc(uid))
  return snap.exists() ? (snap.data().plans || []) : null
}

export async function saveWorkoutPlans(uid, plans) {
  await setDoc(workoutPlansDoc(uid), { plans })
}

export async function loadCustomWorkouts(uid) {
  const snap = await getDoc(customWorkoutsDoc(uid))
  return snap.exists() ? (snap.data().workouts || []) : null
}

export async function saveCustomWorkouts(uid, workouts) {
  await setDoc(customWorkoutsDoc(uid), { workouts })
}
