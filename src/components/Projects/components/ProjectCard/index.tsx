import { IProject } from "@/interfaces/project";
import Image from "next/image";
import { BsFillLightningChargeFill } from "react-icons/bs";
import styles from "./styles.module.css";
import { UserIcon } from "@/components/Users/UserIcon";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: IProject;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
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
        <div className={styles.projectIconImg}>
          <UserIcon
            displayName={project.title}
            icon={project.icon}
            size={72}
            rounded={false}
            fontSize="1.5rem"
          />
        </div>

        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        {project.members && project.members.length > 0 && (
          <div className={styles.members}>
            <UserIcon
              displayName={project.members[0].displayName}
              icon={project.members[0].icon}
              size={16}
              fontSize="0.5rem"
            />
            <span>
              {project.members[0].displayName} e mais{" "}
              {project.members.length - 1} membro(s)
            </span>
          </div>
        )}

        <div className={styles.footer}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <Image
                src="/icons/lightbulb.svg"
                alt="Ideias"
                width={16}
                height={16}
              />
              <span className={styles.statValue}>
                {project.ideasCount} ideias
              </span>
            </div>
            <div className={styles.stat}>
              <Image
                src="/icons/users.svg"
                alt="Seguidores"
                width={16}
                height={16}
              />
              <span className={styles.statValue}>
                {project.followersCount} seguidores
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
