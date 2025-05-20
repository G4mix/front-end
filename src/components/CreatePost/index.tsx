"use client";

import Image from "next/image";
import { CreatePostHeader } from "./components/CreatePostHeader";

import styles from "./style.module.css";
import { FaUserCircle } from "react-icons/fa";
import { FaCalendar, FaCamera, FaCode, FaLink, FaXmark } from "react-icons/fa6";
import { useRef, useState } from "react";
import { ImageDisplay } from "../ImageDisplay";
import { BsBarChartFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { ICreatePost } from "@/interfaces/post";
import { createPost } from "@/api/mutations/posts";
import { useRouter } from "next/navigation";

interface ImagePreview {
  file: File;
  url: string;
}

export const CreatePostScreen = () => {
  const { user } = useAuth();

  const router = useRouter();

  const [images, setImages] = useState<ImagePreview[] | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { register, handleSubmit } = useForm<ICreatePost>();

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

  const onSubmit = async (body: ICreatePost) => {
    const formData = new FormData();

    formData.append("userProfileId", user?.userProfile.id ?? "");

    if (body.title) formData.append("title", body.title);
    if (body.content) formData.append("content", body.content);

    if (body.images && body.images?.length > 0) {
      Array.from(body.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      await createPost(formData);

      router.push("/");
    } catch (err) {
      console.error("Erro:", err);
    }
  };

  const { ref, ...rest } = register("images");

  return (
    <div className={styles.container}>
      <CreatePostHeader submitForm={handleSubmit(onSubmit)} />

      <div className={styles.avatar}>
        {user?.userProfile.icon ? (
          <Image
            src={user?.userProfile.icon}
            alt=""
            className={styles.userImage}
            width={18}
            height={18}
          />
        ) : (
          <FaUserCircle className={styles.userImage} />
        )}

        <h2>{user?.username}</h2>
      </div>

      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className={styles.titleInput}
          placeholder="Qual é o título de sua ideia?"
          {...register("title", {
            required: true,
          })}
        />

        <div className={styles.descriptionContainer}>
          <textarea
            id="description"
            placeholder="O que você está desenvolvendo? Conte-nos mais!"
            maxLength={700}
            {...register("content", {
              required: true,
            })}
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
                accept="image/*"
                style={{ display: "none" }}
                ref={(el) => {
                  ref(el);
                  fileInputRef.current = el;
                }}
                {...rest}
                onChange={(e) => {
                  rest.onChange(e);
                  handleImageChange(e);
                }}
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
    </div>
  );
};
