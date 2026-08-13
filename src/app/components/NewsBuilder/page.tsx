"use client";

import { useState } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import styles from "./NewsBuilder.module.css";
import CloudinaryUploader from "../../CloudinaryUploader";
import NewsPreview from "./NewsPreview";

type Author = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

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
      caption: string;
    }
  | {
      id: string;
      type: "video";
      url: string;
      caption: string;
    }
  | {
      id: string;
      type: "quote";
      text: string;
    }
  | {
      id: string;
      type: "statistic";
      number: string;
      label: string;
    }
  | {
      id: string;
      type: "divider";
    };
    
    type ExistingArticle = {
  id: string;
  title: string;
  slug: string;
  category?: string | null;
  publishedAt?: {
    seconds: number;
    nanoseconds: number;
  } | null;
};

    /* ================= CREATE ARTICLE SLUG ================= */

const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};


/* ================= CREATE UNIQUE SLUG ================= */

const createUniqueSlug = async (title: string) => {
  const baseSlug = createSlug(title);

  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const slugQuery = query(
      collection(db, "more news"),
      where("slug", "==", slug)
    );

    const snapshot = await getDocs(slugQuery);

    if (snapshot.empty) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

export default function NewsBuilder() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");

  const [bannerImage, setBannerImage] = useState("");
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [existingArticles, setExistingArticles] = useState<ExistingArticle[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [deletingArticleId, setDeletingArticleId] = useState<string | null>(null);

  const [author, setAuthor] = useState<Author>({
    name: "",
    role: "",
    image: "",
    bio: "",
  });

  const [content, setContent] = useState<ContentBlock[]>([]);

  /* ================= BLOCK EDITORS ================= */

  const [activeEditor, setActiveEditor] = useState<
    "paragraph" |
    "heading" |
    "image" |
    "video" |
    "quote" |
    "statistic" |
    null
  >(null);

  /* Paragraph */

  const [paragraphText, setParagraphText] = useState("");

  /* Heading */

  const [headingText, setHeadingText] = useState("");

  /* Image */

  const [imageUrl, setImageUrl] = useState("");
  const [imageCaption, setImageCaption] = useState("");

    /* Video */

  const [videoUrl, setVideoUrl] = useState("");
  const [videoCaption, setVideoCaption] = useState("");

  /* Quote */

  const [quoteText, setQuoteText] = useState("");

  /* Statistic */

  const [statisticNumber, setStatisticNumber] = useState("");
  const [statisticLabel, setStatisticLabel] = useState("");

  /* ================= FETCH EXISTING ARTICLES ================= */
  const loadExistingArticles = async () => {
  setLoadingArticles(true);

  try {
    const snapshot = await getDocs(
      collection(db, "more news")
    );

    const articles: ExistingArticle[] = snapshot.docs.map((document) => {
      const data = document.data();

      return {
        id: document.id,
        title: data.title || "",
        slug: data.slug || "",
        category: data.category || null,
        publishedAt: data.publishedAt || null,
      };
    });

    articles.sort((a, b) => {
      const dateA = a.publishedAt?.seconds || 0;
      const dateB = b.publishedAt?.seconds || 0;

      return dateB - dateA;
    });

    setExistingArticles(articles);

  } catch (error) {
    console.error("Error loading articles:", error);
    alert("Failed to load existing articles.");
  } finally {
    setLoadingArticles(false);
  }
};

 /* ================= DELETE ARTICLE ================= */
 const deleteArticle = async (article: ExistingArticle) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${article.title}"?\n\nThis will permanently remove the article from the website.`
  );

  if (!confirmed) {
    return;
  }

  setDeletingArticleId(article.id);

  try {
    await deleteDoc(
      doc(db, "more news", article.id)
    );

    setExistingArticles((previous) =>
      previous.filter(
        (item) => item.id !== article.id
      )
    );

    alert("Article deleted successfully.");

  } catch (error) {
    console.error("Error deleting article:", error);
    alert("Failed to delete article.");
  } finally {
    setDeletingArticleId(null);
  }
};
  


  /* ================= ADD PARAGRAPH ================= */

  const addParagraph = () => {

    if (!paragraphText.trim()) {
      alert("Please write a paragraph first.");
      return;
    }

    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type: "paragraph",
      text: paragraphText.trim(),
    };

    setContent((previous) => [...previous, newBlock]);

    setParagraphText("");

    setActiveEditor(null);
  };


  /* ================= ADD HEADING ================= */

  const addHeading = () => {

    if (!headingText.trim()) {
      alert("Please enter a heading.");
      return;
    }

    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type: "heading",
      text: headingText.trim(),
    };

    setContent((previous) => [...previous, newBlock]);

    setHeadingText("");

    setActiveEditor(null);
  };


  /* ================= ADD IMAGE ================= */

  const addImage = () => {

    if (!imageUrl.trim()) {
      alert("Please enter an image URL.");
      return;
    }

    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type: "image",
      url: imageUrl.trim(),
      caption: imageCaption.trim(),
    };

    setContent((previous) => [...previous, newBlock]);

    setImageUrl("");
    setImageCaption("");

    setActiveEditor(null);
  };

    /* ================= ADD VIDEO ================= */

  const addVideo = () => {

    if (!videoUrl.trim()) {
      alert("Please upload a video first.");
      return;
    }

    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type: "video",
      url: videoUrl.trim(),
      caption: videoCaption.trim(),
    };

    setContent((previous) => [...previous, newBlock]);

    setVideoUrl("");
    setVideoCaption("");

    setActiveEditor(null);
  };


  /* ================= ADD QUOTE ================= */

  const addQuote = () => {

    if (!quoteText.trim()) {
      alert("Please enter a quote.");
      return;
    }

    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type: "quote",
      text: quoteText.trim(),
    };

    setContent((previous) => [...previous, newBlock]);

    setQuoteText("");

    setActiveEditor(null);
  };


  /* ================= ADD STATISTIC ================= */

  const addStatistic = () => {

    if (!statisticNumber.trim() || !statisticLabel.trim()) {
      alert("Please enter both the number and label.");
      return;
    }

    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type: "statistic",
      number: statisticNumber.trim(),
      label: statisticLabel.trim(),
    };

    setContent((previous) => [...previous, newBlock]);

    setStatisticNumber("");
    setStatisticLabel("");

    setActiveEditor(null);
  };


  /* ================= ADD DIVIDER ================= */

  const addDivider = () => {

    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type: "divider",
    };

    setContent((previous) => [...previous, newBlock]);
  };


  /* ================= DELETE BLOCK ================= */

