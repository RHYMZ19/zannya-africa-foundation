// src/app/UpcomingEvents.tsx
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import Image from "next/image";
import styles from "./UpcomingEvents.module.css";
import Countdown from "../components/Countdown";
import { UpcomingEvent } from "./types";

export default async function UpcomingEvents() {
  const snapshot = await getDocs(collection(db, "events"));
  const events: UpcomingEvent[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<UpcomingEvent, "id">),
  }));

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
              priority
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