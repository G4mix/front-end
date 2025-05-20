"use client";

import Image from "next/image";
import { CreatePostHeader } from "./components/CreatePostHeader";

import styles from "./style.module.css";
import { FaUserCircle } from "react-icons/fa";
import { FaCalendar, FaCamera, FaCode, FaLink, FaXmark } from "react-icons/fa6";
import { useRef, useState } from "react";
import { ImageDisplay } from "../ImageDisplay";
import { BsBarChartFill } from "react-icons/bs";

interface ImagePreview {
  file: File;
  url: string;
}

export const CreatePostScreen = () => {
  const [images, setImages] = useState<ImagePreview[] | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedImages = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages(selectedImages);
  };

  const handleRemoveImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImages(null);
  };

  return (
    <main className={styles.container}>
      <CreatePostHeader />

      <div className={styles.avatar}>
        {false ? (
          <Image
            src={""}
            alt=""
            className={styles.userImage}
            width={18}
            height={18}
          />
        ) : (
          <FaUserCircle className={styles.userImage} />
        )}

        <h2>Lorem Ipsum</h2>
      </div>

      <form className={styles.formContainer}>
        <input
          type="text"
          name="title"
          placeholder="Qual é o título de sua ideia?"
          className={styles.titleInput}
        />

        <div className={styles.descriptionContainer}>
          <textarea
            name="description"
            id="description"
            placeholder="O que você está desenvolvendo? Conte-nos mais!"
            maxLength={700}
          ></textarea>

          {images?.[0] && (
            <div className={styles.imgPreview}>
              <button
                type="button"
                onClick={() => handleRemoveImage()}
                className={styles.removeImgBtn}
              >
                <FaXmark className={styles.removeImgIcon} />
              </button>
              <ImageDisplay image={{ src: images[0].url }} />
            </div>
          )}

          <ul className={styles.actions}>
            <li>
              <label htmlFor="images">
                <FaCamera className={styles.actionIcon} />
              </label>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </li>
            <li>
              <BsBarChartFill
                className={`${styles.actionIcon} ${styles.disabled}`}
              />
            </li>
            <li>
              <FaLink className={`${styles.actionIcon} ${styles.disabled}`} />
            </li>
            <li>
              <FaCode className={`${styles.actionIcon} ${styles.disabled}`} />
            </li>
            <li>
              <FaCalendar
                className={`${styles.actionIcon} ${styles.disabled}`}
              />
            </li>
          </ul>
        </div>
      </form>
    </main>
  );
};
