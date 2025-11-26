import { IProject } from "@/interfaces/project";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import styles from "./styles.module.css";

interface ProjectCardProps {
  project: IProject;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.banner}>
        {project.backgroundImage ? (
          <Image
            src={project.backgroundImage}
            alt={project.title}
            fill
            className={styles.bannerImage}
          />
        ) : (
          <div className={styles.defaultBanner} />
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.projectIcon}>
          {project.icon ? (
            <Image src={project.icon} alt="" width={48} height={48} />
          ) : (
            <BsFillLightningChargeFill className={styles.defaultIcon} />
          )}
        </div>

        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        <div className={styles.footer}>
          <div className={styles.owner}>
            {project.owner.icon ? (
              <Image
                src={project.owner.icon}
                alt=""
                width={24}
                height={24}
                className={styles.ownerAvatar}
              />
            ) : (
              <FaUserCircle className={styles.ownerIcon} />
            )}
            <span>{project.owner.displayName}</span>
          </div>

          <div className={styles.stats}>
            <span>{project.postsCount} ideias</span>
          </div>
        </div>
      </div>
    </div>
  );
};

