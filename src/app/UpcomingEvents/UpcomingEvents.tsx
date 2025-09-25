'use client';
import Image from "next/image";
import Countdown from "../components/Countdown";
import styles from "./UpcomingEvents.module.css";
import {  MyEvent } from "../page";

type Props = {
  events: MyEvent[];
};

export default function UpcomingEvents({ events }: Props) {
  if (!events.length) return <p>Loading upcoming events...</p>;

  return (
    <section className={styles.eventsSection}>
      <h2>Upcoming Events</h2>
      <div className={styles.eventsGrid}>
        {events.map((event) => (
          <article key={event.id} className={styles.eventCard}>
            <Image src={event.image} alt={event.title} width={400} height={250} />
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>
              <strong>Starts:</strong> {new Date(event.date).toLocaleString()}
            </p>
            {/* Countdown runs client-side */}
            <Countdown date={event.date} />
          </article>
        ))}
      </div>
    </section>
  );
}