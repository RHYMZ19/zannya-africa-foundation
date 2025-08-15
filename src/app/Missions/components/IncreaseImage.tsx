"use client"; // if using Next.js App Router

import { useState } from "react";
import styles from "./IncreaseImage.module.css";

type Props = {
  src: string;
  alt: string;
};

export default function IncreaseImageM({ src, alt }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail Image */}
      <img
        src={src}
        alt={alt}
        className={styles.thumbnail}
        onClick={() => setOpen(true)}
      />

      {/* Overlay */}
      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <img
            src={src}
            alt={alt}
            className={styles.overlayImage}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
          />
        </div>
      )}
    </>
  );
}