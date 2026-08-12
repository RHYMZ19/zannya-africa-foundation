"use client";

import { useState } from "react";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { firestore } from "../../lib/firebase";

import CloudinaryUploader from "../../CloudinaryUploader";

import styles from "./NewsBuilder.module.css";


export default function NewsBuilder() {

  /* =====================================================
     NEWS INFORMATION
  ===================================================== */

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");


  /* =====================================================
     BANNER IMAGE
  ===================================================== */

  const [bannerImage, setBannerImage] = useState("");


  /* =====================================================
     AUTHOR INFORMATION
  ===================================================== */

  const [authorName, setAuthorName] = useState("");

  const [authorRole, setAuthorRole] = useState("");

  const [authorImage, setAuthorImage] = useState("");


  /* =====================================================
   CREATE SLUG
===================================================== */

const createSlug = (text: string) => {

  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

};

/* =====================================================
   CREATE UNIQUE SLUG
===================================================== */

const createUniqueSlug = async (
  baseSlug: string
) => {

  let slug = baseSlug;

  let counter = 1;

  while (true) {

    const slugQuery = query(
      collection(firestore, "newsUpdates"),
      where("slug", "==", slug)
    );

    const snapshot = await getDocs(slugQuery);


    /* ================= SLUG AVAILABLE ================= */

    if (snapshot.empty) {

      return slug;

    }


    /* ================= SLUG ALREADY EXISTS ================= */

    counter++;

    slug = `${baseSlug}-${counter}`;

  }

};


  /* =====================================================
     PUBLISHING STATE
  ===================================================== */

  const [publishing, setPublishing] = useState(false);


  /* =====================================================
     PUBLISH NEWS
  ===================================================== */

  const publishNews = async () => {

    /* ================= VALIDATION ================= */

    if (!title.trim()) {

      alert("Please enter the news title.");

      return;

    }

    if (!slug.trim()) {

  alert("Please enter a valid news slug.");

  return;

}


    if (!category.trim()) {

      alert("Please enter the news category.");

      return;

    }


    if (!description.trim()) {

      alert("Please enter the news description.");

      return;

    }


    if (!bannerImage) {

      alert("Please upload the banner image.");

      return;

    }


    if (!authorName.trim()) {

      alert("Please enter the author name.");

      return;

    }


    if (!authorRole.trim()) {

      alert("Please enter the author role.");

      return;

    }


    /* ================= START PUBLISHING ================= */

    setPublishing(true);


    try {

  /* ================= CREATE UNIQUE SLUG ================= */

  const finalSlug = await createUniqueSlug(
    slug.trim()
  );


  /* ================= SAVE NEWS ================= */

  await addDoc(
    collection(firestore, "newsUpdates"),
    {

      title: title.trim(),

      slug: finalSlug,

      category: category.trim(),

      description: description.trim(),

      bannerImage: bannerImage,

      author: {

        name: authorName.trim(),

        role: authorRole.trim(),

        image: authorImage,

      },

      publishedAt: serverTimestamp(),

      status: "published",

    }
  );

      /* ================= SUCCESS ================= */

      alert("✅ News published successfully!");


      /* ================= RESET FORM ================= */

      setTitle("");

      setSlug("");


      setCategory("");

      setDescription("");

      setBannerImage("");

      setAuthorName("");

      setAuthorRole("");

      setAuthorImage("");


    } catch (error) {

      console.error(
        "Error publishing news:",
        error
      );

      alert(
        "❌ Failed to publish news. Please try again."
      );


    } finally {

      setPublishing(false);

    }

  };


  return (

    <main className={styles.page}>

      <div className={styles.container}>


        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className={styles.header}>

          <h1>
            News Builder
          </h1>

          <p>
            Create and publish professional news
            articles for the Zannya Africa Foundation
            website.
          </p>

        </div>



        {/* =====================================================
            NEWS INFORMATION
        ===================================================== */}

        <section className={styles.card}>

          <h2>
            News Information
          </h2>


          {/* ================= TITLE ================= */}

          <div className={styles.field}>

            <label>
              News Title
            </label>

            <input
  type="text"
  value={title}
  onChange={(e) => {

    const newTitle = e.target.value;

    setTitle(newTitle);

    setSlug(createSlug(newTitle));

  }}
  placeholder="Enter the news title"
/>

          </div>

          {/* ================= SLUG ================= */}

<div className={styles.field}>

  <label>
    Article Slug
  </label>

  <input
    type="text"
    value={slug}
    onChange={(e) =>
      setSlug(createSlug(e.target.value))
    }
    placeholder="news-article-slug"
  />

  <p className={styles.helperText}>
    This will be used in the public article URL.
  </p>

</div>


          {/* ================= CATEGORY ================= */}

          <div className={styles.field}>

            <label>
              Category
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              placeholder="Example: SRHR, Climate Action, Community"
            />

          </div>


          {/* ================= DESCRIPTION ================= */}

          <div className={styles.field}>

            <label>
              News Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Write the news story here..."
              rows={12}
            />

          </div>

        </section>



        {/* =====================================================
            BANNER IMAGE
        ===================================================== */}

        <section className={styles.card}>

          <h2>
            Banner Image
          </h2>

          <p className={styles.helperText}>
            Upload the main image that will appear
            with this news article.
          </p>


          <CloudinaryUploader

            folder="zannya/news"

            category="news"

            onUploadComplete={(url: string) => {

              setBannerImage(url);

            }}

          />


          {/* ================= IMAGE PREVIEW ================= */}

          {bannerImage && (

            <div className={styles.uploadPreview}>

              <img
                src={bannerImage}
                alt="News banner"
                className={styles.bannerPreview}
              />


              <button
                type="button"
                className={styles.removeButton}
                onClick={() =>
                  setBannerImage("")
                }
              >
                Remove Banner Image
              </button>

            </div>

          )}

        </section>



        {/* =====================================================
            AUTHOR INFORMATION
        ===================================================== */}

        <section className={styles.card}>

          <h2>
            Author Information
          </h2>


          {/* ================= AUTHOR NAME ================= */}

          <div className={styles.field}>

            <label>
              Author Name
            </label>

            <input
              type="text"
              value={authorName}
              onChange={(e) =>
                setAuthorName(e.target.value)
              }
              placeholder="Example: Rahim Ssenabulya"
            />

          </div>


          {/* ================= AUTHOR ROLE ================= */}

          <div className={styles.field}>

            <label>
              Author Role
            </label>

            <input
              type="text"
              value={authorRole}
              onChange={(e) =>
                setAuthorRole(e.target.value)
              }
              placeholder="Example: Communications Officer"
            />

          </div>


          {/* ================= AUTHOR IMAGE ================= */}

          <div className={styles.field}>

            <label>
              Author Image
            </label>

            <p className={styles.helperText}>

              Upload a photo of the person who
              wrote or contributed to this news.

            </p>


            <CloudinaryUploader

              folder="zannya/authors"

              category="author"

              onUploadComplete={(url: string) => {

                setAuthorImage(url);

              }}

            />

          </div>


          {/* ================= AUTHOR PREVIEW ================= */}

          {authorImage && (

            <div className={styles.uploadPreview}>

              <img
                src={authorImage}
                alt={
                  authorName ||
                  "Author"
                }
                className={styles.authorPreview}
              />


              <button
                type="button"
                className={styles.removeButton}
                onClick={() =>
                  setAuthorImage("")
                }
              >
                Remove Author Image
              </button>

            </div>

          )}

        </section>



        {/* =====================================================
            PUBLISH
        ===================================================== */}

        <section className={styles.publishSection}>

          <button
            type="button"
            className={styles.publishButton}
            onClick={publishNews}
            disabled={publishing}
          >

            {publishing
              ? "Publishing..."
              : "Publish News"
            }

          </button>

        </section>


      </div>

    </main>

  );

}