import React, { useState } from 'react';
import styles from './Gallery.module.css';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../lib/firebase'; // adjust path to your project

type MediaType = 'photo' | 'video';

export default function GalleryAdmin() {
  const [files, setFiles] = useState<File[]>([]);
  const [mediaType, setMediaType] = useState<MediaType>('photo');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
    setMessage(null);
  };

  const validateFile = (f: File) => {
    if (mediaType === 'photo' && !f.type.startsWith('image/')) return false;
    if (mediaType === 'video' && !f.type.startsWith('video/')) return false;
    return true;
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage('Select at least one file.');
      return;
    }

    setUploading(true);
    setProgress(0);
    setMessage(null);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!validateFile(file)) {
          setMessage(`Invalid file type: ${file.name}`);
          continue;
        }

        // Create a unique path: gallery/<type>/<timestamp>-<filename>
        const path = `gallery/${mediaType}/${Date.now()}-${file.name.replace(/\s/g, '_')}`;
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // await progress and completion
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setProgress(Math.round(((i + pct / 100) / files.length) * 100));
            },
            (error) => {
              console.error('Upload failed', error);
              reject(error);
            },
            async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              uploadedUrls.push(url);
              resolve();
            }
          );
        });
      }

      // Save each URL as a document in Firestore 'gallery' collection
      for (const url of uploadedUrls) {
        await addDoc(collection(db, 'gallery'), {
          url,
          type: mediaType,
          uploadedAt: serverTimestamp(),
          // optionally add title, alt text or uploadedBy user id
        });
      }

      setMessage('Upload complete!');
      setFiles([]);
      setProgress(0);
    } catch (err) {
      console.error(err);
      setMessage('Upload failed. Check console.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Admin Gallery Upload</h3>

      <div className={styles.controls}>
        <label className={styles.radio}>
          <input
            type="radio"
            name="mediaType"
            value="photo"
            checked={mediaType === 'photo'}
            onChange={() => setMediaType('photo')}
          />
          Photos
        </label>
        <label className={styles.radio}>
          <input
            type="radio"
            name="mediaType"
            value="video"
            checked={mediaType === 'video'}
            onChange={() => setMediaType('video')}
          />
          Videos
        </label>
      </div>

      <input
        type="file"
        accept={mediaType === 'photo' ? 'image/*' : 'video/*'}
        multiple
        onChange={handleFiles}
        className={styles.fileInput}
      />

      {files.length > 0 && (
        <div className={styles.preview}>
          {files.map((f, i) => (
            <div key={i} className={styles.previewItem}>
              {mediaType === 'photo' ? (
                <img src={URL.createObjectURL(f)} alt={f.name} />
              ) : (
                <video src={URL.createObjectURL(f)} controls />
              )}
              <div className={styles.filename}>{f.name}</div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.actions}>
        <button disabled={uploading} onClick={handleUpload} className={styles.uploadBtn}>
          {uploading ? `Uploading ${progress}%` : 'Upload'}
        </button>
      </div>

      {uploading && (
        <div className={styles.progress}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
      )}

      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
}