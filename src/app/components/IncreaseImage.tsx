"use client"; //if using Next.js App Router

import { useState } from "react";
import styles from "./IncreaseImage.module.css";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

export default function IncreaseImage({ src, alt }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail Image */}
      <Image
        src={src}
        alt={alt}
        className={styles.thumbnail}
        onClick={() => setOpen(true)}
      />

      {/* Overlay */}
      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <Image
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