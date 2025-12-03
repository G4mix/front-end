"use client";

import { Header } from "./components/CreatePostHeader";

import styles from "./style.module.css";
import { FaCamera, FaCirclePlus, FaLink, FaXmark } from "react-icons/fa6";
import { useRef, useState } from "react";
import { ImageDisplay } from "../ImageDisplay";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { ICreateIdea } from "@/interfaces/idea";
import { createIdea } from "@/api/mutations/idea";
import { useRouter } from "next/navigation";
import { toast } from "@/utils/toast";
import { UserIcon } from "../Users/UserIcon";
import { SpinnerLoading } from "../SpinnerLoading";

interface ImagePreview {
  file: File;
  url: string;
}

export const CreateIdeaScreen = () => {
  const { userProfile } = useAuth();

  const router = useRouter();

  const [linkInput, setLinkInput] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [showLinkInput, setShowLinkInput] = useState(false);

  const [images, setImages] = useState<ImagePreview[] | null>(null);

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { register, handleSubmit, watch } = useForm<ICreateIdea>();
  
  const title = watch("title");
  const content = watch("content");
  
  const isValidTitle = (value?: string) => {
    if (!value) return false;
    const trimmed = value.trim();
    return trimmed.length >= 3 && trimmed.length <= 70 && /^[^{}]+$/.test(trimmed);
  };
  
  const isValidContent = (value?: string) => {
    if (!value) return false;
    const trimmed = value.trim();
    return trimmed.length >= 3 && trimmed.length <= 700 && /^[^{}]+$/.test(trimmed);
  };
  
  const isFormValid = (isValidTitle(title) && isValidContent(content) && images && images.length > 0) || false;

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

  const handleAddLink = () => {
    if (!linkInput.trim()) return;

    try {
      new URL(linkInput);
      setLinks((prev) => [...prev, linkInput.trim()]);
      setLinkInput("");
      setShowLinkInput(false);
    } catch {
      toast.error("Por favor, insira um link válido");
    }
  };

  const handleRemoveLink = (indexToRemove: number) => {
    setLinks((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleLinkKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLink();
    }
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmedTag = tagInput.trim();

      if (!trimmedTag) {
        toast.error("Digite uma tag válida");
        return;
      }

      if (tags.includes(trimmedTag)) {
        toast.error("Esta tag já foi adicionada");
        return;
      }

      if (trimmedTag.length < 2 || trimmedTag.length > 20) {
        toast.error("A tag deve ter entre 2 e 20 caracteres");
        return;
      }

      setTags((prev) => [...prev, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const onSubmit = async (body: ICreateIdea) => {
    // Validações
    if (!body.title || !body.title.trim()) {
      toast.error("O título é obrigatório");
      return;
    }

    if (!body.content || !body.content.trim()) {
      toast.error("A descrição é obrigatória");
      return;
    }

    if (!images || images.length === 0) {
      toast.error("Selecione ao menos uma imagem");
      return;
    }

    const formData = new FormData();

    formData.append("title", body.title.trim());
    formData.append("content", body.content.trim());

    if (body.images && body.images?.length > 0) {
      Array.from(body.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    if (links.length > 0) {
      links.forEach((link) => {
        formData.append("links", link);
      });
    }

    if (tags.length > 0) {
      tags.forEach((tag) => {
        formData.append("tags", tag);
      });
    }

    try {
      await createIdea(formData);

      toast.success("Ideia criada com sucesso!");
      router.push("/");
    } catch (err) {
      console.error("Erro:", err);
      toast.error("Erro ao criar ideia. Tente novamente.");
    }
  };

  const { ref, ...rest } = register("images");

  if (!userProfile) return <SpinnerLoading />;

  return (
    <div className={styles.container}>
      <Header submitForm={handleSubmit(onSubmit)} isFormValid={isFormValid} />

      <div className={styles.avatar}>
        <UserIcon
          displayName={userProfile?.displayName}
          icon={userProfile?.icon}
          size={32}
          fontSize="1rem"
        />

        <h2>{userProfile?.displayName}</h2>
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

          {links.length > 0 && (
            <div className={styles.linksContainer}>
              {links.map((link, index) => (
                <div key={index} className={styles.linkBox}>
                  <FaLink size={14} />
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(index)}
                    className={styles.removeLinkBtn}
                  >
                    <FaXmark size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {showLinkInput && (
            <div className={styles.linkInputContainer}>
              <input
                type="text"
                placeholder="Cole o link aqui..."
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                onKeyPress={handleLinkKeyPress}
                className={styles.linkInput}
              />
              <button
                type="button"
                onClick={handleAddLink}
                className={styles.addLinkBtn}
              >
                Adicionar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLinkInput(false);
                  setLinkInput("");
                }}
                className={styles.cancelLinkBtn}
              >
                Cancelar
              </button>
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
              <button
                type="button"
                onClick={() => setShowLinkInput(true)}
                className={styles.actionButton}
              >
                <FaLink className={styles.actionIcon} />
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.tagsContainer}>
          <h3>Tags</h3>
          <div className={styles.tagsInputContainer}>
            <FaCirclePlus className={styles.tagsInputIcon} />
            <div className={styles.tagsList}>
              {tags.map((tag, index) => (
                <span
                  key={tag + index}
                  className={styles.tag}
                  onClick={() => handleRemoveTag(index)}
                >
                  {tag}
                </span>
              ))}
            </div>
            <input
              value={tagInput}
              className={styles.tagsInput}
              onChange={(e) => setTagInput(e.target.value)}
              type="text"
              placeholder="Digite as tags e pressione enter para adicionar"
              onKeyDown={handleTagKeyPress}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
