'use client';

import Image from "next/image";
import Countdown from "../components/Countdown";
import styles from "./UpcomingEvents.module.css";
import { MyEvent } from '../lib/events';
import { useEvents } from "../lib/useEvents";
import { useRef } from "react";

type Props = {
  events: MyEvent[];
};

export default function UpcomingEvents({ events: serverEvents }: Props) {
  const liveEvents = useEvents(); // live Firestore updates
  const eventsToShow = liveEvents.length > 0 ? liveEvents : serverEvents;

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth; // scroll by visible width
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  if (!eventsToShow.length) return <p className={styles.loading}>Loading upcoming events...</p>;

  return (
    <section className={styles.eventsSection}>
  <h2>Upcoming Events</h2>

  

      <div className={styles.eventsScrollContainer}>
    {/* Left button */}
    <button className={styles.scrollLeft} onClick={() => scroll('left')}>◀</button>

  <div className={styles.eventsScrollWrapper} ref={scrollRef}>
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
  {/* Right button */}
    <button className={styles.scrollRight} onClick={() => scroll('right')}>▶</button>
  </div>
</section>
  );
}