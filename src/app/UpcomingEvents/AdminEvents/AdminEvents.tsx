"use client";

import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

type MyEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
};


export default function AdminEvents() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [events, setEvents] = useState<MyEvent[]>([]);


  const fetchEvents = async () => {
    const snapshot = await getDocs(collection(db, "events"));
    setEvents(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<MyEvent, "id">) })));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = async () => {
    if (!title || !date) return alert("Title and date required");
    await addDoc(collection(db, "events"), {
      title,
      description: desc,
      date,
      image,
    });
    setTitle("");
    setDesc("");
    setDate("");
    setImage("");
    fetchEvents();
  };

  const deleteEvent = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
    fetchEvents();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Manage Upcoming Events</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addEvent();
        }}
        style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}
      >
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <button type="submit">Add Event</button>
      </form>

      <h3>Existing Events</h3>
      <ul>
        {events.map((ev) => (
          <li key={ev.id}>
            {ev.title} — {new Date(ev.date).toLocaleString()}
            <button onClick={() => deleteEvent(ev.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}