const deleteBlock = (id: string) => {
  setContent((previous) =>
    previous.filter((block) => block.id !== id)
  );
};


/* ================= MOVE BLOCK UP ================= */

const moveBlockUp = (index: number) => {
  if (index === 0) return;

  setContent((previous) => {
    const updated = [...previous];

    [updated[index - 1], updated[index]] = [
      updated[index],
      updated[index - 1],
    ];

    return updated;
  });
};


/* ================= MOVE BLOCK DOWN ================= */

const moveBlockDown = (index: number) => {
  if (index === content.length - 1) return;

  setContent((previous) => {
    const updated = [...previous];

    [updated[index], updated[index + 1]] = [
      updated[index + 1],
      updated[index],
    ];

    return updated;
  });
};


/* ================= START EDITING ================= */

const startEditingBlock = (block: ContentBlock) => {
  // Divider has nothing to edit
  if (block.type === "divider") {
    return;
  }

  setEditingBlockId(block.id);

  if (block.type === "paragraph") {
    setParagraphText(block.text);
  }

  if (block.type === "heading") {
    setHeadingText(block.text);
  }

  if (block.type === "image") {
    setImageUrl(block.url);
    setImageCaption(block.caption);
  }

    if (block.type === "video") {
    setVideoUrl(block.url);
    setVideoCaption(block.caption);
  }

  if (block.type === "quote") {
    setQuoteText(block.text);
  }

  if (block.type === "statistic") {
    setStatisticNumber(block.number);
    setStatisticLabel(block.label);
  }

  setActiveEditor(block.type);
};


/* ================= UPDATE BLOCK ================= */

const updateBlock = () => {

  if (!editingBlockId) return;

  setContent((previous) =>
    previous.map((block) => {

      if (block.id !== editingBlockId) {
        return block;
      }


      if (block.type === "paragraph") {
        return {
          ...block,
          text: paragraphText.trim(),
        };
      }


      if (block.type === "heading") {
        return {
          ...block,
          text: headingText.trim(),
        };
      }


      if (block.type === "image") {
        return {
          ...block,
          url: imageUrl.trim(),
          caption: imageCaption.trim(),
        };
      }

            if (block.type === "video") {
        return {
          ...block,
          url: videoUrl.trim(),
          caption: videoCaption.trim(),
        };
      }


      if (block.type === "quote") {
        return {
          ...block,
          text: quoteText.trim(),
        };
      }


      if (block.type === "statistic") {
        return {
          ...block,
          number: statisticNumber.trim(),
          label: statisticLabel.trim(),
        };
      }


      return block;
    })
  );

  setEditingBlockId(null);

  cancelEditor();
};


  /* ================= CANCEL EDITOR ================= */

  const cancelEditor = () => {

    setActiveEditor(null);

    setParagraphText("");
    setHeadingText("");

    setImageUrl("");
    setImageCaption("");

    setVideoUrl("");
    setVideoCaption("");

    setQuoteText("");

    setStatisticNumber("");
    setStatisticLabel("");

  };
  

  /* ================= PUBLISH ARTICLE ================= */

