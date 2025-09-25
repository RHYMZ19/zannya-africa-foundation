'use client';

import Image from "next/image";
import Countdown from "../components/Countdown";
import styles from "./UpcomingEvents.module.css";
import { MyEvent } from '../lib/events';
import { useEvents } from "../lib/useEvents";

type Props = {
  events: MyEvent[];
};

export default function UpcomingEvents({ events: serverEvents }: Props) {
  const liveEvents = useEvents(); // live Firestore updates
  const eventsToShow = liveEvents.length > 0 ? liveEvents : serverEvents;
  
  if (!eventsToShow.length) return <p className={styles.loading}>Loading upcoming events...</p>;

  return (
    <section className={styles.eventsSection}>
  <h2>Upcoming Events</h2>
  <div className={styles.eventsScrollWrapper}>
    {eventsToShow.map((event) => (
      <div key={event.id} className={styles.card}>
        {event.image && (
          <Image
            src={event.image}
            alt={event.title}
            width={400}
            height={220}
            className={styles.cardImage}
          />
        )}
        <div className={styles.cardContent}>
          <span className={styles.eventType}>Upcoming Event</span>
          <h3 className={styles.headings}>{event.title}</h3>
          <p className={styles.description}>{event.description}</p>
          <p className={styles.eventDate}>
            <strong>Starts:</strong> {new Date(event.date).toLocaleString()}
          </p>
          <Countdown date={event.date} />
        </div>
      </div>
    ))}
  </div>
</section>
  );
}