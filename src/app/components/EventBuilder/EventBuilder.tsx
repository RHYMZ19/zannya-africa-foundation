"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../lib/firebase";
import CloudinaryUploader from "../../CloudinaryUploader";
import styles from "./EventBuilder.module.css";

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
  registrationUrl: string;
  registrationDeadline: string;
  contactEmail: string;
  contactPhone: string;
  content: ContentBlock[];
  status: "draft" | "published";
  createdAt?: any;
  updatedAt?: any;
};

const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
};

export default function EventBuilder() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("Event");
  const [bannerImage, setBannerImage] = useState("");

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [venue, setVenue] = useState("");
  const [location, setLocation] = useState("");

  const [registrationUrl, setRegistrationUrl] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");

  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [content, setContent] = useState<ContentBlock[]>([]);

  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [activeEditor, setActiveEditor] = useState<string | null>(null);

  const addParagraph = () => {
    const block: ContentBlock = {
      id: crypto.randomUUID(),
      type: "paragraph",
      text: "",
    };

    setContent((prev) => [...prev, block]);
    setActiveEditor(block.id);
  };

  const addHeading = () => {
    const block: ContentBlock = {
      id: crypto.randomUUID(),
      type: "heading",
      text: "",
    };

    setContent((prev) => [...prev, block]);
    setActiveEditor(block.id);
  };

  const addImage = () => {
    const block: ContentBlock = {
      id: crypto.randomUUID(),
      type: "image",
      url: "",
      caption: "",
    };

    setContent((prev) => [...prev, block]);
    setActiveEditor(block.id);
  };

  const addQuote = () => {
    const block: ContentBlock = {
      id: crypto.randomUUID(),
      type: "quote",
      text: "",
      author: "",
    };

    setContent((prev) => [...prev, block]);
    setActiveEditor(block.id);
  };

  const addStatistic = () => {
    const block: ContentBlock = {
      id: crypto.randomUUID(),
      type: "statistic",
      value: "",
      label: "",
    };

    setContent((prev) => [...prev, block]);
    setActiveEditor(block.id);
  };

  const addDivider = () => {
    const block: ContentBlock = {
      id: crypto.randomUUID(),
      type: "divider",
    };

    setContent((prev) => [...prev, block]);
  };

  const deleteBlock = (id: string) => {
    setContent((prev) => prev.filter((block) => block.id !== id));

    if (activeEditor === id) {
      setActiveEditor(null);
    }
  };

  const moveBlock = (id: string, direction: "up" | "down") => {
    setContent((prev) => {
      const index = prev.findIndex((block) => block.id === id);

      if (index === -1) {
        return prev;
      }

      const newIndex = direction === "up" ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex >= prev.length) {
        return prev;
      }

      const updated = [...prev];

      [updated[index], updated[newIndex]] = [
        updated[newIndex],
        updated[index],
      ];

      return updated;
    });
  };

  const updateBlock = (
    id: string,
    updates: Partial<ContentBlock>
  ) => {
    setContent((prev) =>
      prev.map((block) =>
        block.id === id
          ? ({ ...block, ...updates } as ContentBlock)
          : block
      )
    );
  };

  const resetForm = () => {
    setTitle("");
    setSummary("");
    setCategory("Event");
    setBannerImage("");

    setDate("");
    setStartTime("");
    setEndTime("");

    setVenue("");
    setLocation("");

    setRegistrationUrl("");
    setRegistrationDeadline("");

    setContactEmail("");
    setContactPhone("");

    setContent([]);
    setEditingId(null);
    setActiveEditor(null);
  };

  const fetchEvents = async () => {
    try {
      setLoadingEvents(true);

      const eventsQuery = query(
        collection(db, "events"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(eventsQuery);

      const fetchedEvents: Event[] = snapshot.docs.map((eventDoc) => {
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
          registrationUrl: data.registrationUrl || "",
          registrationDeadline: data.registrationDeadline || "",
          contactEmail: data.contactEmail || "",
          contactPhone: data.contactPhone || "",
          content: data.content || [],
          status: data.status || "draft",
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };
      });

      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const validateForm = () => {
    if (!title.trim()) {
      alert("Please enter the event title.");
      return false;
    }

    if (!summary.trim()) {
      alert("Please enter a short event summary.");
      return false;
    }

    if (!bannerImage) {
      alert("Please upload an event banner image.");
      return false;
    }

    if (!date) {
      alert("Please select the event date.");
      return false;
    }

    if (!startTime) {
      alert("Please enter the event start time.");
      return false;
    }

    if (!venue.trim()) {
      alert("Please enter the event venue.");
      return false;
    }

    if (!location.trim()) {
      alert("Please enter the event location.");
      return false;
    }

    return true;
  };

  const saveEvent = async (
    status: "draft" | "published"
  ) => {
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const slug = createSlug(title);

      const eventData = {
        title: title.trim(),
        slug,
        summary: summary.trim(),
        category: category.trim(),

        bannerImage,

        date,
        startTime,
        endTime,

        venue: venue.trim(),
        location: location.trim(),

        registrationUrl: registrationUrl.trim(),
        registrationDeadline,

        contactEmail: contactEmail.trim(),
        contactPhone: contactPhone.trim(),

        content,

        status,

        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(
          doc(db, "events", editingId),
          eventData
        );

        alert(
          status === "published"
            ? "Event updated and published successfully."
            : "Event updated and saved as draft."
        );
      } else {
        await addDoc(collection(db, "events"), {
          ...eventData,
          createdAt: serverTimestamp(),
        });

        alert(
          status === "published"
            ? "Event published successfully."
            : "Event saved as draft."
        );
      }

      resetForm();
      await fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("There was an error saving the event.");
    } finally {
      setSaving(false);
    }
  };

  const editEvent = (event: Event) => {
    setEditingId(event.id);

    setTitle(event.title);
    setSummary(event.summary);
    setCategory(event.category);
    setBannerImage(event.bannerImage);

    setDate(event.date);
    setStartTime(event.startTime);
    setEndTime(event.endTime);

    setVenue(event.venue);
    setLocation(event.location);

    setRegistrationUrl(event.registrationUrl);
    setRegistrationDeadline(event.registrationDeadline);

    setContactEmail(event.contactEmail);
    setContactPhone(event.contactPhone);

    setContent(event.content || []);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteEvent = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(doc(db, "events", id));

      alert("Event deleted successfully.");

      await fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("There was an error deleting the event.");
    }
  };

  const togglePublish = async (event: Event) => {
    try {
      const newStatus =
        event.status === "published"
          ? "draft"
          : "published";

      await updateDoc(doc(db, "events", event.id), {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });

      await fetchEvents();
    } catch (error) {
      console.error("Error changing event status:", error);
      alert("There was an error changing the event status.");
    }
  };

  return (
    <div className={styles.builder}>
      <div className={styles.header}>
        <div>
          <h1>
            {editingId ? "Edit Event" : "Create Event"}
          </h1>

          <p>
            Create and manage upcoming Zannya Africa
            Foundation events.
          </p>
        </div>

        {editingId && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={resetForm}
          >
            Cancel Editing
          </button>
        )}
      </div>

      <section className={styles.section}>
        <h2>Event Information</h2>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Event Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. EcoFit Camp Edition 3"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Category</label>

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Sports, Climate, SRHR..."
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Short Summary</label>

          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Briefly describe the event..."
            rows={4}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2>Event Banner</h2>

        <CloudinaryUploader
          folder="zannya/events/banners"
          category="event-banner"
           onUploadComplete={(url: string) => setBannerImage(url)}
        />

        {bannerImage && (
          <div className={styles.uploadedImage}>
            <img
              src={bannerImage}
              alt="Event banner"
            />

            <button
              type="button"
              onClick={() => setBannerImage("")}
            >
              Remove Image
            </button>
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2>Date & Time</h2>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Event Date</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Start Time</label>

            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>End Time</label>

            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Location</h2>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Venue</label>

            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g. Kisubi Beach"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Location</label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Kisubi, Wakiso"
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Registration</h2>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Registration URL</label>

            <input
              type="url"
              value={registrationUrl}
              onChange={(e) =>
                setRegistrationUrl(e.target.value)
              }
              placeholder="https://..."
            />
          </div>

          <div className={styles.formGroup}>
            <label>Registration Deadline</label>

            <input
              type="date"
              value={registrationDeadline}
              onChange={(e) =>
                setRegistrationDeadline(e.target.value)
              }
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Contact Information</h2>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Contact Email</label>

            <input
              type="email"
              value={contactEmail}
              onChange={(e) =>
                setContactEmail(e.target.value)
              }
              placeholder="info@example.org"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Contact Phone</label>

            <input
              type="tel"
              value={contactPhone}
              onChange={(e) =>
                setContactPhone(e.target.value)
              }
              placeholder="+256..."
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.contentHeader}>
          <div>
            <h2>Event Content</h2>

            <p>
              Build the full event description using
              content blocks.
            </p>
          </div>

          <div className={styles.blockButtons}>
            <button type="button" onClick={addParagraph}>
              + Paragraph
            </button>

            <button type="button" onClick={addHeading}>
              + Heading
            </button>

            <button type="button" onClick={addImage}>
              + Image
            </button>

            <button type="button" onClick={addQuote}>
              + Quote
            </button>

            <button type="button" onClick={addStatistic}>
              + Statistic
            </button>

            <button type="button" onClick={addDivider}>
              + Divider
            </button>
          </div>
        </div>

        <div className={styles.contentBlocks}>
          {content.length === 0 && (
            <div className={styles.emptyContent}>
              No content blocks added yet.
            </div>
          )}

          {content.map((block, index) => (
            <div
              key={block.id}
              className={styles.contentBlock}
            >
              <div className={styles.blockTop}>
                <strong>
                  {index + 1}.{" "}
                  {block.type.charAt(0).toUpperCase() +
                    block.type.slice(1)}
                </strong>

                <div className={styles.blockActions}>
                  <button
                    type="button"
                    onClick={() =>
                      moveBlock(block.id, "up")
                    }
                    disabled={index === 0}
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      moveBlock(block.id, "down")
                    }
                    disabled={index === content.length - 1}
                  >
                    ↓
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveEditor(
                        activeEditor === block.id
                          ? null
                          : block.id
                      )
                    }
                  >
                    {activeEditor === block.id
                      ? "Close"
                      : "Edit"}
                  </button>

                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() =>
                      deleteBlock(block.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>

              {activeEditor === block.id && (
                <div className={styles.blockEditor}>
                  {block.type === "paragraph" && (
                    <textarea
                      value={block.text}
                      onChange={(e) =>
                        updateBlock(block.id, {
                          text: e.target.value,
                        })
                      }
                      placeholder="Write event information..."
                      rows={6}
                    />
                  )}

                  {block.type === "heading" && (
                    <input
                      type="text"
                      value={block.text}
                      onChange={(e) =>
                        updateBlock(block.id, {
                          text: e.target.value,
                        })
                      }
                      placeholder="Heading"
                    />
                  )}

                  {block.type === "image" && (
                    <>
                      <CloudinaryUploader
                        folder="zannya/events/content"
                        category="event-content"
                         onUploadComplete={(url: string) =>
                          updateBlock(block.id, {
                            url,
                          })
                        }
                      />

                      <input
                        type="text"
                        value={block.caption || ""}
                        onChange={(e) =>
                          updateBlock(block.id, {
                            caption: e.target.value,
                          })
                        }
                        placeholder="Image caption (optional)"
                      />

                      {block.url && (
                        <img
                          src={block.url}
                          alt={
                            block.caption ||
                            "Event content"
                          }
                          className={styles.contentImage}
                        />
                      )}
                    </>
                  )}

                  {block.type === "quote" && (
                    <>
                      <textarea
                        value={block.text}
                        onChange={(e) =>
                          updateBlock(block.id, {
                            text: e.target.value,
                          })
                        }
                        placeholder="Quote..."
                        rows={4}
                      />

                      <input
                        type="text"
                        value={block.author || ""}
                        onChange={(e) =>
                          updateBlock(block.id, {
                            author: e.target.value,
                          })
                        }
                        placeholder="Quote author (optional)"
                      />
                    </>
                  )}

                  {block.type === "statistic" && (
                    <div className={styles.formGrid}>
                      <input
                        type="text"
                        value={block.value}
                        onChange={(e) =>
                          updateBlock(block.id, {
                            value: e.target.value,
                          })
                        }
                        placeholder="Value e.g. 500+"
                      />

                      <input
                        type="text"
                        value={block.label}
                        onChange={(e) =>
                          updateBlock(block.id, {
                            label: e.target.value,
                          })
                        }
                        placeholder="Label e.g. Participants"
                      />
                    </div>
                  )}

                  {block.type === "divider" && (
                    <p>
                      A divider will appear between
                      sections of the event.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className={styles.publishActions}>
        <button
          type="button"
          className={styles.draftButton}
          onClick={() => saveEvent("draft")}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Draft"}
        </button>

        <button
          type="button"
          className={styles.publishButton}
          onClick={() => saveEvent("published")}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : editingId
            ? "Update & Publish"
            : "Publish Event"}
        </button>
      </div>

      <section className={styles.section}>
        <div className={styles.existingHeader}>
          <div>
            <h2>Existing Events</h2>

            <p>
              Manage events already created in the
              system.
            </p>
          </div>
        </div>

        {loadingEvents ? (
          <div className={styles.loading}>
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className={styles.emptyContent}>
            No events have been created yet.
          </div>
        ) : (
          <div className={styles.eventsList}>
            {events.map((event) => (
              <div
                key={event.id}
                className={styles.eventItem}
              >
                <div className={styles.eventItemImage}>
                  {event.bannerImage && (
                    <img
                      src={event.bannerImage}
                      alt={event.title}
                    />
                  )}
                </div>

                <div className={styles.eventItemInfo}>
                  <h3>{event.title}</h3>

                  <p>
                    {event.date} • {event.venue}
                  </p>

                  <span
                    className={
                      event.status === "published"
                        ? styles.published
                        : styles.draft
                    }
                  >
                    {event.status}
                  </span>
                </div>

                <div className={styles.eventItemActions}>
                  <button
                    type="button"
                    onClick={() => editEvent(event)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      togglePublish(event)
                    }
                  >
                    {event.status === "published"
                      ? "Unpublish"
                      : "Publish"}
                  </button>

                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() =>
                      deleteEvent(event.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}