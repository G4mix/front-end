"use client";

import { useState, useRef } from "react";
import { IProject } from "@/interfaces/project";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import styles from "./styles.module.css";
import { UserIcon } from "@/components/Users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/mutations/project";
import { toast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/api/keys";

interface ProjectEditProps {
  project: IProject;
}

export const ProjectEdit = ({ project }: ProjectEditProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(project.title || "");
  const [description, setDescription] = useState(project.description || "");

  const [bannerPreview, setBannerPreview] = useState<string | null>(
    project.backgroundImage
  );
  const [iconPreview, setIconPreview] = useState<string | null>(project.icon);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);

  const updateMutation = useMutation({
    mutationFn: (formData: FormData) => updateProject(project.id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PROJECT_BY_ID, project.id],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PROJECTS] });
      toast.success("Projeto atualizado com sucesso!");
      router.push(`/projects/${project.id}`);
    },
    onError: () => {
      toast.error("Erro ao atualizar projeto");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    if (bannerFile) formData.append("backgroundImage", bannerFile);
    if (iconFile) formData.append("icon", iconFile);

    updateMutation.mutate(formData);
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

        <div className={styles.projectInfo}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatarWrapper}>
              <UserIcon
                displayName={title}
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
              <label htmlFor="title">Título do Projeto</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nome do projeto"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="description">Descrição</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva seu projeto..."
                className={styles.textarea}
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={styles.cancelBtn}
          disabled={updateMutation.isPending}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={styles.saveBtn}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </form>
  );
};