const publishArticle = async () => {

  if (!title.trim()) {
    alert("Please enter an article title.");
    return;
  }

  if (!subtitle.trim()) {
    alert("Please enter a short subtitle.");
    return;
  }

  if (!bannerImage) {
    alert("Please upload a banner image.");
    return;
  }

  if (!author.name.trim()) {
    alert("Please enter the author name.");
    return;
  }

  if (content.length === 0) {
    alert("Please add at least one content block.");
    return;
  }

  setPublishing(true);

  try {

  const slug = await createUniqueSlug(title);

  await addDoc(collection(db, "more news"), {

      /* ================= ARTICLE INFORMATION ================= */

      title: title.trim(),

      slug: slug,

      subtitle: subtitle.trim(),

      category: category.trim() || null,

      bannerImage: bannerImage,

      /* ================= AUTHOR ================= */

      author: {
        name: author.name.trim(),
        role: author.role.trim(),
        image: author.image,
        bio: author.bio.trim(),
      },

      /* ================= ARTICLE CONTENT ================= */

      content: content,

      /* ================= PUBLICATION ================= */

      publishedAt: serverTimestamp(),

      /* ================= STATUS ================= */

      status: "published",

    });

    alert("✅ Article published successfully!");

    /* Reset builder */

    setTitle("");
    setSubtitle("");
    setCategory("");

    setBannerImage("");

    setAuthor({
      name: "",
      role: "",
      image: "",
      bio: "",
    });

    setContent([]);

    setShowPreview(false);

  } catch (error) {

    console.error("Error publishing article:", error);

    alert("❌ Failed to publish article.");

  } finally {

    setPublishing(false);

  }
};




  return (
    <main className={styles.page}>

      <div className={styles.container}>

        <h1 className={styles.pageTitle}>
          Article Builder
        </h1>

        <p className={styles.pageDescription}>
          Create and publish a professional article.
        </p>


        {/* ================= ARTICLE INFORMATION ================= */}

        <section className={styles.card}>

          <h2>Article Information</h2>


          <div className={styles.field}>

            <label>
              Article Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title"
            />

          </div>


          <div className={styles.field}>

            <label>
              Short Subtitle / Summary
            </label>

            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Briefly explain what this article is about..."
              rows={4}
            />

          </div>


          <div className={styles.field}>

            <label>
              Category (Optional)
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Example: Climate Action"
            />

          </div>

        </section>


        {/* ================= BANNER IMAGE ================= */}

<section className={styles.card}>

  <h2>
    Banner Image
  </h2>

  <p className={styles.helperText}>
    Upload the main image that appears at the top of the article.
  </p>

  <CloudinaryUploader
    folder="zannya/articles/banners"
    category="article-banner"
    onUploadComplete={(url: string) => setBannerImage(url)}
  />

  {bannerImage && (
    <div className={styles.uploadPreview}>

      <img
        src={bannerImage}
        alt="Article banner"
        className={styles.bannerPreview}
      />

      <button
        type="button"
        className={styles.removeImageButton}
        onClick={() => setBannerImage("")}
      >
        Remove Banner Image
      </button>

    </div>
  )}

</section>


        {/* ================= AUTHOR ================= */}

        <section className={styles.card}>

          <h2>
            Author Information
          </h2>


          <div className={styles.field}>

            <label>
              Author Name
            </label>

            <input
              type="text"
              value={author.name}
              onChange={(e) =>
                setAuthor({
                  ...author,
                  name: e.target.value,
                })
              }
              placeholder="Author name"
            />

          </div>


          <div className={styles.field}>

            <label>
              Author Role
            </label>

            <input
              type="text"
              value={author.role}
              onChange={(e) =>
                setAuthor({
                  ...author,
                  role: e.target.value,
                })
              }
              placeholder="Example: Communications Officer"
            />

          </div>


          <div className={styles.field}>

            <label>
              Author Bio
            </label>

            <textarea
              value={author.bio}
              onChange={(e) =>
                setAuthor({
                  ...author,
                  bio: e.target.value,
                })
              }
              placeholder="Write a short biography about the author..."
              rows={4}
            />

          </div>


          <p className={styles.helperText}>
  Upload a photo of the article author.
</p>

<CloudinaryUploader
  folder="zannya/authors"
  category="author"
  onUploadComplete={(url: string) =>
    setAuthor({
      ...author,
      image: url,
    })
  }
/>

{author.image && (
  <div className={styles.uploadPreview}>

    <img
      src={author.image}
      alt={author.name || "Author"}
      className={styles.authorPreview}
    />

    <button
      type="button"
      className={styles.removeImageButton}
      onClick={() =>
        setAuthor({
          ...author,
          image: "",
        })
      }
    >
      Remove Author Image
    </button>

  </div>
)}

        </section>


        {/* ================= CONTENT BUILDER ================= */}

        <section className={styles.card}>

          <h2>
            Article Content
          </h2>

          <p className={styles.helperText}>
            Build your article by adding different content blocks.
          </p>


          <div className={styles.blockButtons}>

            <button
              type="button"
              onClick={() => setActiveEditor("paragraph")}
            >
              + Paragraph
            </button>


            <button
              type="button"
              onClick={() => setActiveEditor("heading")}
            >
              + Heading
            </button>


            <button
              type="button"
              onClick={() => setActiveEditor("image")}
            >
              + Image
            </button>

            <button
              type="button"
              onClick={() => setActiveEditor("video")}
            >
              + Video
            </button>


            <button
              type="button"
              onClick={() => setActiveEditor("quote")}
            >
              + Quote
            </button>


            <button
              type="button"
              onClick={() => setActiveEditor("statistic")}
            >
              + Statistic
            </button>


            <button
              type="button"
              onClick={addDivider}
            >
              + Divider
            </button>

          </div>


          {/* ================= PARAGRAPH EDITOR ================= */}

          {activeEditor === "paragraph" && (

            <div className={styles.blockEditor}>

              <h3>
                Add Paragraph
              </h3>


              <textarea
                value={paragraphText}
                onChange={(e) =>
                  setParagraphText(e.target.value)
                }
                placeholder="Write your article paragraph here..."
                rows={8}
                className={styles.blockTextarea}
              />


              <div className={styles.editorActions}>

                <button
  type="button"
  className={styles.addButton}
  onClick={editingBlockId ? updateBlock : addParagraph}
>
  {editingBlockId ? "Update Paragraph" : "Add Paragraph"}
</button>


                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={cancelEditor}
                >
                  Cancel
                </button>

              </div>

            </div>

          )}


          {/* ================= HEADING EDITOR ================= */}

          {activeEditor === "heading" && (

            <div className={styles.blockEditor}>

              <h3>
                Add Heading
              </h3>


              <div className={styles.field}>

                <label>
                  Heading Text
                </label>

                <input
                  type="text"
                  value={headingText}
                  onChange={(e) =>
                    setHeadingText(e.target.value)
                  }
                  placeholder="Example: The Impact on Local Communities"
                />

              </div>


              <div className={styles.editorActions}>

                <button
  type="button"
  className={styles.addButton}
  onClick={editingBlockId ? updateBlock : addHeading}
>
  {editingBlockId ? "Update Heading" : "Add Heading"}
</button>


                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={cancelEditor}
                >
                  Cancel
                </button>

              </div>

            </div>

          )}


          {/* ================= IMAGE EDITOR ================= */}

          {activeEditor === "image" && (

            <div className={styles.blockEditor}>

              <h3>
                Add Article Image
              </h3>


              <div className={styles.field}>

                <p className={styles.helperText}>
  Upload an optional image to appear inside the article.
</p>

<CloudinaryUploader
  folder="zannya/articles/content"
  category="article-content"
  onUploadComplete={(url: string) =>
    setImageUrl(url)
  }
/>

{imageUrl && (
  <div className={styles.uploadPreview}>

    <img
      src={imageUrl}
      alt="Article content preview"
      className={styles.imagePreview}
    />

    <button
      type="button"
      className={styles.removeImageButton}
      onClick={() => setImageUrl("")}
    >
      Remove Image
    </button>

  </div>
)}

              </div>


              <div className={styles.field}>

                <label>
                  Image Caption (Optional)
                </label>

                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) =>
                    setImageCaption(e.target.value)
                  }
                  placeholder="Describe this image..."
                />

              </div>


              {imageUrl && (

                <img
                  src={imageUrl}
                  alt="Article preview"
                  className={styles.imagePreview}
                />

              )}


              <div className={styles.editorActions}>

                <button
  type="button"
  className={styles.addButton}
  onClick={editingBlockId ? updateBlock : addImage}
>
  {editingBlockId ? "Update Image" : "Add Image"}
</button>


                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={cancelEditor}
                >
                  Cancel
                </button>

              </div>

            </div>

          )}

                    {/* ================= VIDEO EDITOR ================= */}

          {activeEditor === "video" && (

            <div className={styles.blockEditor}>

              <h3>
                Add Article Video
              </h3>


              <div className={styles.field}>

                <p className={styles.helperText}>
                  Upload a video that will appear inside the article.
                </p>


                <CloudinaryUploader
                  folder="zannya/articles/videos"
                  category="article-video"
                  onUploadComplete={(url: string) =>
                    setVideoUrl(url)
                  }
                />


                {videoUrl && (
                  <div className={styles.uploadPreview}>

                    <video
                      src={videoUrl}
                      controls
                      className={styles.videoPreview}
                    />

                    <button
                      type="button"
                      className={styles.removeImageButton}
                      onClick={() => setVideoUrl("")}
                    >
                      Remove Video
                    </button>

                  </div>
                )}

              </div>


              <div className={styles.field}>

                <label>
                  Video Caption (Optional)
                </label>

                <input
                  type="text"
                  value={videoCaption}
                  onChange={(e) =>
                    setVideoCaption(e.target.value)
                  }
                  placeholder="Describe this video..."
                />

              </div>


              {videoUrl && (

                <video
                  src={videoUrl}
                  controls
                  className={styles.videoPreview}
                />

              )}


              <div className={styles.editorActions}>

                <button
                  type="button"
                  className={styles.addButton}
                  onClick={
                    editingBlockId
                      ? updateBlock
                      : addVideo
                  }
                >
                  {editingBlockId
                    ? "Update Video"
                    : "Add Video"}
                </button>


                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={cancelEditor}
                >
                  Cancel
                </button>

              </div>

            </div>

          )}


          {/* ================= QUOTE EDITOR ================= */}

          {activeEditor === "quote" && (

            <div className={styles.blockEditor}>

              <h3>
                Add Quote
              </h3>


              <textarea
                value={quoteText}
                onChange={(e) =>
                  setQuoteText(e.target.value)
                }
                placeholder="Write the quote here..."
                rows={5}
                className={styles.blockTextarea}
              />


              <div className={styles.editorActions}>

                <button
  type="button"
  className={styles.addButton}
  onClick={editingBlockId ? updateBlock : addQuote}
>
  {editingBlockId ? "Update Quote" : "Add Quote"}
</button>


                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={cancelEditor}
                >
                  Cancel
                </button>

              </div>

            </div>

          )}


          {/* ================= STATISTIC EDITOR ================= */}

          {activeEditor === "statistic" && (

            <div className={styles.blockEditor}>

              <h3>
                Add Statistic
              </h3>


              <div className={styles.field}>

                <label>
                  Number
                </label>

                <input
                  type="text"
                  value={statisticNumber}
                  onChange={(e) =>
                    setStatisticNumber(e.target.value)
                  }
                  placeholder="Example: 150+"
                />

              </div>


              <div className={styles.field}>

                <label>
                  Label
                </label>

                <input
                  type="text"
                  value={statisticLabel}
                  onChange={(e) =>
                    setStatisticLabel(e.target.value)
                  }
                  placeholder="Example: Young people reached"
                />

              </div>


              <div className={styles.editorActions}>

                <button
  type="button"
  className={styles.addButton}
  onClick={editingBlockId ? updateBlock : addStatistic}
>
  {editingBlockId ? "Update Statistic" : "Add Statistic"}
</button>


                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={cancelEditor}
                >
                  Cancel
                </button>

              </div>

            </div>

          )}

        </section>

        {/* ================= EXISTING ARTICLES ================= */}
        <section className={styles.card}>

  <h2>
    Manage Existing Articles
  </h2>

  <p className={styles.helperText}>
    View and delete articles that have already been published.
  </p>

  <button
    type="button"
    className={styles.loadArticlesButton}
    onClick={loadExistingArticles}
    disabled={loadingArticles}
  >
    {loadingArticles
      ? "Loading Articles..."
      : "Load Existing Articles"}
  </button>


  {existingArticles.length > 0 && (

    <div className={styles.existingArticles}>

      {existingArticles.map((article) => (

        <div
          key={article.id}
          className={styles.existingArticle}
        >

          <div className={styles.existingArticleInfo}>

            <strong>
              {article.title}
            </strong>

            {article.category && (
              <span>
                {article.category}
              </span>
            )}

          </div>


          <button
            type="button"
            className={styles.deleteArticleButton}
            onClick={() => deleteArticle(article)}
            disabled={deletingArticleId === article.id}
          >
            {deletingArticleId === article.id
              ? "Deleting..."
              : "Delete Article"}
          </button>

        </div>

      ))}

    </div>

  )}

