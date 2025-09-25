// src/app/UpcomingEvents.tsx
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import Image from "next/image";
import styles from "./UpcomingEvents.module.css";
import Countdown from "../components/Countdown";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
};

// ✅ Server Component (SEO visible)
export default async function UpcomingEvents() {
  const snapshot = await getDocs(collection(db, "events"));
  const events: Event[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Event[];

  return (
    <section className={styles.eventsSection}>
      <h2>Upcoming Events</h2>
      <div className={styles.eventsGrid}>
        {events.map((event) => (
          <article key={event.id} className={styles.eventCard}>
            <Image
              src={event.image}
              alt={event.title}
              width={400}
              height={250}
            />
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>
              <strong>Starts:</strong>{" "}
              {new Date(event.date).toLocaleString()}
            </p>
            {/* Client-side countdown */}
            <Countdown date={event.date} />
          </article>
        ))}
      </div>
    </section>
  );
}