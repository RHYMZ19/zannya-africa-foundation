import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { notFound } from "next/navigation";
import Link from "next/link";

import { db } from "../../lib/firebase";
import styles from "./EventDetails.module.css";

type ContentBlock =
  | {
      id: string;
      type: "paragraph";
      text: string;
    }
  | {
      id: string;
      type: "heading";
      text: string;
    }
  | {
      id: string;
      type: "image";
      url: string;
      caption?: string;
    }
  | {
      id: string;
      type: "quote";
      text: string;
      author?: string;
    }
  | {
      id: string;
      type: "statistic";
      value: string;
      label: string;
    }
  | {
      id: string;
      type: "divider";
    };

type Event = {
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

  registrationUrl: string;
  registrationDeadline: string;

  contactEmail: string;
  contactPhone: string;

  content: ContentBlock[];
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

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ eventSlug: string }>;
}) {
  const { eventSlug } = await params;

  const eventsQuery = query(
    collection(db, "events"),
    where("slug", "==", eventSlug),
    where("status", "==", "published"),
    limit(1)
  );

  const snapshot = await getDocs(eventsQuery);

  if (snapshot.empty) {
    notFound();
  }

  const eventDoc = snapshot.docs[0];
  const data = eventDoc.data();

  const event: Event = {
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

    registrationUrl: data.registrationUrl || "",
    registrationDeadline:
      data.registrationDeadline || "",

    contactEmail: data.contactEmail || "",
    contactPhone: data.contactPhone || "",

    content: data.content || [],
  };

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
        {event.bannerImage && (
          <img
            src={event.bannerImage}
            alt={event.title}
            className={styles.heroImage}
          />
        )}

        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContent}>
          <span className={styles.category}>
            {event.category}
          </span>

          <div className={styles.date}>
            {formatDate(event.date)}
          </div>

          <h1>{event.title}</h1>

          <p>{event.summary}</p>
        </div>
      </section>

      <section className={styles.eventInfo}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <span>DATE</span>
            <strong>{formatDate(event.date)}</strong>
          </div>

          <div className={styles.infoCard}>
            <span>TIME</span>
            <strong>
              {event.startTime}
              {event.endTime
                ? ` - ${event.endTime}`
                : ""}
            </strong>
          </div>

          <div className={styles.infoCard}>
            <span>VENUE</span>
            <strong>{event.venue}</strong>
          </div>

          <div className={styles.infoCard}>
            <span>LOCATION</span>
            <strong>{event.location}</strong>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.content}>
          {event.content.map((block) => {
            if (block.type === "paragraph") {
              return (
                <p
                  key={block.id}
                  className={styles.paragraph}
                >
                  {block.text}
                </p>
              );
            }

            if (block.type === "heading") {
              return (
                <h2
                  key={block.id}
                  className={styles.heading}
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "image") {
              return (
                <figure
                  key={block.id}
                  className={styles.contentImageWrapper}
                >
                  <img
                    src={block.url}
                    alt={block.caption || event.title}
                    className={styles.contentImage}
                  />

                  {block.caption && (
                    <figcaption>
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            if (block.type === "quote") {
              return (
                <blockquote
                  key={block.id}
                  className={styles.quote}
                >
                  <p>“{block.text}”</p>

                  {block.author && (
                    <cite>— {block.author}</cite>
                  )}
                </blockquote>
              );
            }

            if (block.type === "statistic") {
              return (
                <div
                  key={block.id}
                  className={styles.statistic}
                >
                  <strong>{block.value}</strong>
                  <span>{block.label}</span>
                </div>
              );
            }

            if (block.type === "divider") {
              return (
                <hr
                  key={block.id}
                  className={styles.divider}
                />
              );
            }

            return null;
          })}
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.registrationCard}>
            <h2>Join This Event</h2>

            <p>
              Be part of this Zannya Africa Foundation
              event and join us in creating meaningful
              community impact.
            </p>

            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.registerButton}
              >
                Register Now
              </a>
            )}

            {event.registrationDeadline && (
              <div className={styles.deadline}>
                <strong>
                  Registration Deadline
                </strong>

                <span>
                  {formatDate(
                    event.registrationDeadline
                  )}
                </span>
              </div>
            )}
          </div>

          {(event.contactEmail ||
            event.contactPhone) && (
            <div className={styles.contactCard}>
              <h3>Need More Information?</h3>

              {event.contactEmail && (
                <a
                  href={`mailto:${event.contactEmail}`}
                >
                  {event.contactEmail}
                </a>
              )}

              {event.contactPhone && (
                <a
                  href={`tel:${event.contactPhone}`}
                >
                  {event.contactPhone}
                </a>
              )}
            </div>
          )}
        </aside>
      </section>

      <section className={styles.backSection}>
        <Link href="/events">
          ← Back to Upcoming Events
        </Link>
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