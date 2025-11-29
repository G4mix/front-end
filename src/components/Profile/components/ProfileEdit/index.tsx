"use client";

import { useState, useRef } from "react";
import { IUserProfile } from "@/interfaces/user";
import { FaEdit, FaLink, FaPlus, FaTimes } from "react-icons/fa";
import Image from "next/image";
import styles from "./styles.module.css";
import { UserIcon } from "@/components/Users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/api/mutations/user";
import { toast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUERY_KEYS } from "@/api/keys";

interface ProfileEditProps {
  profile: IUserProfile;
}

export const ProfileEdit = ({ profile }: ProfileEditProps) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const iconInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState(profile.displayName || "");
  const [autobiography, setAutobiography] = useState(
    profile.autobiography || ""
  );
  const [links, setLinks] = useState<string[]>(profile.links || []);
  const [newLink, setNewLink] = useState("");

  const [iconPreview, setIconPreview] = useState<string | null>(profile.icon);
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    profile.backgroundImage
  );

  const [iconFile, setIconFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_PROFILE],
      });
      toast.success("Perfil atualizado com sucesso!");
      router.push(`/profile/${profile.id}`);
    },
    onError: () => {
      toast.error("Erro ao atualizar perfil");
    },
  });

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddLink = () => {
    if (newLink.trim() && !links.includes(newLink.trim())) {
      setLinks([...links, newLink.trim()]);
      setNewLink("");
    }
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (displayName) formData.append("displayName", displayName);
    if (autobiography) formData.append("autobiography", autobiography);
    if (links.length > 0) formData.append("links", JSON.stringify(links));
    if (bannerFile) formData.append("backgroundImage", bannerFile);
    if (iconFile) formData.append("icon", iconFile);

    mutate(formData);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.editScreen}>
      <div className={styles.header}>
        <div className={styles.banner}>
          {bannerPreview && (
            <Image
              src={bannerPreview}
              alt=""
              fill
              className={styles.bannerImage}
            />
          )}
          <button
            type="button"
            className={styles.editBannerBtn}
            onClick={() => bannerInputRef.current?.click()}
          >
            <FaEdit />
            Alterar Banner
          </button>
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            className={styles.hiddenInput}
          />
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatarWrapper}>
              <UserIcon
                displayName={displayName}
                icon={iconPreview}
                size={92}
                fontSize="3rem"
                rounded={false}
              />
              <button
                type="button"
                className={styles.editIconBtn}
                onClick={() => iconInputRef.current?.click()}
              >
                <FaEdit />
              </button>
              <input
                ref={iconInputRef}
                type="file"
                accept="image/*"
                onChange={handleIconChange}
                className={styles.hiddenInput}
              />
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.inputGroup}>
              <label htmlFor="displayName">Nome de Exibição</label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Seu nome"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="autobiography">Biografia</label>
              <textarea
                id="autobiography"
                value={autobiography}
                onChange={(e) => setAutobiography(e.target.value)}
                placeholder="Conte um pouco sobre você..."
                className={styles.textarea}
                rows={4}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Links</label>
              <div className={styles.linksContainer}>
                {links.map((link, index) => (
                  <div key={index} className={styles.linkItem}>
                    <FaLink size={12} className={styles.linkIcon} />
                    <Link href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(index)}
                      className={styles.removeLinkBtn}
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
                <div className={styles.addLinkContainer}>
                  <input
                    type="url"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    placeholder="https://..."
                    className={styles.input}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddLink();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className={styles.addLinkBtn}
                    disabled={!newLink.trim()}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={styles.cancelBtn}
          disabled={isPending}
        >
          Cancelar
        </button>
        <button type="submit" className={styles.saveBtn} disabled={isPending}>
          {isPending ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </form>
  );
};
