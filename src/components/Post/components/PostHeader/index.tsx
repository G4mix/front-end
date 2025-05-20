import Image from "next/image";
import styles from "../../style.module.css";
import { FaUserCircle } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IAuthor } from "@/interfaces/user";

interface IPostHeader {
  author: IAuthor;
  date: string;
}

export const PostHeader = ({ author, date }: IPostHeader) => {
  return (
    <header className={styles.postHeader}>
      <div className={styles.postHeaderInfo}>
        {author?.icon ? (
          <Image
            src={author.icon}
            alt=""
            className={styles.author}
            width={18}
            height={18}
          />
        ) : (
          <FaUserCircle className={styles.author} />
        )}

        <h2>
          {author.user.username} &bull; <span>{date}</span>
        </h2>
      </div>

      <button>
        <BsThreeDots className={styles.postHeaderDotsIcon} />
      </button>
    </header>
  );
};