</section>

        {/* ================= ARTICLE ACTIONS ================= */}

<div className={styles.articleActions}>

  <button
    type="button"
    className={styles.previewButton}
    onClick={() => setShowPreview(true)}
  >
    👁 Preview Article
  </button>


  <button
    type="button"
    className={styles.publishButton}
    onClick={publishArticle}
    disabled={publishing}
  >
    {publishing
      ? "Publishing..."
      : "🚀 Publish Article"}
  </button>

</div>

        {/* ================= CURRENT CONTENT ================= */}

        <section className={styles.card}>

          <h2>
            Current Article Content
          </h2>


          {content.length === 0 ? (

            <div className={styles.emptyState}>
              No content blocks added yet.
            </div>

          ) : (

            <div className={styles.contentBlocks}>

              {content.map((block, index) => (

                <div
                  key={block.id}
                  className={styles.contentBlock}
                >

                  <div className={styles.blockHeader}>

  <strong>
    {index + 1}.{" "}

    {block.type === "paragraph" && "Paragraph"}

    {block.type === "heading" && "Heading"}

    {block.type === "image" && "Image"}

    {block.type === "quote" && "Quote"}

    {block.type === "statistic" && "Statistic"}

    {block.type === "divider" && "Divider"}
  </strong>


  <div className={styles.blockActions}>

    <button
      type="button"
      className={styles.editButton}
      onClick={() => startEditingBlock(block)}
    >
      Edit
    </button>


    <button
      type="button"
      className={styles.moveButton}
      onClick={() => moveBlockUp(index)}
      disabled={index === 0}
      title="Move up"
    >
      ↑
    </button>


    <button
      type="button"
      className={styles.moveButton}
      onClick={() => moveBlockDown(index)}
      disabled={index === content.length - 1}
      title="Move down"
    >
      ↓
    </button>


    <button
      type="button"
      className={styles.deleteButton}
      onClick={() => deleteBlock(block.id)}
    >
      Delete
    </button>

  </div>

</div>


                  {/* PARAGRAPH PREVIEW */}

                  {block.type === "paragraph" && (

                    <p className={styles.previewText}>
                      {block.text}
                    </p>

                  )}


                  {/* HEADING PREVIEW */}

                  {block.type === "heading" && (

                    <h3 className={styles.previewHeading}>
                      {block.text}
                    </h3>

                  )}


                  {/* IMAGE PREVIEW */}

                  {block.type === "image" && (

                    <div>

                      <img
                        src={block.url}
                        alt={block.caption || "Article image"}
                        className={styles.contentImage}
                      />

                      {block.caption && (

                        <p className={styles.imageCaption}>
                          {block.caption}
                        </p>

                      )}

                    </div>

                  )}


                  {/* QUOTE PREVIEW */}

                  {block.type === "quote" && (

                    <blockquote className={styles.previewQuote}>
                      "{block.text}"
                    </blockquote>

                  )}


                  {/* STATISTIC PREVIEW */}

                  {block.type === "statistic" && (

                    <div className={styles.previewStatistic}>

                      <strong>
                        {block.number}
                      </strong>

                      <span>
                        {block.label}
                      </span>

                    </div>

                  )}


                  {/* DIVIDER PREVIEW */}

                  {block.type === "divider" && (

                    <hr className={styles.previewDivider} />

                  )}

                </div>

              ))}

            </div>

          )}

        </section>

        {showPreview && (
  <NewsPreview
    title={title}
    subtitle={subtitle}
    category={category}
    bannerImage={bannerImage}
    author={author}
    content={content}
    publicationDate={new Date()}
    onClose={() => setShowPreview(false)}
  />
)}

      </div>

    </main>
  );
}