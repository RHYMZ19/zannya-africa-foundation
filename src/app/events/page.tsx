"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../lib/firebase";
import styles from "./EventsListing.module.css";

type Event = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  bannerImage: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  location: string;
  status: string;
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "events")
        );

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const fetchedEvents: Event[] = snapshot.docs
          .map((eventDoc) => {
            const data = eventDoc.data();

            return {
              id: eventDoc.id,
              title: data.title || "",
              slug: data.slug || "",
              summary: data.summary || "",
              category: data.category || "Event",
              bannerImage: data.bannerImage || "",
              date: data.date || "",
              startTime: data.startTime || "",
              endTime: data.endTime || "",
              venue: data.venue || "",
              location: data.location || "",
              status: data.status || "draft",
            };
          })
          .filter((event) => {
            if (event.status !== "published") {
              return false;
            }

            if (!event.date) {
              return false;
            }

            const eventDate = new Date(
              `${event.date}T00:00:00`
            );

            return eventDate >= today;
          })
          .sort(
            (a, b) =>
              new Date(`${a.date}T00:00:00`).getTime() -
              new Date(`${b.date}T00:00:00`).getTime()
          );

        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className={styles.page}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          Zannya Africa Foundation
        </Link>

        <div className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/missions">Missions</Link>
          <Link href="/newss">Articles</Link>
          <Link href="/events">Events</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/donate">Donate</Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span>WHAT'S HAPPENING</span>

          <h1>Upcoming Events</h1>

          <p>
            Discover upcoming activities, programs and
            community events from Zannya Africa Foundation.
          </p>
        </div>
      </section>

      <section className={styles.eventsSection}>
        <div className={styles.sectionHeader}>
          <span>JOIN US</span>

          <h2>Upcoming Events</h2>

          <p>
            Be part of our activities and help us create
            meaningful change through sports, health and
            environmental action.
          </p>
        </div>

        {loading ? (
          <div className={styles.loading}>
            Loading upcoming events...
          </div>
        ) : events.length === 0 ? (
          <div className={styles.empty}>
            <h3>No upcoming events</h3>

            <p>
              There are currently no upcoming events.
              Please check back soon.
            </p>
          </div>
        ) : (
          <div className={styles.eventsGrid}>
            {events.map((event) => (
              <article
                key={event.id}
                className={styles.eventCard}
              >
                <div className={styles.imageWrapper}>
                  {event.bannerImage ? (
                    <img
                      src={event.bannerImage}
                      alt={event.title}
                      className={styles.eventImage}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      ZAF EVENT
                    </div>
                  )}

                  <span className={styles.category}>
                    {event.category}
                  </span>
                </div>

                <div className={styles.eventContent}>
                  <div className={styles.eventDate}>
                    {formatDate(event.date)}
                  </div>

                  <h3>{event.title}</h3>

                  <p className={styles.summary}>
                    {event.summary}
                  </p>

                  <div className={styles.eventDetails}>
                    <div>
                      <strong>Time</strong>
                      <span>
                        {event.startTime}
                        {event.endTime
                          ? ` - ${event.endTime}`
                          : ""}
                      </span>
                    </div>

                    <div>
                      <strong>Venue</strong>
                      <span>{event.venue}</span>
                    </div>

                    <div>
                      <strong>Location</strong>
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <Link
                    href={`/events/${event.slug}`}
                    className={styles.readMore}
                  >
                    View Event
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        <div>
          <h3>Zannya Africa Foundation</h3>

          <p>
            Changing communities through sports.
          </p>
        </div>

        <div className={styles.footerLinks}>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </footer>
    </main>
  );
}