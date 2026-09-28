import {
  doc,
  collection,
  setDoc,
  increment,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import { countCollection } from "./firestore";

const VISITOR_ID_KEY = "portf_visitor_id";
const SESSION_FLAG_KEY = "portf_visit_recorded";

function getVisitorId() {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    // localStorage unavailable (private mode, etc.) — fall back to a per-tab id.
    return crypto.randomUUID();
  }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

// Records at most one visit per tab session: increments the day's total,
// and marks this device as a distinct visitor for the day. No Cloud Functions
// involved, so this stays entirely on the free Firestore tier.
export async function recordVisit() {
  try {
    if (sessionStorage.getItem(SESSION_FLAG_KEY)) return;
  } catch {
    // sessionStorage unavailable — proceed anyway, worst case double counts.
  }

  const visitorId = getVisitorId();
  const dayRef = doc(db, "analytics", todayKey());

  try {
    // Atomic increment via merge — no prior read needed, which matters
    // because visitors only have create/update rights on this doc, not read.
    await setDoc(dayRef, { totalVisits: increment(1) }, { merge: true });

    const visitorRef = doc(db, "analytics", todayKey(), "visitors", visitorId);
    await setDoc(visitorRef, { firstSeen: serverTimestamp() }, { merge: true });

    sessionStorage.setItem(SESSION_FLAG_KEY, "1");
  } catch (err) {
    // Analytics failures should never break the site for visitors.
    console.warn("Analytics recording skipped:", err.message);
  }
}

// Owner-only: pulls the last N days of totals + distinct-visitor counts for the admin panel.
// One read for all day totals, plus one cheap count() aggregation per day that has data.
export async function getAnalyticsSummary(days = 14) {
  const now = new Date();
  const keys = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    keys.push(d.toISOString().slice(0, 10));
  }

  let totalsByDay = {};
  try {
    const daySnaps = await getDocs(collection(db, "analytics"));
    daySnaps.forEach((d) => {
      totalsByDay[d.id] = d.data()?.totalVisits || 0;
    });
  } catch {
    // No analytics data yet, or Firebase not configured locally.
  }

  return Promise.all(
    keys.map(async (key) => {
      const totalVisits = totalsByDay[key] || 0;
      let distinctVisitors = 0;
      if (totalVisits > 0) {
        distinctVisitors = await countCollection(
          collection(db, "analytics", key, "visitors")
        ).catch(() => 0);
      }
      return { date: key, totalVisits, distinctVisitors };
    })
  );
}
